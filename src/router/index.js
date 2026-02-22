import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      {
        path: "add",
        name: "add-recipe",
        component: () => import("../views/AddRecipeView.vue"),
      },
      {
        path: "edit/:id",
        name: "edit-recipe",
        component: () => import("../views/AddRecipeView.vue"),
      },
      {
        path: "recipe/:id",
        name: "recipe-detail",
        component: () => import("../views/RecipeDetailView.vue"),
      },
      {
        path: "favorites",
        name: "favorites",
        component: () => import("../views/FavoritesView.vue"),
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("../views/SettingsView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
