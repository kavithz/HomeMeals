// controllers/mealController.js
// Controllers take the incoming HTTP request, call the model layer to
// do the actual database work, and send back an HTTP response.
// They should NOT contain raw SQL - that belongs in models/mealModel.js

const mealModel = require("../models/mealModel");

// GET /api/meals
// Returns every meal saved in the database.
async function getMeals(req, res) {
  try {
    const meals = await mealModel.getAllMeals();
    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    console.error("Error fetching meals:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch meals" });
  }
}

// GET /api/meals/:id
// Returns a single meal by its database id.
async function getMeal(req, res) {
  try {
    const { id } = req.params;
    const meal = await mealModel.getMealById(id);

    if (!meal) {
      return res.status(404).json({ success: false, message: `Meal with id ${id} not found` });
    }

    res.status(200).json({ success: true, data: meal });
  } catch (error) {
    console.error("Error fetching meal:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch meal" });
  }
}

// GET /api/meals/search/name/:name
// Searches saved meals by name.
async function searchByName(req, res) {
  try {
    const { name } = req.params;
    const meals = await mealModel.searchMealsByName(name);
    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    console.error("Error searching meals by name:", error.message);
    res.status(500).json({ success: false, message: "Failed to search meals" });
  }
}

// GET /api/meals/search/ingredient/:ingredient
// Searches saved meals by ingredient.
async function searchByIngredient(req, res) {
  try {
    const { ingredient } = req.params;
    const meals = await mealModel.searchMealsByIngredient(ingredient);
    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    console.error("Error searching meals by ingredient:", error.message);
    res.status(500).json({ success: false, message: "Failed to search meals" });
  }
}

// POST /api/meals
// Creates (saves) a new meal in the database.
// If this meal (matched by its TheMealDB mealId) was already saved
// before, the existing row is returned instead of creating a duplicate.
async function addMeal(req, res) {
  try {
    const { name } = req.body;

    // Basic validation - a meal must at least have a name
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Meal name is required" });
    }

    const { meal, alreadyExisted } = await mealModel.createMeal(req.body);

    if (alreadyExisted) {
      return res.status(200).json({ success: true, alreadyExisted: true, message: "This meal is already in your saved collection", data: meal });
    }

    res.status(201).json({ success: true, alreadyExisted: false, data: meal });
  } catch (error) {
    console.error("Error creating meal:", error.message);
    res.status(500).json({ success: false, message: "Failed to create meal" });
  }
}

// PUT /api/meals/:id
// Updates an existing meal.
async function editMeal(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Meal name is required" });
    }

    const updatedMeal = await mealModel.updateMeal(id, req.body);

    if (!updatedMeal) {
      return res.status(404).json({ success: false, message: `Meal with id ${id} not found` });
    }

    res.status(200).json({ success: true, data: updatedMeal });
  } catch (error) {
    console.error("Error updating meal:", error.message);
    res.status(500).json({ success: false, message: "Failed to update meal" });
  }
}

// DELETE /api/meals/:id
// Deletes a meal from the database.
async function removeMeal(req, res) {
  try {
    const { id } = req.params;
    const deleted = await mealModel.deleteMeal(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: `Meal with id ${id} not found` });
    }

    res.status(200).json({ success: true, message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Error deleting meal:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete meal" });
  }
}

module.exports = {
  getMeals,
  getMeal,
  searchByName,
  searchByIngredient,
  addMeal,
  editMeal,
  removeMeal,
};
