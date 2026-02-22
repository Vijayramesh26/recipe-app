import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#6366F1", // Indigo 500
          secondary: "#F43F5E", // Rose 500
          accent: "#8B5CF6", // Violet 500
          error: "#EF4444",
          info: "#3B82F6",
          success: "#10B981",
          warning: "#F59E0B",
          background: "#F8FAFC", // Slate 50
          surface: "#FFFFFF",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#818CF8", // Indigo 400
          secondary: "#FB7185", // Rose 400
          accent: "#A78BFA", // Violet 400
          background: "#0F172A", // Slate 900
          surface: "#1E293B", // Slate 800
        },
      },
    },
  },
});
