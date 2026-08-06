// models/mealModel.js
// This file is the "model" layer - it is the ONLY place that talks
// directly to the database using SQL. Controllers call these functions
// instead of writing SQL themselves. This keeps the code organized.

const db = require("../database/db");

/**
 * Get every meal stored in the database, newest first.
 * @returns {Promise<Array>} array of meal rows
 */
function getAllMeals() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM meals ORDER BY createdAt DESC";
    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

/**
 * Get a single meal by its database id.
 * @param {number} id
 * @returns {Promise<Object|undefined>} the meal row, or undefined if not found
 */
function getMealById(id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM meals WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

/**
 * Search saved meals by name (partial, case-insensitive match).
 * @param {string} name
 * @returns {Promise<Array>}
 */
function searchMealsByName(name) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM meals WHERE name LIKE ? ORDER BY createdAt DESC";
    db.all(sql, [`%${name}%`], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

/**
 * Search saved meals by ingredient (partial, case-insensitive match
 * against the ingredients JSON string).
 * @param {string} ingredient
 * @returns {Promise<Array>}
 */
function searchMealsByIngredient(ingredient) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM meals WHERE ingredients LIKE ? ORDER BY createdAt DESC";
    db.all(sql, [`%${ingredient}%`], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

/**
 * Look up a saved meal by its original TheMealDB id (mealId), if one exists.
 * Used to prevent saving the same external meal twice.
 * @param {string} mealId
 * @returns {Promise<Object|undefined>}
 */
function getMealByMealId(mealId) {
  return new Promise((resolve, reject) => {
    if (!mealId) return resolve(undefined); // custom meals with no mealId are never "duplicates"
    const sql = "SELECT * FROM meals WHERE mealId = ?";
    db.get(sql, [mealId], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

/**
 * Insert a new meal into the database.
 * If a meal with the same mealId has already been saved, the existing
 * row is returned instead of creating a duplicate.
 * @param {Object} meal - { mealId, name, category, area, instructions, thumbnail, ingredients }
 * @returns {Promise<{meal: Object, alreadyExisted: boolean}>}
 */
async function createMeal(meal) {
  const { mealId, name, category, area, instructions, thumbnail, ingredients } = meal;

  // Guard against duplicates: only meals imported from TheMealDB have a mealId,
  // so this check is skipped for fully custom meals (mealId is null/undefined).
  const existing = await getMealByMealId(mealId);
  if (existing) {
    return { meal: existing, alreadyExisted: true };
  }

  return new Promise((resolve, reject) => {
    // ingredients is expected to be a JS array/object - we store it as a JSON string
    const ingredientsJSON = JSON.stringify(ingredients || []);

    const sql = `
      INSERT INTO meals (mealId, name, category, area, instructions, thumbnail, ingredients)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [mealId || null, name, category || null, area || null, instructions || null, thumbnail || null, ingredientsJSON];

    db.run(sql, params, function (err) {
      // NOTE: we use a regular function() (not an arrow function) above
      // so that "this" refers to the sqlite3 statement, giving us this.lastID
      if (err) return reject(err);
      getMealById(this.lastID)
        .then((row) => resolve({ meal: row, alreadyExisted: false }))
        .catch(reject);
    });
  });
}

/**
 * Update an existing meal by id.
 * @param {number} id
 * @param {Object} meal - fields to update
 * @returns {Promise<Object|undefined>} the updated meal row
 */
function updateMeal(id, meal) {
  return new Promise((resolve, reject) => {
    const { name, category, area, instructions, thumbnail, ingredients } = meal;
    const ingredientsJSON = JSON.stringify(ingredients || []);

    const sql = `
      UPDATE meals
      SET name = ?, category = ?, area = ?, instructions = ?, thumbnail = ?, ingredients = ?, updatedAt = datetime('now')
      WHERE id = ?
    `;
    const params = [name, category || null, area || null, instructions || null, thumbnail || null, ingredientsJSON, id];

    db.run(sql, params, function (err) {
      if (err) return reject(err);
      if (this.changes === 0) return resolve(undefined); // no row matched that id
      getMealById(id).then(resolve).catch(reject);
    });
  });
}

/**
 * Delete a meal by id.
 * @param {number} id
 * @returns {Promise<boolean>} true if a row was deleted, false otherwise
 */
function deleteMeal(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM meals WHERE id = ?";
    db.run(sql, [id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
}

module.exports = {
  getAllMeals,
  getMealById,
  getMealByMealId,
  searchMealsByName,
  searchMealsByIngredient,
  createMeal,
  updateMeal,
  deleteMeal,
};
