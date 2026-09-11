// server.js
// This is the entry point of the backend. It sets up the Express app,
// middleware, and routes, then starts listening for requests.

const express = require("express");
const cors = require("cors");

// Importing this ensures the SQLite database + "meals" table are created
// as soon as the server starts (see database/db.js for details).
require("./database/db");

const mealRoutes = require("./routes/mealRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// ----- Middleware -----
app.use(cors()); // allow the React client (on a different port) to call this API
app.use(express.json()); // parse incoming JSON request bodies into req.body
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// ----- Simple request logger (helpful for beginners to see what's happening) -----
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// ----- Health check route -----
app.get("/", (req, res) => {
  res.json({ message: "🍛 HomeMeals API is running", status: "ok" });
});

// Proxy TheMealDB through our backend so browsers do not hit its CORS policy.
app.get("/api/themealdb/*", async (req, res, next) => {
  try {
    const mealDbPath = req.params[0];
    const query = new URLSearchParams(req.query).toString();
    const mealDbUrl = `https://www.themealdb.com/api/json/v1/1/${mealDbPath}${query ? `?${query}` : ""}`;
    const response = await fetch(mealDbUrl);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    next(error);
  }
});

// ----- Meal routes -----
// All routes defined in routes/mealRoutes.js will be prefixed with /api/meals
app.use("/api/meals", mealRoutes);

// ----- 404 handler (runs when no route above matched) -----
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ----- Global error handler (catches any errors passed via next(err)) -----
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ success: false, message: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
