// database/db.js
// This file provides the Neon PostgreSQL client and initializes the meals table.

const { neon } = require("@neondatabase/serverless");

const connectionString = process.env.DATABASE_URL;
const sql = connectionString ? neon(connectionString) : null;
let initializationPromise;

const CREATE_MEALS_TABLE = `
  CREATE TABLE IF NOT EXISTS meals (
    id SERIAL PRIMARY KEY,
    "mealId" TEXT,
    name TEXT NOT NULL,
    category TEXT,
    area TEXT,
    instructions TEXT,
    thumbnail TEXT,
    ingredients TEXT,
    "createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TEXT DEFAULT CURRENT_TIMESTAMP
  );
`;

async function initializeDatabase() {
  if (!sql) {
    throw new Error("DATABASE_URL is not configured");
  }

  await sql(CREATE_MEALS_TABLE);
  await sql(`
    CREATE UNIQUE INDEX IF NOT EXISTS meals_mealid_unique
    ON meals ("mealId")
    WHERE "mealId" IS NOT NULL
  `);
}

function getDatabase() {
  if (!sql) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!initializationPromise) {
    initializationPromise = initializeDatabase();
  }

  return { sql, initializationPromise };
}

module.exports = { getDatabase, initializeDatabase };
