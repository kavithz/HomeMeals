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
const localOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const configuredOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set([...localOrigins, ...configuredOrigins]);

// ----- Middleware -----
app.use(
  cors({
    origin: (origin, callback) => {
      // Requests without an Origin header include local health checks and server-to-server calls.
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
  })
);
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

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Proxy TheMealDB through our backend so browsers do not hit its CORS policy.
app.get("/api/themealdb/*", async (req, res, next) => {
  try {
    const mealDbPath = req.params[0];
    const query = new URLSearchParams(req.query).toString();
    const mealDbUrl = `https://www.themealdb.com/api/json/v1/1/${mealDbPath}${query ? `?${query}` : ""}`;
    const response = await fetch(mealDbUrl);
    const body = await response.text();
    let data;
    try {
      data = JSON.parse(body);
    } catch (parseError) {
      return res.status(502).json({ success: false, message: "TheMealDB returned an invalid response." });
    }
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
  console.log(`🚀 Server listening on port ${PORT}`);
});
