<template>
  <v-form ref="form" v-model="isValid" @submit.prevent="submit">
    <v-row>
      <!-- Basic Info -->
      <v-col cols="12" md="6">
        <v-text-field
          v-model="formData.name"
          label="Recipe Name"
          placeholder="e.g. Signature Masala Dosa"
          :rules="[(v) => !!v || 'Name is required']"
          required
          variant="solo"
          flat
          class="bento-card border ultra-field"
          bg-color="grey-lighten-5"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="formData.chefName"
          label="Chef Name"
          placeholder="e.g. Chef Vijay"
          variant="solo"
          flat
          class="bento-card border ultra-field"
          bg-color="grey-lighten-5"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="formData.category"
          :items="categories"
          label="Category"
          :rules="[(v) => !!v || 'Category is required']"
          required
          variant="solo"
          flat
          class="bento-card border ultra-field"
          bg-color="grey-lighten-5"
        ></v-select>
      </v-col>

      <v-col cols="6" md="4">
        <v-text-field
          v-model.number="formData.cookingTime"
          label="Time"
          type="number"
          suffix="min"
          variant="solo"
          flat
          class="bento-card border ultra-field"
          bg-color="grey-lighten-5"
        ></v-text-field>
      </v-col>

      <v-col cols="6" md="4">
        <v-select
          v-model="formData.difficulty"
          :items="['Easy', 'Medium', 'Hard']"
          label="Difficulty"
          variant="solo"
          flat
          class="bento-card border ultra-field"
          bg-color="grey-lighten-5"
        ></v-select>
      </v-col>

      <v-col cols="12">
        <v-file-input
          label="Hero Image"
          accept="image/*"
          variant="solo"
          flat
          prepend-icon="mdi-camera"
          class="bento-card border ultra-field"
          bg-color="grey-lighten-5"
          @change="handleImageUpload"
        ></v-file-input>
      </v-col>

      <!-- Ingredients Section -->
      <v-col cols="12">
        <v-card class="bento-card pa-5 pa-md-8 border shadow-sm">
          <div class="d-flex align-center justify-space-between mb-4 mb-md-6">
            <h3 class="text-h6 text-md-h5 font-weight-black">Ingredients</h3>
            <v-btn
              icon="mdi-plus"
              color="primary"
              variant="flat"
              size="small"
              class="rounded-lg shadow-sm"
              @click="addIngredient"
            ></v-btn>
          </div>

          <v-slide-y-transition group>
            <div
              v-for="(item, index) in formData.ingredients"
              :key="index"
              class="d-flex align-center mb-3 mb-md-4 gap-2"
            >
              <v-icon
                class="mr-1 mr-md-2 handle grey-text opacity-40 d-none d-sm-flex"
                >mdi-drag-horizontal-variant</v-icon
              >
              <v-text-field
                v-model="item.name"
                placeholder="Item"
                hide-details
                variant="solo"
                flat
                density="compact"
                class="rounded-lg border bg-slate-50"
              ></v-text-field>
              <v-text-field
                v-model="item.amount"
                placeholder="Amt"
                hide-details
                variant="solo"
                flat
                density="compact"
                class="rounded-lg border bg-slate-50"
                style="max-width: 80px"
              ></v-text-field>
              <v-btn
                icon="mdi-close"
                size="x-small"
                color="error"
                variant="tonal"
                @click="removeIngredient(index)"
              ></v-btn>
            </div>
          </v-slide-y-transition>
        </v-card>
      </v-col>

      <!-- Preparation Steps -->
      <v-col cols="12">
        <v-card class="bento-card pa-5 pa-md-8 border shadow-sm">
          <div class="d-flex align-center justify-space-between mb-4 mb-md-6">
            <h3 class="text-h6 text-md-h5 font-weight-black">Preparation</h3>
            <v-btn
              icon="mdi-plus"
              color="primary"
              variant="flat"
              size="small"
              class="rounded-lg shadow-sm"
              @click="addStep"
            ></v-btn>
          </div>

          <v-slide-y-transition group>
            <div
              v-for="(step, index) in formData.steps"
              :key="index"
              class="d-flex align-start mb-3 mb-md-4 gap-2 gap-md-3"
            >
              <v-avatar
                color="primary"
                size="28"
                size-md="32"
                class="text-caption font-weight-black mt-1"
              >
                {{ index + 1 }}
              </v-avatar>
              <v-textarea
                v-model="formData.steps[index]"
                placeholder="Next step..."
                auto-grow
                rows="1"
                hide-details
                variant="solo"
                flat
                density="compact"
                class="rounded-lg border bg-slate-50"
              ></v-textarea>
              <v-btn
                icon="mdi-delete-outline"
                size="x-small"
                color="error"
                variant="text"
                class="mt-1"
                @click="removeStep(index)"
              ></v-btn>
            </div>
          </v-slide-y-transition>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-textarea
          v-model="formData.notes"
          label="Notes"
          variant="solo"
          flat
          rows="3"
          class="bento-card border ultra-field"
          bg-color="grey-lighten-5"
        ></v-textarea>
      </v-col>

      <v-col
        cols="12"
        class="d-flex flex-column-reverse flex-sm-row justify-end gap-3 mt-4"
      >
        <v-btn
          variant="tonal"
          size="large"
          class="rounded-pill px-8 font-weight-black"
          @click="$emit('cancel')"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          type="submit"
          size="large"
          class="rounded-pill px-10 font-weight-black shadow-premium"
          :disabled="!isValid"
        >
          {{ isEdit ? "Update" : "Save Recipe" }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: "RecipeForm",
  props: {
    initialData: {
      type: Object,
      default: () => null,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  emits: ["save", "cancel"],
  data() {
    return {
      isValid: false,
      formData: {
        name: "",
        chefName: "",
        category: "",
        cookingTime: 30,
        difficulty: "Medium",
        ingredients: [{ name: "", amount: "" }],
        steps: [""],
        notes: "",
        image: null,
      },
    };
  },
  mounted() {
    if (this.initialData) {
      Object.assign(
        this.formData,
        JSON.parse(JSON.stringify(this.initialData)),
      );
    }
  },
  methods: {
    addIngredient() {
      this.formData.ingredients.push({ name: "", amount: "" });
    },
    removeIngredient(index) {
      this.formData.ingredients.splice(index, 1);
    },
    addStep() {
      this.formData.steps.push("");
    },
    removeStep(index) {
      this.formData.steps.splice(index, 1);
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formData.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.$emit("save", { ...this.formData });
      }
    },
  },
};
</script>

<style scoped>
.handle {
  cursor: grab;
}

.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

.ultra-field :deep(.v-field__input) {
  min-height: 56px !important;
}

@media (max-width: 600px) {
  .ultra-field :deep(.v-field__input) {
    min-height: 48px !important;
    font-size: 0.9rem;
  }
}

.v-slide-y-transition-move {
  transition: transform 0.4s ease;
}
</style>
