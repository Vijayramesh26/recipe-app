<template>
  <div v-if="recipe" class="recipe-detail-view">
    <!-- Standardized Grid Row for Hero Alignment -->
    <v-row no-gutters class="d-none d-md-flex mb-16">
      <v-col cols="12">
        <!-- Immersive Magazine-style Hero -->
        <div
          class="desktop-hero position-relative overflow-hidden rounded-hero shadow-premium"
        >
          <v-img
            :src="
              recipe.image ||
              'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=2000'
            "
            height="400"
            cover
            class="align-end"
          >
            <div class="hero-overlay pa-8 pa-md-12">
              <v-row align="end">
                <v-col cols="12" lg="8">
                  <v-chip
                    color="white"
                    variant="flat"
                    class="mb-3 mb-md-4 font-weight-black px-6 text-primary h-auto py-2"
                  >
                    {{ recipe.category }}
                  </v-chip>
                  <h1
                    class="text-h1 font-weight-black text-white mb-3 mb-md-4 tracking-tight display-text"
                  >
                    {{ recipe.name }}
                  </h1>
                  <div class="d-flex align-center gap-8 text-white">
                    <div class="d-flex align-center">
                      <v-avatar
                        size="56"
                        class="mr-4 border-2 border-white shadow-lg"
                      >
                        <v-img
                          src="https://ui-avatars.com/api/?name=Chef&background=fff&color=6366F1"
                        ></v-img>
                      </v-avatar>
                      <div class="d-flex flex-column">
                        <span class="text-overline font-weight-black opacity-60"
                          >Created by</span
                        >
                        <span class="text-h5 font-weight-black">{{
                          recipe.chefName || "Samayal Chef"
                        }}</span>
                      </div>
                    </div>
                    <v-divider
                      vertical
                      class="mx-4 border-opacity-20"
                      color="white"
                    ></v-divider>
                    <div class="stats-group d-flex gap-8">
                      <div class="text-center">
                        <div class="text-h4 font-weight-black">
                          {{ recipe.cookingTime }}
                        </div>
                        <div class="text-overline font-weight-black opacity-60">
                          Mins
                        </div>
                      </div>
                      <div class="text-center">
                        <div class="text-h4 font-weight-black">
                          {{ recipe.difficulty }}
                        </div>
                        <div class="text-overline font-weight-black opacity-60">
                          Level
                        </div>
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" lg="4" class="text-right pb-4">
                  <v-btn
                    icon
                    :color="recipe.isFavorite ? 'rose' : 'white'"
                    size="x-large"
                    class="shadow-xl mb-4"
                    @click="toggleFavorite(recipe.id)"
                  >
                    <v-icon size="28">{{
                      recipe.isFavorite ? "mdi-heart" : "mdi-heart-outline"
                    }}</v-icon>
                  </v-btn>
                  <div class="d-flex justify-end gap-3 mt-4">
                    <v-btn
                      color="white"
                      variant="flat"
                      rounded="pill"
                      class="px-8 font-weight-black"
                      :to="`/edit/${recipe.id}`"
                    >
                      Edit Masterpiece
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-img>
        </div>
      </v-col>
    </v-row>

    <!-- Mobile Header (Existing robust design) -->
    <div class="d-md-none mb-8">
      <v-img
        :src="recipe.image || 'https://placehold.co/800x600?text=No+Image'"
        height="350"
        cover
        rounded="xl"
        class="shadow-lg mb-6"
      ></v-img>
      <div class="d-flex align-center justify-space-between mb-4">
        <v-chip color="primary" variant="tonal" class="rounded-lg">{{
          recipe.category
        }}</v-chip>
        <v-btn
          icon
          :color="recipe.isFavorite ? 'red' : 'grey'"
          variant="flat"
          class="shadow-sm border"
          @click="toggleFavorite(recipe.id)"
        >
          <v-icon size="20">{{
            recipe.isFavorite ? "mdi-heart" : "mdi-heart-outline"
          }}</v-icon>
        </v-btn>
      </div>
      <h1 class="text-h4 font-weight-black mb-4">{{ recipe.name }}</h1>
      <div class="d-flex align-center mb-6">
        <v-avatar size="32" class="mr-3 border">
          <v-img
            src="https://ui-avatars.com/api/?name=Chef&background=6366F1&color=fff"
          ></v-img>
        </v-avatar>
        <span class="text-subtitle-1 font-weight-black text-grey-darken-1">{{
          recipe.chefName || "Samayal Chef"
        }}</span>
      </div>
    </div>

    <!-- Content Sections (Redesigned for better desktop flow) -->
    <v-row class="stagger-view">
      <!-- Left Column: Specs & Notes -->
      <v-col cols="12" lg="4">
        <v-card
          class="bento-card pa-8 pa-md-10 mb-8 border-0 shadow-premium bg-white"
        >
          <h2 class="text-h4 font-weight-black mb-8">Specification</h2>

          <div class="specification-list">
            <div class="spec-item d-flex justify-space-between py-4 border-b">
              <span class="text-subtitle-1 font-weight-black text-grey"
                >Cooking Time</span
              >
              <span class="text-subtitle-1 font-weight-black"
                >{{ recipe.cookingTime }} mins</span
              >
            </div>
            <div class="spec-item d-flex justify-space-between py-4 border-b">
              <span class="text-subtitle-1 font-weight-black text-grey"
                >Complexity</span
              >
              <span class="text-subtitle-1 font-weight-black">{{
                recipe.difficulty
              }}</span>
            </div>
            <div class="spec-item d-flex justify-space-between py-4 border-b">
              <span class="text-subtitle-1 font-weight-black text-grey"
                >Created On</span
              >
              <span class="text-subtitle-1 font-weight-black">{{
                new Date(recipe.createdAt).toLocaleDateString()
              }}</span>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-h5 font-weight-black mb-4">Chef's Notes</h3>
            <p
              class="text-body-1 text-grey-darken-2 line-height-relaxed opacity-80"
            >
              {{
                recipe.notes ||
                "This culinary creation is a testament to the art of balanced flavors. A gentle reminder that every ingredient tells a story."
              }}
            </p>
          </div>
        </v-card>

        <v-card
          class="bento-card pa-8 pa-md-10 border-0 shadow-premium bg-indigo-lighten-5"
        >
          <h2 class="text-h4 font-weight-black mb-8">Ingredients</h2>
          <v-list bg-color="transparent" density="comfortable">
            <v-list-item
              v-for="(ingredient, i) in recipe.ingredients"
              :key="i"
              class="px-0 py-2 border-b-dashed border-opacity-10"
            >
              <template v-slot:prepend>
                <div class="ingredient-dot mr-4"></div>
              </template>
              <v-list-item-title class="text-h6 font-weight-medium">
                <span class="font-weight-black text-primary mr-1">{{
                  ingredient.amount
                }}</span>
                {{ ingredient.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Right Column: Preparation Steps -->
      <v-col cols="12" lg="8">
        <v-card
          class="bento-card pa-8 pa-md-12 border-0 shadow-premium min-h-full"
        >
          <div class="d-flex align-center justify-space-between mb-10">
            <h2 class="text-h3 font-weight-black">Preparation</h2>
            <v-chip icon="mdi-play" class="d-none d-sm-flex font-weight-black"
              >Guidance Mode</v-chip
            >
          </div>

          <div class="preparation-steps">
            <div
              v-for="(step, i) in recipe.steps"
              :key="i"
              class="step-block d-flex gap-8 mb-10 stagger-item"
              :style="{ animationDelay: i * 0.1 + 's' }"
            >
              <div
                class="step-number-container d-none d-md-flex flex-column align-center"
              >
                <div
                  class="step-number text-h4 font-weight-black text-primary-lighten-4 opacity-40"
                >
                  {{ (i + 1).toString().padStart(2, "0") }}
                </div>
                <div class="step-connector flex-grow-1 mt-4"></div>
              </div>

              <div
                class="step-content flex-grow-1 pa-8 pa-md-10 bento-card border bg-slate-50"
              >
                <div class="text-overline font-weight-black text-primary mb-2">
                  Step {{ i + 1 }}
                </div>
                <p class="text-h5 font-weight-medium leading-relaxed mb-0">
                  {{ step }}
                </p>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <!-- Loading State -->
  <div
    v-else
    class="text-center pa-12 d-flex flex-column align-center justify-center min-h-[50vh]"
  >
    <v-progress-circular
      indeterminate
      color="primary"
      size="64"
      width="8"
      class="mb-4"
    ></v-progress-circular>
    <div class="text-h5 font-weight-black opacity-40">
      Arranging Ingredients...
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useRecipeStore } from "@/store/recipeStore";

export default {
  name: "RecipeDetailView",
  computed: {
    recipe() {
      const store = useRecipeStore();
      return store.getRecipeById(this.$route.params.id);
    },
  },
  methods: {
    ...mapActions(useRecipeStore, ["toggleFavorite"]),
  },
};
</script>

<style scoped>
.rounded-hero {
  border-radius: 48px !important;
}

.hero-overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.4) 40%,
    transparent 100%
  );
  width: 100%;
}

.display-text {
  font-size: clamp(2rem, 6vw, 4.5rem) !important;
  line-height: 0.9 !important;
}

.leading-relaxed {
  line-height: 1.5 !important;
}

.specification-list .border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.ingredient-dot {
  width: 8px;
  height: 8px;
  background: var(--v-primary-base);
  border-radius: 50%;
  opacity: 0.6;
}

.step-connector {
  width: 2px;
  background: linear-gradient(to bottom, rgba(99, 102, 241, 0.2), transparent);
}

.step-content {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.step-block:hover .step-content {
  transform: translateX(10px);
  border-color: rgb(var(--v-theme-primary)) !important;
}

.min-h-full {
  min-height: 100%;
}

.line-height-relaxed {
  line-height: 1.7 !important;
}

/* Entry Animations */
.stagger-item {
  opacity: 0;
  animation: slideIn 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.gap-8 {
  gap: 32px;
}
.gap-3 {
  gap: 12px;
}
</style>
