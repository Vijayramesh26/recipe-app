<template>
  <div class="settings-view">
    <!-- Header Section -->
    <v-row class="mb-6 mb-md-10 align-center">
      <v-col cols="12" md="8">
        <h1
          class="responsive-h1 font-weight-black mb-2 stagger-item stagger-iter-1"
        >
          App <span class="text-primary italic">Settings</span>
        </h1>
        <p
          class="text-body-2 text-md-body-1 text-grey-darken-1 font-weight-medium mb-0 stagger-item stagger-iter-2 opacity-80"
        >
          Customize your architecture and manage your culinary vault.
        </p>
      </v-col>
    </v-row>

    <!-- Bento Grid Layout -->
    <v-row class="stagger-view">
      <!-- Left Column: Stats & Data -->
      <v-col cols="12" lg="4">
        <!-- Vault Stats Bento -->
        <v-card
          class="bento-card pa-6 bento-gradient-indigo mb-6 shadow-premium border-0"
        >
          <div class="d-flex align-center justify-space-between mb-6">
            <h2 class="text-overline font-weight-black text-white opacity-80">
              Vault Insights
            </h2>
            <v-icon color="white" opacity="60">mdi-database-outline</v-icon>
          </div>
          <v-row dense>
            <v-col cols="6">
              <div class="text-h3 font-weight-black text-white mb-1">
                {{ recipes.length }}
              </div>
              <div class="text-caption font-weight-black text-white opacity-60">
                Created
              </div>
            </v-col>
            <v-col cols="6">
              <div class="text-h3 font-weight-black text-white mb-1">
                {{ favoriteCount }}
              </div>
              <div class="text-caption font-weight-black text-white opacity-60">
                Favorites
              </div>
            </v-col>
          </v-row>
        </v-card>

        <!-- About Bento -->
        <v-card class="bento-card pa-6 shadow-premium border bg-slate-50">
          <h2 class="text-overline font-weight-black mb-4">Software</h2>
          <div class="d-flex align-center">
            <v-avatar color="primary-lighten-5" class="mr-4" size="48">
              <v-icon color="primary">mdi-information-outline</v-icon>
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-black">Version 1.2.0</div>
              <div class="text-caption font-weight-bold text-grey">
                Production Architecture
              </div>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- Right Column: Settings Sections -->
      <v-col cols="12" lg="8">
        <v-row>
          <!-- Appearance Card -->
          <v-col cols="12" md="6">
            <v-card class="bento-card pa-6 shadow-premium border fill-height">
              <div class="d-flex align-center justify-space-between mb-6">
                <h2 class="text-subtitle-1 font-weight-black">Interface</h2>
                <v-icon color="primary" icon="mdi-palette-outline"></v-icon>
              </div>
              <div class="d-flex align-center justify-space-between">
                <div>
                  <div class="text-body-2 font-weight-black">Dark Mode</div>
                  <div class="text-caption font-weight-medium text-grey">
                    High-contrast dark theme
                  </div>
                </div>
                <v-switch
                  v-model="isDark"
                  color="primary"
                  hide-details
                  inset
                  density="compact"
                ></v-switch>
              </div>
            </v-card>
          </v-col>

          <!-- Data Management Card -->
          <v-col cols="12" md="6">
            <v-card
              class="bento-card pa-6 shadow-premium border bg-indigo-lighten-5 fill-height"
            >
              <div class="d-flex align-center justify-space-between mb-4">
                <h2 class="text-subtitle-1 font-weight-black">Library</h2>
                <v-icon color="primary" icon="mdi-cloud-sync-outline"></v-icon>
              </div>
              <p class="text-caption font-weight-medium text-grey mb-6">
                Backup or restore your entire recipe collection.
              </p>
              <div class="d-flex gap-2">
                <v-btn
                  variant="flat"
                  color="white"
                  class="flex-grow-1 font-weight-black"
                  prepend-icon="mdi-export"
                  @click="exportData"
                >
                  Export
                </v-btn>
                <v-btn
                  variant="outlined"
                  color="primary"
                  class="flex-grow-1 font-weight-black"
                  prepend-icon="mdi-import"
                  @click="$refs.fileInput.click()"
                >
                  Import
                </v-btn>
                <input
                  type="file"
                  ref="fileInput"
                  style="display: none"
                  accept=".json"
                  @change="importData"
                />
              </div>
            </v-card>
          </v-col>

          <!-- Security/Experimental (Placeholder for Bento balance) -->
          <v-col cols="12">
            <v-card class="bento-card pa-8 shadow-premium border glass-card">
              <v-row align="center">
                <v-col cols="12" md="8">
                  <h3 class="text-h6 font-weight-black mb-1">
                    Pro Navigation Locked
                  </h3>
                  <p class="text-body-2 font-weight-medium text-grey mb-0">
                    You are currently using the Advanced Pro 3:9 Proportional
                    Grid Architecture. This provides absolute layout stability.
                  </p>
                </v-col>
                <v-col cols="12" md="4" class="text-right">
                  <v-btn color="primary" variant="tonal" rounded="pill">
                    Locked
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- Cloud Connection Card (New) -->
          <v-col cols="12">
            <v-card class="bento-card pa-8 shadow-premium border glass-card">
              <div class="d-flex align-center justify-space-between mb-2">
                <h3 class="text-h6 font-weight-black">Cloud Sync (SkySQL)</h3>
                <v-chip
                  :color="statusColor"
                  size="small"
                  class="font-weight-black"
                  variant="flat"
                >
                  {{ cloudStatus }}
                </v-chip>
              </div>
              <p class="text-body-2 font-weight-medium text-grey mb-6">
                Your recipes are synchronized with MariaDB SkySQL for
                cross-device access.
              </p>
              <v-btn
                color="primary"
                variant="flat"
                prepend-icon="mdi-sync"
                class="font-weight-black"
                :loading="cloudStatus === 'syncing'"
                @click="syncWithCloud"
              >
                Sync Now
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useRecipeStore } from "@/store/recipeStore";
import { useTheme } from "vuetify";

export default {
  name: "SettingsView",
  setup() {
    const theme = useTheme();
    return { theme };
  },
  computed: {
    ...mapState(useRecipeStore, ["recipes", "cloudStatus"]),
    isDark: {
      get() {
        return this.theme.global.name.value === "dark";
      },
      set(val) {
        this.theme.global.name.value = val ? "dark" : "light";
      },
    },
    favoriteCount() {
      return this.recipes.filter((r) => r.isFavorite).length;
    },
    statusColor() {
      const colors = {
        "local-only": "grey",
        syncing: "indigo",
        connected: "success",
        error: "error",
      };
      return colors[this.cloudStatus] || "grey";
    },
  },
  methods: {
    ...mapActions(useRecipeStore, ["importRecipes", "syncWithCloud"]),
    exportData() {
      const data = JSON.stringify(this.recipes, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "my-recipes.json";
      link.click();
      URL.revokeObjectURL(url);
    },
    importData(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const success = this.importRecipes(e.target.result);
        if (success) {
          alert("Recipes imported successfully!");
        } else {
          alert("Failed to import recipes. Please check the file format.");
        }
      };
      reader.readAsText(file);
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

.italic {
  font-style: italic;
}

.rotate-n3 {
  transform: rotate(-3deg);
}

.bento-gradient-indigo {
  background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%) !important;
}

.glass-card {
  background: rgba(var(--v-theme-surface), 0.4) !important;
  backdrop-filter: blur(10px);
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
