// routes/mealRoutes.js
// This file wires up URL paths (routes) to the functions in mealController.js
// It is mounted in server.js under the "/api/meals" prefix.

const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealController");

// IMPORTANT: the more specific "/search/..." routes must be declared
// BEFORE the "/:id" route, otherwise Express would treat "search" as an id.

// GET /api/meals/search/name/:name  -> search saved meals by name
router.get("/search/name/:name", mealController.searchByName);

// GET /api/meals/search/ingredient/:ingredient -> search saved meals by ingredient
router.get("/search/ingredient/:ingredient", mealController.searchByIngredient);

// GET /api/meals -> get all saved meals
router.get("/", mealController.getMeals);

// GET /api/meals/:id -> get one saved meal by id
router.get("/:id", mealController.getMeal);

// POST /api/meals -> save a new meal
router.post("/", mealController.addMeal);

// PUT /api/meals/:id -> update an existing meal
router.put("/:id", mealController.editMeal);

// DELETE /api/meals/:id -> delete a meal
router.delete("/:id", mealController.removeMeal);

module.exports = router;
