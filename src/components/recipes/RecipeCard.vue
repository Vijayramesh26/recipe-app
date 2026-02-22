<template>
  <v-card
    class="recipe-card bento-card d-flex flex-column h-100"
    elevation="0"
    @click="$emit('view', recipe.id)"
  >
    <div class="image-wrapper overflow-hidden position-relative">
      <v-img
        :src="recipe.image || 'https://placehold.co/600x400?text=No+Image'"
        height="180"
        height-sm="220"
        cover
        class="recipe-image"
      >
        <div class="float-top-right pa-3">
          <v-btn
            icon
            size="x-small"
            class="glass shadow-md"
            :color="recipe.isFavorite ? 'secondary' : 'white'"
            @click.stop="$emit('toggle-favorite', recipe.id)"
          >
            <v-icon size="16">{{
              recipe.isFavorite ? "mdi-heart" : "mdi-heart-outline"
            }}</v-icon>
          </v-btn>
        </div>
      </v-img>
    </div>

    <v-card-text class="pa-4 pa-md-6 pt-5 flex-grow-1 d-flex flex-column">
      <div class="d-flex align-center gap-2 mb-2">
        <span class="text-overline font-weight-black text-primary ls-1">{{
          recipe.category
        }}</span>
        <v-spacer></v-spacer>
        <div
          class="d-flex align-center bg-slate-50 border px-2 px-md-3 py-1 rounded-pill"
        >
          <v-icon size="10" size-md="12" color="primary" class="mr-1"
            >mdi-lightning-bolt</v-icon
          >
          <span class="text-caption font-weight-bold">{{
            recipe.difficulty
          }}</span>
        </div>
      </div>

      <h3
        class="text-h6 text-md-h5 font-weight-black mb-2 mb-md-3 text-truncate"
      >
        {{ recipe.name }}
      </h3>

      <p
        class="text-caption text-md-body-2 text-grey-darken-1 mb-4 mb-md-6 text-truncate-2 opacity-80 line-height-relaxed"
      >
        {{
          recipe.notes ||
          "An exquisite blend of flavors waiting to be discovered..."
        }}
      </p>

      <div class="d-flex align-center mt-auto pt-2 pt-md-4">
        <div class="d-flex align-center">
          <v-avatar size="20" size-md="24" class="mr-2 border">
            <v-img
              src="https://ui-avatars.com/api/?name=Chef&background=6366F1&color=fff"
            ></v-img>
          </v-avatar>
          <span class="text-caption font-weight-bold text-grey-darken-1">{{
            recipe.chefName || "Samayal Chef"
          }}</span>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex align-center text-grey">
          <v-icon size="12" size-md="14" class="mr-1">mdi-clock-outline</v-icon>
          <span class="text-caption font-weight-black"
            >{{ recipe.cookingTime }}m</span
          >
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RecipeCard",
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  emits: ["view", "edit", "delete", "toggle-favorite"],
};
</script>

<style scoped>
.recipe-card {
  box-shadow: var(--shadow-md) !important;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
}

.recipe-card:hover {
  transform: translateY(-8px) !important;
  box-shadow: var(--shadow-premium) !important;
}

.image-wrapper {
  border-radius: 32px 32px 0 0;
}

.recipe-image {
  transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.recipe-card:hover .recipe-image {
  transform: scale(1.08);
}

.ls-1 {
  letter-spacing: 0.1em !important;
}

.line-height-relaxed {
  line-height: 1.5 !important;
}

@media (min-width: 960px) {
  .line-height-relaxed {
    line-height: 1.6 !important;
  }
}

.float-top-right {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
