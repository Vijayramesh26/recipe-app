<template>
  <div class="home-view">
    <!-- Ultra-Modern Hero -->
    <v-row class="mb-4 mb-md-12 align-center">
      <v-col cols="12" md="8" class="text-center text-md-left">
        <h1
          class="responsive-h1 font-weight-black mb-4 stagger-item stagger-iter-1"
        >
          Master the art <br />
          of <span class="text-primary italic">cooking.</span>
        </h1>
        <p
          class="text-body-1 text-md-h5 text-grey-darken-1 font-weight-medium mb-8 mb-md-10 stagger-item stagger-iter-2 max-width-short opacity-80 mx-auto mx-md-0"
        >
          Your personal culinary sanctuary. Save, explore, and create
          unforgettable flavors.
        </p>
        <div
          class="d-flex flex-column flex-sm-row justify-center justify-md-start gap-3 gap-md-4 stagger-item stagger-iter-3"
        >
          <v-btn
            size="x-large"
            color="primary"
            class="rounded-pill px-8 px-md-10 font-weight-black shadow-premium"
            to="/add"
          >
            Start Creating
          </v-btn>
          <v-btn
            size="x-large"
            variant="outlined"
            class="rounded-pill px-8 px-md-10 font-weight-black border-2"
            to="/favorites"
          >
            My Favorites
          </v-btn>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="4"
        class="d-none d-md-flex align-center justify-center"
      >
        <v-card
          class="bento-card pa-2 stagger-item stagger-iter-4 rotate-3 shadow-xl"
        >
          <v-img
            src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800"
            width="240"
            height="320"
            cover
            class="rounded-xl"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>

    <!-- Search & Filter Bento -->
    <v-row class="mb-8 mb-md-16 stagger-item stagger-iter-5">
      <v-col cols="12">
        <v-card class="bento-card px-4 px-md-8 py-4 py-md-6 shadow-lg">
          <v-row align="center">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="searchQuery"
                prepend-inner-icon="mdi-magnify"
                placeholder="Search recipes..."
                variant="solo"
                flat
                hide-details
                class="ultra-search"
              ></v-text-field>
            </v-col>
            <v-divider
              vertical
              class="d-none d-md-flex mx-4"
              length="40"
            ></v-divider>
            <v-col cols="12" md="5">
              <v-chip-group
                v-model="selectedCategory"
                mandatory
                selected-class="text-primary"
                class="mobile-chip-group"
              >
                <v-chip
                  v-for="cat in categories"
                  :key="cat"
                  :value="cat"
                  variant="text"
                  class="font-weight-black text-uppercase text-caption transition-all"
                >
                  {{ cat }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recipe Grid -->
    <v-row v-if="filteredRecipes.length > 0">
      <v-col
        v-for="(recipe, index) in filteredRecipes"
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
          @toggle-favorite="toggleFavorite"
        />
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-else class="stagger-item stagger-iter-5">
      <v-col cols="12">
        <v-sheet
          class="d-flex flex-column align-center justify-center pa-8 pa-md-16 text-center bg-transparent"
        >
          <v-avatar color="indigo-lighten-5" size="80" class="mb-6 mb-md-8">
            <v-icon size="40" color="primary">mdi-silverware-clean</v-icon>
          </v-avatar>
          <h2 class="text-h4 text-md-h3 font-weight-black mb-4">Pure Canvas</h2>
          <p
            class="text-body-1 text-md-h6 text-grey max-width-short mb-8 mb-md-10 mx-auto"
          >
            Your kitchen is quiet. Let's make some noise with your first
            masterpiece.
          </p>
          <v-btn
            size="large"
            color="primary"
            rounded="pill"
            class="px-10 px-md-12 font-weight-black"
            to="/add"
            elevation="0"
          >
            Initialize Cookbook
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapWritableState } from "pinia";
import { useRecipeStore } from "@/store/recipeStore";
import RecipeCard from "@/components/recipes/RecipeCard.vue";

export default {
  name: "HomeView",
  components: {
    RecipeCard,
  },
  computed: {
    ...mapState(useRecipeStore, ["categories", "filteredRecipes"]),
    ...mapWritableState(useRecipeStore, ["searchQuery", "selectedCategory"]),
  },
  methods: {
    ...mapActions(useRecipeStore, ["toggleFavorite"]),
    goToDetail(id) {
      this.$router.push(`/recipe/${id}`);
    },
  },
};
</script>

<style scoped>
.responsive-h1 {
  font-size: clamp(2rem, 4.2vw, 4rem);
  line-height: 1 !important;
  letter-spacing: -0.04em !important;
}

@media (min-width: 960px) {
  .responsive-h1 {
    line-height: 0.9 !important;
  }
}

.rotate-3 {
  transform: rotate(3deg);
}

.ultra-search :deep(.v-field__input) {
  font-size: 1rem;
  font-weight: 600;
}

@media (min-width: 960px) {
  .ultra-search :deep(.v-field__input) {
    font-size: 1.15rem;
  }
}

.italic {
  font-style: italic;
}

.max-width-short {
  max-width: 480px;
}

.gap-3 {
  gap: 12px;
}
.gap-4 {
  gap: 16px;
}

.mobile-chip-group {
  overflow-x: auto;
  white-space: nowrap;
}

/* Entry Animations */
.stagger-item {
  opacity: 0;
  animation: organicEntry 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

@keyframes organicEntry {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
