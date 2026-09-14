# HomeMeals

HomeMeals is a full-stack web application for discovering, saving, and managing meal recipes. It combines recipes from **TheMealDB API** with a **Neon PostgreSQL** database, so users can explore new meals while keeping their own personal collection in one place.

The app was built to demonstrate full-stack development with **React** on the frontend and **Express + PostgreSQL** on the backend, including external API integration, database management, routing, search, and complete CRUD functionality.

## Key Features

* **Meal Discovery** — browse random meal suggestions from TheMealDB API
* **Smart Search** — search meals by name or ingredient
* **Sri Lankan Favorites** — a curated list of popular Sri Lankan dishes on the home page
* **Detailed Recipes** — view meal image, category, cuisine, ingredients, measurements, and instructions
* **Save Meals** — save favourite meals to a PostgreSQL database
* **Custom Recipes** — create your own recipes without relying on the external API
* **Manage Saved Meals** — edit or delete saved meals (full CRUD)
* **Duplicate Prevention** — prevents duplicate meals from being saved
* **TheMealDB Integration** — retrieve external meal information through the backend
* **Responsive Interface** — built with React and Material UI

## Technologies Used

**Frontend**

* React
* Vite
* React Router DOM
* Material UI
* Axios

**Backend**

* Node.js
* Express.js
* PostgreSQL
* Neon Serverless PostgreSQL
* CORS

**External API**

* TheMealDB API

**Deployment**

* Vercel

## Project Structure

```text
HomeMeals/
├── client/            # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/  # API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json
│   └── package.json
│
├── server/            # Express backend
│   ├── api/           # Vercel serverless entry point
│   ├── controllers/
│   ├── database/      # PostgreSQL database and schema
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── vercel.json
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

The frontend communicates with the backend through the application's API configuration.

## Build for Production

```bash
cd /path/to/HomeMeals/client
npm install
npm run build
npm run preview
```

## Development Notes

* Both `client` and `server` require `npm install` before first run — they have separate `package.json` files.
* The application uses **Neon PostgreSQL** for persistent meal data.
* The database schema is initialized automatically when required.
* Database initialization is safe and does not delete existing data.
* Duplicate external meals are prevented from being saved multiple times.
* Custom meals can be created without relying on TheMealDB.
* TheMealDB is used as the external recipe source.
* No TheMealDB API key is required for the current implementation.
* Each developer should use their own database configuration when running the project locally.
* Private configuration and credentials should not be committed to GitHub.
* The project can be deployed with Vercel using separate frontend and backend projects.
* The project can be cloned into any directory; replace `/path/to/HomeMeals` in the commands with the actual location of the cloned repository.

