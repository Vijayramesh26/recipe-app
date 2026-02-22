<template>
  <div class="favorites-view">
    <v-row class="mb-4 mb-md-12 align-center">
      <v-col cols="12" md="8" class="text-center text-md-left">
        <h1
          class="responsive-h1 font-weight-black mb-4 stagger-item stagger-iter-1"
        >
          My <span class="text-primary italic">Favorites</span>
        </h1>
        <p
          class="text-body-1 text-md-h5 text-grey-darken-1 font-weight-medium mb-0 stagger-item stagger-iter-2 opacity-80"
        >
          All your most-loved recipes in one culinary sanctuary.
        </p>
      </v-col>
      <v-col
        cols="12"
        md="4"
        class="d-none d-md-flex align-center justify-center"
      >
        <v-avatar
          size="240"
          color="red-lighten-5"
          class="stagger-item stagger-iter-4 rotate-3 opacity-40"
        >
          <v-icon size="120" color="primary">mdi-heart</v-icon>
        </v-avatar>
      </v-col>
    </v-row>

    <v-row v-if="favoriteRecipes.length > 0">
      <v-col
        v-for="(recipe, index) in favoriteRecipes"
        :key="recipe.id"
        cols="12"
        sm="6"
        lg="4"
        xl="3"
        class="stagger-item"
        :style="{ animationDelay: `${0.4 + index * 0.1}s` }"
      >
        <RecipeCard
          :recipe="recipe"
          @view="goToDetail"
          @edit="goToEdit"
          @delete="confirmDelete"
          @toggle-favorite="toggleFavorite"
        />
      </v-col>
    </v-row>

    <v-row v-else class="stagger-item stagger-iter-3">
      <v-col cols="12">
        <v-sheet
          class="d-flex flex-column align-center justify-center pa-12 text-center bg-transparent"
          rounded="lg"
          variant="outlined"
          style="border-style: dashed; border-width: 2px"
        >
          <v-icon size="64" color="red-lighten-3" class="mb-4"
            >mdi-heart-outline</v-icon
          >
          <h3 class="text-h4 font-weight-black mb-2">No favorites yet</h3>
          <p class="text-h6 text-grey mb-8 opacity-60">
            Mark recipes as favorites to see them here.
          </p>
          <v-btn
            variant="flat"
            size="large"
            color="primary"
            class="rounded-pill px-8"
            to="/"
          >
            Browse Recipes
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useRecipeStore } from "@/store/recipeStore";
import RecipeCard from "@/components/recipes/RecipeCard.vue";

export default {
  name: "FavoritesView",
  components: {
    RecipeCard,
  },
  computed: {
    ...mapState(useRecipeStore, ["favoriteRecipes"]),
  },
  methods: {
    ...mapActions(useRecipeStore, ["toggleFavorite", "deleteRecipe"]),
    goToDetail(id) {
      this.$router.push(`/recipe/${id}`);
    },
    goToEdit(id) {
      this.$router.push(`/edit/${id}`);
    },
    confirmDelete(id) {
      if (confirm("Are you sure you want to delete this recipe?")) {
        this.deleteRecipe(id);
      }
    },
  },
};
</script>

<style scoped>
.responsive-h1 {
  font-size: clamp(
    2rem,
    4.2vw,
    4rem
  ); /* Match HomeView Ultra-Compact scaling */
  line-height: 1 !important;
  letter-spacing: -0.04em !important;
}

@media (min-width: 960px) {
  .responsive-h1 {
    line-height: 0.9 !important;
  }
}

.italic {
  font-style: italic;
}

.tracking-tight {
  letter-spacing: -0.05em !important;
}

.stagger-item {
  opacity: 0;
  animation: organicEntry 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.stagger-iter-1 {
  animation-delay: 0.1s;
}
.stagger-iter-2 {
  animation-delay: 0.2s;
}
.stagger-iter-3 {
  animation-delay: 0.3s;
}

@keyframes organicEntry {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
