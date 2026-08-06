-- schema.sql
-- Reference SQL script for the CeylonMealApp database.
-- NOTE: You do not need to run this manually - database/db.js runs this
-- automatically (using sqlite3) the first time the server starts.
-- This file is provided so you can inspect or recreate the schema by hand
-- (for example using the `sqlite3` CLI: `sqlite3 ceylonmeal.db < schema.sql`).

CREATE TABLE IF NOT EXISTS meals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mealId TEXT,
  name TEXT NOT NULL,
  category TEXT,
  area TEXT,
  instructions TEXT,
  thumbnail TEXT,
  ingredients TEXT,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);
