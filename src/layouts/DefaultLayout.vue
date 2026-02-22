<template>
  <v-app :theme="themeName">
    <!-- Mobile-only drawer remains temporary for minimal impact -->
    <v-navigation-drawer
      v-if="isMobile"
      v-model="drawer"
      temporary
      elevation="0"
      class="mobile-drawer"
      :width="280"
    >
      <div class="pa-8 mb-4 text-center">
        <v-avatar size="64" class="mb-3 shadow-premium border-2 border-white">
          <v-img :src="logo" cover></v-img>
        </v-avatar>
        <div class="text-h6 font-weight-black tracking-tight">Samayal</div>
        <div class="text-overline font-weight-black text-grey opacity-60 mt-n1">
          ESSENTIAL KITCHEN
        </div>
      </div>

      <v-list nav class="px-4">
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="xl"
          class="mb-2 py-3"
          active-color="primary"
          link
          @click="drawer = false"
        >
          <template v-slot:title>
            <span class="font-weight-black">{{ item.title }}</span>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Hard Proportional Grid Layout Architecture -->
    <v-row no-gutters class="viewport-wrapper overflow-hidden">
      <!-- Fixed Sidebar (25% - col-3) -->
      <v-col
        v-if="!isMobile"
        cols="3"
        class="desktop-sidebar-fixed glass border-r d-flex flex-column"
      >
        <div class="pa-6 pa-md-8 text-center">
          <v-avatar size="64" class="mb-3 shadow-premium border-2 border-white">
            <v-img :src="logo" cover></v-img>
          </v-avatar>
          <div class="text-h6 font-weight-black tracking-tight">Samayal</div>
          <div
            class="text-overline font-weight-black text-grey opacity-60 mt-n1"
            style="font-size: 0.7rem !important"
          >
            ESSENTIAL KITCHEN
          </div>
        </div>

        <v-list nav class="px-4 flex-grow-1" density="compact">
          <v-list-item
            v-for="item in navItems"
            :key="item.title"
            :to="item.to"
            :prepend-icon="item.icon"
            :title="item.title"
            rounded="xl"
            class="mb-2 py-3 transition-all"
            active-color="primary"
            link
          >
            <template v-slot:title>
              <span class="font-weight-black text-subtitle-1">{{
                item.title
              }}</span>
            </template>
          </v-list-item>
        </v-list>

        <div class="pa-8">
          <v-card
            class="bento-card pa-6 bg-indigo-lighten-5 dark:bg-slate-800 border-0 rounded-2xl"
            flat
          >
            <div class="d-flex align-center mb-2">
              <v-icon color="primary" size="24" class="mr-2"
                >mdi-shield-check</v-icon
              >
              <div class="text-body-2 font-weight-black">Premium Mode</div>
            </div>
            <!-- <div class="text-caption opacity-60" style="line-height: 1.4">
              Mathematical 3:9 Split Locked
            </div> -->
          </v-card>
        </div>
      </v-col>

      <!-- Scrollable Content Column (75% - col-9) -->
      <v-col
        :cols="isMobile ? 12 : 9"
        class="content-column-hard fill-height d-flex flex-column"
      >
        <!-- Custom Fixed Header (Bypasses v-app-bar positioning) -->
        <header
          class="custom-header glass border-b d-flex align-center px-6 px-md-10"
        >
          <v-app-bar-nav-icon
            v-if="isMobile"
            @click="drawer = !drawer"
            class="ml-n2 mr-2"
          ></v-app-bar-nav-icon>

          <v-app-bar-title v-if="isMobile" class="font-weight-black text-h6">
            Samayal
          </v-app-bar-title>

          <v-spacer></v-spacer>

          <div class="d-flex align-center gap-3">
            <v-btn
              icon
              variant="flat"
              size="large"
              class="bento-card border shadow-sm"
              @click="toggleTheme"
            >
              <v-icon size="22" :color="isDark ? 'amber' : 'primary'">{{
                isDark ? "mdi-weather-sunny" : "mdi-weather-night"
              }}</v-icon>
            </v-btn>

            <v-avatar
              size="44"
              class="cursor-pointer shadow-md border-2 border-white"
            >
              <v-img
                src="https://ui-avatars.com/api/?name=User&background=6366F1&color=fff"
              ></v-img>
            </v-avatar>
          </div>
        </header>

        <!-- Main Content Area with Locked Scrollbar -->
        <div
          class="main-content-scroll flex-grow-1 overflow-y-scroll pt-6 pt-md-10 pb-16"
        >
          <div
            class="inner-container mx-auto px-6 px-md-10"
            style="max-width: 1400px"
          >
            <router-view v-slot="{ Component }">
              <v-fade-transition mode="out-in">
                <component :is="Component" />
              </v-fade-transition>
            </router-view>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Mobile Navigation -->
    <div v-if="isMobile" class="mobile-nav-wrapper pa-4 px-6">
      <v-bottom-navigation
        color="primary"
        grow
        class="rounded-pill shadow-xl border glass elevation-10"
        app
        height="64"
      >
        <v-btn v-for="item in navItems" :key="item.title" :to="item.to">
          <v-icon size="18" class="mb-1">{{ item.icon }}</v-icon>
          <span class="text-caption font-weight-black">{{ item.title }}</span>
        </v-btn>
      </v-bottom-navigation>
    </div>
  </v-app>
