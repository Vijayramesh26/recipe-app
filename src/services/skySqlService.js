/**
 * SkySQL Service
 * Acts as the bridge between the Vue.js frontend and the MariaDB SkySQL cloud.
 * This service communicates with the Serverless Bridge (API Route).
 */

const BRIDGE_URL = import.meta.env.VITE_SKYSQL_BRIDGE_URL || "/api/recipes";

export const skySqlService = {
  /**
   * Fetch all recipes from SkySQL
   */
  async fetchAll() {
    try {
      const response = await fetch(BRIDGE_URL);
      if (!response.ok) throw new Error("Failed to fetch recipes from SkySQL");
      return await response.json();
    } catch (error) {
      console.error("SkySQL Fetch Error:", error);
      throw error;
    }
  },

  /**
   * Save or Update a recipe in SkySQL
   */
  async upsert(recipe) {
    try {
      const response = await fetch(BRIDGE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });
      if (!response.ok) throw new Error("Failed to save recipe to SkySQL");
      return await response.json();
    } catch (error) {
      console.error("SkySQL Save Error:", error);
      throw error;
    }
  },

  /**
   * Delete a recipe from SkySQL
   */
  async delete(id) {
    try {
      const response = await fetch(`${BRIDGE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete recipe from SkySQL");
      return true;
    } catch (error) {
      console.error("SkySQL Delete Error:", error);
      throw error;
    }
  },
};
