# HomeMeals

HomeMeals is a full-stack web application for discovering, saving, and managing meal recipes. It combines recipes from **TheMealDB API** with a local **SQLite** database, so users can explore new meals while keeping their own personal collection in one place.

The app was built to demonstrate full-stack development with **React** on the frontend and **Express + SQLite** on the backend, including external API integration, database management, routing, and complete CRUD functionality.

## Key Features

- **Meal Discovery** — browse random meal suggestions from TheMealDB API
- **Smart Search** — search meals by name or ingredient
- **Sri Lankan Favorites** — a curated list of popular Sri Lankan dishes on the home page
- **Detailed Recipes** — view meal image, category, cuisine, ingredients, measurements, and instructions
- **Save Meals** — save favourite meals to a local SQLite database
- **Custom Recipes** — create your own recipes without relying on the external API
- **Manage Saved Meals** — edit or delete saved meals (full CRUD)

## Technologies Used

**Frontend**
- React
- Vite
- React Router DOM
- Material UI
- Axios

**Backend**
- Node.js
- Express.js
- SQLite (via `sqlite3`)
- CORS

**External API**
- TheMealDB API

## Project Structure

```text
HomeMeals/
├── client/            # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/  # API calls (own backend + TheMealDB)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/            # Express backend
│   ├── controllers/
│   ├── database/      # SQLite database + schema
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## How to Run the Project

The project may be downloaded or cloned to different locations, so replace `/path/to/HomeMeals` below with your actual project folder path.

### Backend

```bash
cd /path/to/HomeMeals/server
npm install
npm run dev
```

This starts the Express server on `http://localhost:5001` using nodemon. The SQLite database file and `meals` table are created automatically the first time the server starts — no manual setup needed.

To run it without nodemon:

```bash
npm start
```

### Frontend

```bash
cd /path/to/HomeMeals/client
npm install
npm run dev
```

This starts the Vite dev server on `http://localhost:5173`. It automatically proxies requests to `/api` to the backend at `http://localhost:5001`, so no extra configuration is needed.

Open `http://localhost:5173` in your browser to use the app.

### Build for Production

```bash
cd /path/to/HomeMeals/client
npm run build
npm run preview
```

## Development Notes

- Both `client` and `server` require `npm install` before first run — they have separate `package.json` files.
- The backend must be running on port `5001` for the frontend proxy to work correctly.
- No API key or `.env` file is required — TheMealDB's free tier is used directly, and the SQLite database is created automatically.
- The SQLite database file (`server/database/homemeals.db`) is generated locally and should not be committed to GitHub.
