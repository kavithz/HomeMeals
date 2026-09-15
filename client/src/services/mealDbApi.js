// services/mealDbApi.js
// This file talks to the free, public TheMealDB API to fetch real meal
// data (names, images, ingredients, instructions, etc).
// Docs: https://www.themealdb.com/api.php

import axios from "axios";
import { API_BASE_URL } from "./api";

const MEALDB_BASE_URL = `${API_BASE_URL}/themealdb`;

const mealDbApi = axios.create({
  baseURL: MEALDB_BASE_URL,
  timeout: 8000,
});

/**
 * Search TheMealDB for meals by name.
 * @param {string} name
 * @returns {Promise} axios response - response.data.meals is an array (or null)
 */
export const searchMealsByName = (name) => mealDbApi.get("/search.php", { params: { s: name } });

/**
 * Filter meals by cuisine area. TheMealDB returns partial meal information
 * here, which is enough for the meal cards on the home page.
 * @param {string} area
 * @returns {Promise}
 */
export const searchMealsByArea = (area) => mealDbApi.get("/filter.php", { params: { a: area } });

/**
 * Filter TheMealDB meals by a single main ingredient.
 * NOTE: this endpoint returns only partial meal info (id, name, thumbnail) -
 * use getMealDetails() below to fetch the full details for a given meal.
 * @param {string} ingredient
 * @returns {Promise}
 */
export const searchMealsByIngredient = (ingredient) => mealDbApi.get("/filter.php", { params: { i: ingredient } });

/**
 * Get the full details for a single meal by its TheMealDB id.
 * @param {string} id
 * @returns {Promise} axios response - response.data.meals[0] is the full meal object
 */
export const getMealDetails = (id) => mealDbApi.get("/lookup.php", { params: { i: id } });

/**
 * Get a list of random meals - used to populate the Home page.
 * TheMealDB only returns ONE random meal per call, so we call it
 * multiple times in parallel to build a small home page grid.
 * @param {number} count how many random meals to fetch
 * @returns {Promise<Array>} array of full meal objects
 */
export const getRandomMeals = async (count = 8) => {
  const mealsById = new Map();
  const maxAttempts = count * 3;

  for (let attempt = 0; attempt < maxAttempts && mealsById.size < count; attempt += count) {
    const remaining = count - mealsById.size;
    const requests = Array.from({ length: remaining }, () => mealDbApi.get("/random.php"));
    const results = await Promise.allSettled(requests);

    results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value.data.meals?.[0])
      .filter((meal) => meal?.idMeal && !mealsById.has(meal.idMeal))
      .forEach((meal) => mealsById.set(meal.idMeal, meal));
  }

  const meals = [...mealsById.values()];

  if (meals.length === 0) {
    throw new Error("No random meals were returned by TheMealDB.");
  }

  return meals;
};

/**
 * Helper: converts a raw TheMealDB meal object (which stores up to 20
 * ingredient/measure pairs as separate fields like strIngredient1,
 * strIngredient2, strMeasure1, strMeasure2, ...) into a clean array of
 * { ingredient, measure } objects, skipping any empty entries.
 * @param {Object} meal - the raw meal object from TheMealDB
 * @returns {Array<{ingredient: string, measure: string}>}
 */
export const extractIngredients = (meal) => {
  if (!meal) return [];

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }
  return ingredients;
};

/**
 * Helper: normalizes a raw TheMealDB meal object into the simpler shape
 * our app and our own database use everywhere else in the app.
 * @param {Object} meal - the raw meal object from TheMealDB
 */
export const normalizeMeal = (meal) => {
  if (!meal) return null;
  return {
    mealId: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory || "",
    area: meal.strArea || "",
    instructions: meal.strInstructions || "",
    thumbnail: meal.strMealThumb || "",
    ingredients: extractIngredients(meal),
  };
};

export default mealDbApi;
