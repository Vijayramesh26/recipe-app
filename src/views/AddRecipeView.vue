<template>
  <div class="add-recipe-view">
    <v-row class="mb-4 mb-md-12 align-center">
      <v-col
        cols="12"
        md="8"
        class="d-flex align-center stagger-item stagger-iter-1"
      >
        <v-btn
          icon="mdi-arrow-left"
          variant="text"
          class="mr-4 ml-n4"
          @click="$router.back()"
        ></v-btn>
        <h1 class="responsive-h1 font-weight-black tracking-tight">
          {{ isEdit ? "Edit" : "New" }}
          <span class="text-primary italic">Recipe</span>
        </h1>
      </v-col>
      <v-col
        cols="12"
        md="4"
        class="d-none d-md-flex align-center justify-center"
      >
        <v-avatar
          size="240"
          color="indigo-lighten-5"
          class="stagger-item stagger-iter-4 rotate-3 opacity-40"
        >
          <v-icon size="120" color="primary">mdi-chef-hat</v-icon>
        </v-avatar>
      </v-col>
    </v-row>

    <v-row class="stagger-item stagger-iter-3">
      <v-col cols="12">
        <v-card class="bento-card pa-6 pa-md-10 shadow-premium" elevation="0">
          <RecipeForm
            :initial-data="initialData"
            :is-edit="isEdit"
            :categories="categories"
            @save="handleSave"
            @cancel="$router.back()"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useRecipeStore } from "@/store/recipeStore";
import RecipeForm from "@/components/recipes/RecipeForm.vue";

export default {
  name: "AddRecipeView",
  components: {
    RecipeForm,
  },
  computed: {
    ...mapState(useRecipeStore, ["categories"]),
    isEdit() {
      return !!this.$route.params.id;
    },
    initialData() {
      const store = useRecipeStore();
      return this.isEdit ? store.getRecipeById(this.$route.params.id) : null;
    },
  },
  methods: {
    ...mapActions(useRecipeStore, ["addRecipe", "updateRecipe"]),
    handleSave(recipeData) {
      if (this.isEdit) {
        this.updateRecipe(this.$route.params.id, recipeData);
      } else {
        this.addRecipe(recipeData);
      }
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.responsive-h1 {
  font-size: clamp(2rem, 4.2vw, 4rem); /* Match Gold Standard */
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

.stagger-item {
  opacity: 0;
  animation: organicEntry 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.stagger-iter-1 {
  animation-delay: 0.1s;
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
