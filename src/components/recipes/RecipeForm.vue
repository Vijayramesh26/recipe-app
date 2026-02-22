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
        <v-card class="bento-card pa-6 border shadow-sm mb-4">
          <div class="d-flex align-center justify-space-between mb-4">
            <h3 class="text-h6 font-weight-black">Recipe Media</h3>
          </div>

          <v-row>
            <v-col cols="12" md="6">
              <v-file-input
                label="Upload Image"
                accept="image/*"
                variant="solo"
                flat
                prepend-icon="mdi-camera"
                class="rounded-lg border bg-slate-50 mb-4"
                density="comfortable"
                @change="handleImageUpload"
              ></v-file-input>
              <div
                class="text-center py-2 opacity-50 font-weight-black text-overline"
              >
                OR
              </div>
              <v-text-field
                v-model="formData.image"
                label="Image URL"
                placeholder="https://example.com/image.jpg"
                variant="solo"
                flat
                prepend-icon="mdi-link-variant"
                class="rounded-lg border bg-slate-50 mt-2"
                density="comfortable"
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="d-flex align-center justify-center">
              <div
                v-if="formData.image"
                class="preview-container shadow-premium rounded-xl overflow-hidden border"
              >
                <v-img :src="formData.image" cover height="180" width="100%">
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <div
                  class="preview-badge bg-primary text-white text-caption font-weight-black px-3 py-1"
                >
                  PREVIEW
                </div>
              </div>
              <div
                v-else
                class="preview-placeholder d-flex flex-column align-center justify-center border rounded-xl opacity-20"
              >
                <v-icon size="64">mdi-image-outline</v-icon>
                <div class="text-caption font-weight-black mt-2">NO IMAGE</div>
              </div>
            </v-col>
          </v-row>
        </v-card>
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

.preview-container {
  height: 180px;
  width: 100%;
  position: relative;
  background: #f8fafc;
}

.preview-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  border-radius: 6px;
  z-index: 2;
  letter-spacing: 0.1em;
}

.preview-placeholder {
  height: 180px;
  width: 100%;
  border: 2px dashed #cbd5e1;
  background: #f8fafc;
}
</style>
