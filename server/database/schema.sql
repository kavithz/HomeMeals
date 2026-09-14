-- schema.sql
-- Reference PostgreSQL schema for the HomeMeals database.
-- server/database/db.js applies this safely when the API first uses the database.

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

CREATE UNIQUE INDEX IF NOT EXISTS meals_mealid_unique
  ON meals ("mealId")
  WHERE "mealId" IS NOT NULL;
