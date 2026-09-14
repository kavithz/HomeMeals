// services/api.js
// A pre-configured Axios instance for talking to OUR OWN backend
// (the Express + SQLite server in the /server folder).
// Because vite.config.js proxies "/api" to http://localhost:5001,
// we can just use relative paths here like "/api/meals".

import axios from "axios";

export const API_BASE_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----- Saved meals (our own SQLite database) -----

// Get every meal saved in the database
export const getSavedMeals = () => api.get("/meals");

// Get a single saved meal by its database id
export const getSavedMealById = (id) => api.get(`/meals/${id}`);

// Search saved meals by name
export const searchSavedMealsByName = (name) => api.get(`/meals/search/name/${encodeURIComponent(name)}`);

// Search saved meals by ingredient
export const searchSavedMealsByIngredient = (ingredient) =>
  api.get(`/meals/search/ingredient/${encodeURIComponent(ingredient)}`);

// Save a new meal to the database
export const createMeal = (mealData) => api.post("/meals", mealData);

// Update an existing saved meal
export const updateMeal = (id, mealData) => api.put(`/meals/${id}`, mealData);

// Delete a saved meal
export const deleteMeal = (id) => api.delete(`/meals/${id}`);

export default api;