</template>

<script>
import { useDisplay, useTheme } from "vuetify";
import logo from "@/assets/logo.png";

export default {
  name: "DefaultLayout",
  setup() {
    const { mobile } = useDisplay();
    const theme = useTheme();
    return { mobile, theme };
  },
  data() {
    return {
      drawer: false,
      navItems: [
        { title: "Home", icon: "mdi-view-dashboard-outline", to: "/" },
        { title: "New", icon: "mdi-plus-circle-outline", to: "/add" },
        { title: "Saved", icon: "mdi-bookmark-outline", to: "/favorites" },
        { title: "Settings", icon: "mdi-tune-variant", to: "/settings" },
      ],
      logo,
    };
  },
  computed: {
    isMobile() {
      return this.mobile;
    },
    isDark() {
      return this.theme.global.name.value === "dark";
    },
    themeName() {
      return this.theme.global.name.value;
    },
  },
  methods: {
    toggleTheme() {
      this.theme.global.name.value =
        this.theme.global.name.value === "dark" ? "light" : "dark";
    },
  },
};
</script>

<style>
/* Absolute Layout Stabilization Logic */
.viewport-wrapper {
  height: 100vh;
  width: 100vw;
  background: rgb(var(--v-theme-background));
}

.desktop-sidebar-fixed {
  height: 100vh;
  overflow: hidden;
  position: relative;
  z-index: 10;
}

.content-column-hard {
  height: 100vh;
  position: relative;
}

.custom-header {
  height: 72px;
  width: 100%;
  flex-shrink: 0;
  background: rgba(var(--v-theme-surface), 0.7) !important;
  backdrop-filter: blur(20px);
  z-index: 5;
}

/* Hard scrollbar locking to prevent horizontal shifting */
.main-content-scroll {
  overflow-y: scroll !important; /* ALWAYS show scrollbar area */
  overflow-x: hidden;
}

/* Glassmorphism */
.glass {
  background: rgba(var(--v-theme-surface), 0.7) !important;
  backdrop-filter: blur(20px) !important;
  border-color: rgba(var(--v-border-color), 0.1) !important;
}

.dark .glass {
  background: rgba(15, 23, 42, 0.7) !important;
}

/* Premium Styles */
.shadow-premium {
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.05) !important;
}

.tracking-tight {
  letter-spacing: -0.05em !important;
}

.mobile-nav-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
}

.mobile-nav-wrapper > * {
  pointer-events: auto;
}

.mobile-drawer {
  border-radius: 0 40px 40px 0 !important;
  background: rgb(var(--v-theme-surface)) !important;
  border: none !important;
}

/* Clean Internal Scrollbars */
.main-content-scroll::-webkit-scrollbar {
  width: 8px;
}

.main-content-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.main-content-scroll::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary), 0.1);
  border-radius: 20px;
}

.main-content-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-primary), 0.2);
}

.gap-3 {
  gap: 12px;
}
</style>
