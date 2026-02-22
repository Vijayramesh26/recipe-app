import { defineStore } from "pinia";
import { skySqlService } from "@/services/skySqlService";

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    recipes: JSON.parse(localStorage.getItem("recipes")) || [],
    searchQuery: "",
    selectedCategory: "All",
    categories: [
      "All",
      "Breakfast",
      "Lunch",
      "Dinner",
      "Dessert",
      "Snack",
      "Beverage",
    ],
    cloudStatus: "local-only", // 'local-only' | 'syncing' | 'connected' | 'error'
  }),

  getters: {
    filteredRecipes: (state) => {
      let filtered = state.recipes;

      if (state.selectedCategory !== "All") {
        filtered = filtered.filter(
          (r) => r.category === state.selectedCategory,
        );
      }

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.name.toLowerCase().includes(query) ||
            r.ingredients.some((i) => i.name.toLowerCase().includes(query)),
        );
      }

      return filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    },

    favoriteRecipes: (state) => state.recipes.filter((r) => r.isFavorite),

    getRecipeById: (state) => (id) => state.recipes.find((r) => r.id === id),
  },

  actions: {
    async addRecipe(recipe) {
      const newRecipe = {
        ...recipe,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        isFavorite: false,
      };

      // Optimistic Update
      this.recipes.push(newRecipe);
      this.saveToLocaleStorage();

      // Cloud Sync
      try {
        await skySqlService.upsert(newRecipe);
        this.cloudStatus = "connected";
      } catch (e) {
        console.warn("Cloud sync failed, will retry later.");
        this.cloudStatus = "error";
      }
    },

    async updateRecipe(id, updatedRecipe) {
      const index = this.recipes.findIndex((r) => r.id === id);
      if (index !== -1) {
        this.recipes[index] = { ...this.recipes[index], ...updatedRecipe };
        this.saveToLocaleStorage();

        // Cloud Sync
        try {
          await skySqlService.upsert(this.recipes[index]);
          this.cloudStatus = "connected";
        } catch (e) {
          this.cloudStatus = "error";
        }
      }
    },

    async deleteRecipe(id) {
      this.recipes = this.recipes.filter((r) => r.id !== id);
      this.saveToLocaleStorage();

      // Cloud Sync
      try {
        await skySqlService.delete(id);
        this.cloudStatus = "connected";
      } catch (e) {
        this.cloudStatus = "error";
      }
    },

    async toggleFavorite(id) {
      const recipe = this.recipes.find((r) => r.id === id);
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
        this.saveToLocaleStorage();

        // Cloud Sync
        try {
          await skySqlService.upsert(recipe);
          this.cloudStatus = "connected";
        } catch (e) {
          this.cloudStatus = "error";
        }
      }
    },

    saveToLocaleStorage() {
      localStorage.setItem("recipes", JSON.stringify(this.recipes));
    },

    async syncWithCloud() {
      this.cloudStatus = "syncing";
      try {
        const cloudRecipes = await skySqlService.fetchAll();
        // Merge strategy: Cloud wins for now, simple implementation
        if (cloudRecipes && Array.isArray(cloudRecipes)) {
          this.recipes = cloudRecipes;
          this.saveToLocaleStorage();
          this.cloudStatus = "connected";
        }
      } catch (e) {
        this.cloudStatus = "error";
        console.error("Cloud Sync Error:", e);
      }
    },

    importRecipes(jsonData) {
      try {
        const imported = JSON.parse(jsonData);
        if (Array.isArray(imported)) {
          this.recipes = [...this.recipes, ...imported];
          this.saveToLocaleStorage();
          // Trigger cloud sync for all imported recipes
          this.syncWithCloud();
          return true;
        }
      } catch (e) {
        console.error("Failed to import recipes:", e);
      }
      return false;
    },
  },
});
