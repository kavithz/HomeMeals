# HomeMeals

HomeMeals is a full-stack web application for discovering, saving and managing meal recipes. It combines TheMealDB API with a local SQLite database to provide meal discovery and personal recipe management.

## Features

- Search meals by name or ingredient
- Discover random meal recipes
- View detailed recipe information
- Save favourite meals
- Create custom recipes
- Edit saved recipes
- Delete recipes
- Full CRUD functionality
- Integration with TheMealDB API

## Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Context API
- Material UI
- Axios

### Backend

- Node.js
- Express.js

### Database

- SQLite

### External API

- TheMealDB API

## Project Structure

```text
HomeMeals/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── controllers/
│   │   └── mealController.js
│   ├── database/
│   │   ├── schema.sql
│   │   └── db.js
│   ├── models/
│   │   └── mealModel.js
│   ├── routes/
│   │   └── mealRoutes.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
