/**
 * SkySQL Serverless Bridge (Blueprint)
 *
 * Deployment: This file should be deployed to a Serverless Function provider
 * (e.g., Vercel, Netlify, or AWS Lambda).
 *
 * Dependencies: npm install mysql2
 */

import mysql from "mysql2/promise";

// --- DATABASE CONFIGURATION ---
// These should be set as Environment Variables in your hosting provider
const DB_CONFIG = {
  host: process.env.SKYSQL_HOST,
  port: process.env.SKYSQL_PORT || 3306,
  user: process.env.SKYSQL_USER,
  password: process.env.SKYSQL_PASSWORD,
  database: process.env.SKYSQL_DATABASE,
  ssl: {
    rejectUnauthorized: true, // Important for SkySQL
  },
};

export default async function handler(req, res) {
  const connection = await mysql.createConnection(DB_CONFIG);

  try {
    const { method, body, query } = req;

    switch (method) {
      case "GET":
        // Fetch all recipes
        const [rows] = await connection.execute(
          "SELECT * FROM recipes ORDER BY createdAt DESC",
        );
        res.status(200).json(
          rows.map((r) => ({
            ...r,
            ingredients: JSON.parse(r.ingredients),
            steps: JSON.parse(r.steps),
          })),
        );
        break;

      case "POST":
        // Create or Update
        const recipe = body;
        const sql = `
          REPLACE INTO recipes (id, name, category, ingredients, steps, notes, cookingTime, difficulty, image, chefName, isFavorite, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          recipe.id,
          recipe.name,
          recipe.category,
          JSON.stringify(recipe.ingredients),
          JSON.stringify(recipe.steps),
          recipe.notes,
          recipe.cookingTime,
          recipe.difficulty,
          recipe.image,
          recipe.chefName,
          recipe.isFavorite ? 1 : 0,
          recipe.createdAt,
        ];
        await connection.execute(sql, values);
        res.status(200).json({ success: true });
        break;

      case "DELETE":
        // Delete recipe
        const { id } = query;
        await connection.execute("DELETE FROM recipes WHERE id = ?", [id]);
        res.status(200).json({ success: true });
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("SkySQL Bridge Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  } finally {
    await connection.end();
  }
}
