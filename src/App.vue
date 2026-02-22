<template>
  <v-app>
    <!-- Premium Animated Splash Screen -->
    <v-fade-transition hide-on-leave>
      <div
        v-if="showSplash"
        class="splash-screen bg-surface d-flex flex-column align-center justify-center"
      >
        <div class="logo-container stagger-item">
          <v-avatar size="320" class="mb-10 shadow-premium heritage-border">
            <v-img :src="logo" cover></v-img>
          </v-avatar>
          <div class="brand-reveal text-center">
            <h1 class="text-h2 font-weight-black tracking-tight mb-2">
              Samayal
            </h1>
            <div class="text-overline font-weight-black text-primary ls-2">
              Tamil Heritage Kitchen
            </div>
          </div>
        </div>
      </div>
    </v-fade-transition>

    <!-- Main Application Content -->
    <v-fade-transition>
      <router-view v-if="!showSplash" />
    </v-fade-transition>
  </v-app>
</template>

<script>
import logo from "@/assets/logo.png";

export default {
  name: "App",
  data() {
    return {
      showSplash: true,
      logo,
    };
  },
  mounted() {
    // Reveal the app after 2.5 seconds of splash magic
    setTimeout(() => {
      this.showSplash = false;
    }, 2500);
  },
};
</script>

<style>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: radial-gradient(circle at center, #ffffff 0%, #f8fafc 100%);
}

.dark .splash-screen {
  background: radial-gradient(circle at center, #0f172a 0%, #020617 100%);
}

.logo-container {
  animation: organicFloat 4s ease-in-out infinite;
}

.brand-reveal {
  opacity: 0;
  animation: slideUpFade 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  animation-delay: 0.4s;
}

.heritage-border {
  border: 4px solid white;
  background: white;
}

.ls-2 {
  letter-spacing: 0.2em !important;
}

@keyframes organicFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tracking tight utility for the splash */
.tracking-tight {
  letter-spacing: -0.05em !important;
}
</style>
