// models/mealModel.js
// This file is the model layer and the only place that talks directly to
// PostgreSQL. Controllers call these functions instead of writing SQL.

const { getDatabase } = require("../database/db");

async function database() {
  const connection = getDatabase();
  await connection.initializationPromise;
  return connection.sql;
}

/**
 * Get every meal stored in the database, newest first.
 * @returns {Promise<Array>} array of meal rows
 */
async function getAllMeals() {
  const sql = await database();
  return sql('SELECT * FROM meals ORDER BY "createdAt" DESC');
}

/**
 * Get a single meal by its database id.
 * @param {number} id
 * @returns {Promise<Object|undefined>} the meal row, or undefined if not found
 */
async function getMealById(id) {
  const sql = await database();
  const rows = await sql`SELECT * FROM meals WHERE id = ${id}`;
  return rows[0];
}

/**
 * Search saved meals by name (partial, case-insensitive match).
 * @param {string} name
 * @returns {Promise<Array>}
 */
async function searchMealsByName(name) {
  const sql = await database();
  return sql`SELECT * FROM meals WHERE name ILIKE ${`%${name}%`} ORDER BY "createdAt" DESC`;
}

/**
 * Search saved meals by ingredient (partial, case-insensitive match
 * against the ingredients JSON string).
 * @param {string} ingredient
 * @returns {Promise<Array>}
 */
async function searchMealsByIngredient(ingredient) {
  const sql = await database();
  return sql`SELECT * FROM meals WHERE ingredients ILIKE ${`%${ingredient}%`} ORDER BY "createdAt" DESC`;
}

/**
 * Look up a saved meal by its original TheMealDB id (mealId), if one exists.
 * Used to prevent saving the same external meal twice.
 * @param {string} mealId
 * @returns {Promise<Object|undefined>}
 */
async function getMealByMealId(mealId) {
  if (!mealId) return undefined;
  const sql = await database();
  const rows = await sql`SELECT * FROM meals WHERE "mealId" = ${mealId}`;
  return rows[0];
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

  const sql = await database();
  const ingredientsJSON = JSON.stringify(ingredients || []);
  const rows = await sql`
    INSERT INTO meals ("mealId", name, category, area, instructions, thumbnail, ingredients)
    VALUES (${mealId || null}, ${name}, ${category || null}, ${area || null}, ${instructions || null}, ${thumbnail || null}, ${ingredientsJSON})
    ON CONFLICT ("mealId") WHERE "mealId" IS NOT NULL DO NOTHING
    RETURNING *
  `;

  if (rows[0]) return { meal: rows[0], alreadyExisted: false };
  return { meal: await getMealByMealId(mealId), alreadyExisted: true };
}

/**
 * Update an existing meal by id.
 * @param {number} id
 * @param {Object} meal - fields to update
 * @returns {Promise<Object|undefined>} the updated meal row
 */
async function updateMeal(id, meal) {
  const sql = await database();
  const { name, category, area, instructions, thumbnail, ingredients } = meal;
  const rows = await sql`
    UPDATE meals
    SET name = ${name}, category = ${category || null}, area = ${area || null},
        instructions = ${instructions || null}, thumbnail = ${thumbnail || null},
        ingredients = ${JSON.stringify(ingredients || [])}, "updatedAt" = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

/**
 * Delete a meal by id.
 * @param {number} id
 * @returns {Promise<boolean>} true if a row was deleted, false otherwise
 */
async function deleteMeal(id) {
  const sql = await database();
  const rows = await sql`DELETE FROM meals WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
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
