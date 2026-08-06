// database/db.js
// This file creates (or opens) the SQLite database file and makes sure
// the "meals" table exists before the rest of the app tries to use it.

const sqlite3 = require("sqlite3").verbose(); // verbose() gives us better stack traces on errors
const path = require("path");

// The database file will live inside this "database" folder as ceylonmeal.db
const DB_PATH = path.join(__dirname, "ceylonmeal.db");

// Open (or create, if it doesn't exist yet) the SQLite database file
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("❌ Failed to connect to SQLite database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database at", DB_PATH);
  }
});

// Create the "meals" table if it does not already exist.
// This SQL runs once at startup - if the table is already there, this does nothing.
const CREATE_MEALS_TABLE = `
  CREATE TABLE IF NOT EXISTS meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mealId TEXT,                 -- the original TheMealDB id (optional, for meals imported from the API)
    name TEXT NOT NULL,          -- meal name (required)
    category TEXT,               -- e.g. "Seafood", "Dessert"
    area TEXT,                   -- e.g. "Sri Lankan", "Italian"
    instructions TEXT,           -- cooking instructions
    thumbnail TEXT,              -- image URL
    ingredients TEXT,            -- stored as a JSON string, e.g. [{"ingredient":"Rice","measure":"1 cup"}]
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  );
`;

db.serialize(() => {
  db.run(CREATE_MEALS_TABLE, (err) => {
    if (err) {
      console.error("❌ Failed to create meals table:", err.message);
    } else {
      console.log("✅ 'meals' table is ready");
    }
  });
});

module.exports = db;
