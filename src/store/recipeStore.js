import { defineStore } from "pinia";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

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
        await setDoc(doc(db, "recipes", newRecipe.id), newRecipe);
        this.cloudStatus = "connected";
      } catch (e) {
        console.warn("Firebase sync failed:", e);
        this.cloudStatus = "error";
      }
    },

    async updateRecipe(id, updatedRecipe) {
      const index = this.recipes.findIndex((r) => r.id === id);
      if (index !== -1) {
        const fullRecipe = { ...this.recipes[index], ...updatedRecipe };
        this.recipes[index] = fullRecipe;
        this.saveToLocaleStorage();

        // Cloud Sync
        try {
          await setDoc(doc(db, "recipes", id), fullRecipe);
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
        await deleteDoc(doc(db, "recipes", id));
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
          await setDoc(doc(db, "recipes", id), { ...recipe });
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
        const q = query(
          collection(db, "recipes"),
          orderBy("createdAt", "desc"),
        );
        const querySnapshot = await getDocs(q);
        const cloudRecipes = [];
        querySnapshot.forEach((doc) => {
          cloudRecipes.push(doc.data());
        });

        if (cloudRecipes.length > 0) {
          this.recipes = cloudRecipes;
          this.saveToLocaleStorage();
          this.cloudStatus = "connected";
        } else {
          this.cloudStatus = "connected";
        }
      } catch (e) {
        this.cloudStatus = "error";
        console.error("Firebase Sync Error:", e);
      }
    },

    async forcePushToCloud() {
      this.cloudStatus = "syncing";
      try {
        const uploadPromises = this.recipes.map((recipe) =>
          setDoc(doc(db, "recipes", recipe.id), recipe),
        );
        await Promise.all(uploadPromises);
        this.cloudStatus = "connected";
        return true;
      } catch (e) {
        console.error("Force Push Error:", e);
        this.cloudStatus = "error";
        return false;
      }
    },

    async importRecipes(jsonData) {
      try {
        const imported = JSON.parse(jsonData);
        if (Array.isArray(imported)) {
          this.recipes = [...this.recipes, ...imported];
          this.saveToLocaleStorage();

          this.cloudStatus = "syncing";
          // Push imported recipes to Firestore
          const uploadPromises = imported.map((recipe) =>
            setDoc(doc(db, "recipes", recipe.id), recipe),
          );

          try {
            await Promise.all(uploadPromises);
            this.cloudStatus = "connected";
          } catch (cloudErr) {
            console.error("Failed to push imports to cloud:", cloudErr);
            this.cloudStatus = "error";
          }

          return true;
        }
      } catch (e) {
        console.error("Failed to import recipes:", e);
      }
      return false;
    },
  },
});
