// App.jsx
// The root component. Sets up client-side routing with React Router and
// wraps the whole app in our MealProvider so every page can access
// shared state (saved meals) via the useMeals() hook.

import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MealDetails from "./pages/MealDetails";
import AddMeal from "./pages/AddMeal";
import NotFound from "./pages/NotFound";
import { MealProvider } from "./context/MealContext";

function App() {
  return (
    <MealProvider>
      <Box sx={{ minHeight: "100vh", bgcolor: "#f7f7f5" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/meal/:id" element={<MealDetails />} />
          <Route path="/add-meal" element={<AddMeal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </MealProvider>
  );
}

export default App;
