// pages/Search.jsx
// Lets the user search TheMealDB either by meal name or by ingredient.
// Results are displayed as a grid of MealCards.

import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SearchIcon from "@mui/icons-material/Search";

import MealCard from "../components/MealCard";
import CuratedMealCard from "../components/CuratedMealCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import * as mealDbApi from "../services/mealDbApi";
import { SRI_LANKAN_DISH_NAMES } from "../services/sriLankanMeals";

function Search() {
  const [searchType, setSearchType] = useState("name"); // "name" | "ingredient"
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [curatedResults, setCuratedResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchTypeChange = (event, newType) => {
    // ToggleButtonGroup passes null if the user clicks the already-selected button - ignore that
    if (newType !== null) {
      setSearchType(newType);
    }
  };

  const runSearch = async (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setCuratedResults([]);

    try {
      if (searchType === "name") {
        const response = await mealDbApi.searchMealsByName(trimmedQuery);
        const meals = response.data.meals || [];
        const normalizedMeals = meals.map(mealDbApi.normalizeMeal);
        setResults(normalizedMeals);
        if (normalizedMeals.length === 0) {
          setCuratedResults(
            SRI_LANKAN_DISH_NAMES.filter((dish) => dish.toLowerCase().includes(trimmedQuery.toLowerCase()))
          );
        }
      } else {
        // Ingredient search only returns partial data (id, name, thumbnail) from TheMealDB,
        // which is enough to render cards - full details are fetched on the detail page.
        const response = await mealDbApi.searchMealsByIngredient(trimmedQuery);
        const meals = response.data.meals || [];
        setResults(
          meals.map((m) => ({
            mealId: m.idMeal,
            name: m.strMeal,
            thumbnail: m.strMealThumb,
            category: "",
            area: "",
          }))
        );
      }
    } catch (err) {
      console.error("Search failed:", err);
      setError("Something went wrong while searching. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 1 }}>
        🔍 Search Meals
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Search TheMealDB by meal name or by a single ingredient (e.g. "chicken", "rice").
      </Typography>

      <Box component="form" onSubmit={runSearch} sx={{ mb: 4 }}>
        <Box sx={{ mb: 2 }}>
          <ToggleButtonGroup color="success" value={searchType} exclusive onChange={handleSearchTypeChange} size="small">
            <ToggleButton value="name">By Name</ToggleButton>
            <ToggleButton value="ingredient">By Ingredient</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label={searchType === "name" ? "Meal name" : "Ingredient"}
            placeholder={searchType === "name" ? "e.g. Arrabiata" : "e.g. Chicken"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 240 }}
          />
          <Button type="submit" variant="contained" color="success" startIcon={<SearchIcon />} disabled={loading}>
            Search
          </Button>
        </Box>
      </Box>

      {loading && <Loader message="Searching meals..." />}
      {!loading && error && <ErrorMessage message={error} />}

      {!loading && !error && hasSearched && results.length === 0 && (
        curatedResults.length > 0 ? (
          <>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Curated Sri Lankan dishes matching "{query}".
            </Typography>
            <Grid container spacing={2}>
              {curatedResults.map((dish) => (
                <Grid item xs={6} sm={4} md={3} key={dish}>
                  <CuratedMealCard dish={dish} index={SRI_LANKAN_DISH_NAMES.indexOf(dish)} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Typography color="text.secondary" sx={{ py: 4 }}>
            No meals found for "{query}". Try a different search term.
          </Typography>
        )
      )}

      {!loading && !error && results.length > 0 && (
        <Grid container spacing={3}>
          {results.map((meal) => (
            <Grid item xs={12} sm={6} md={3} key={meal.mealId}>
              <MealCard meal={meal} source="api" />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Search;
