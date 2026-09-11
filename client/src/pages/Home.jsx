// pages/Home.jsx
// The landing page. Shows a grid of random meals pulled from TheMealDB
// (as inspiration) and, below that, the meals the user has already saved
// to our own database.

import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";

import MealCard from "../components/MealCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useMeals } from "../context/MealContext";
import { getRandomMeals, normalizeMeal, searchMealsByName } from "../services/mealDbApi";
import { SRI_LANKAN_DISH_NAMES } from "../services/sriLankanMeals";

function Home() {
  const [randomMeals, setRandomMeals] = useState([]);
  const [loadingRandom, setLoadingRandom] = useState(true);
  const [randomError, setRandomError] = useState(null);

  const [lankanMeals, setLankanMeals] = useState([]);
  const [loadingLankan, setLoadingLankan] = useState(true);
  const [lankanError, setLankanError] = useState(null);

  const { savedMeals, loading: loadingSaved, error: savedError, refreshSavedMeals } = useMeals();

  // Look up each curated Sri Lankan dish name on TheMealDB and keep
  // whichever ones actually return a result.
  const loadLankanMeals = async () => {
    setLoadingLankan(true);
    setLankanError(null);
    try {
      const responses = await Promise.all(SRI_LANKAN_DISH_NAMES.map((dish) => searchMealsByName(dish)));
      const found = responses
        .map((res) => (res.data.meals ? res.data.meals[0] : null))
        .filter(Boolean)
        .map(normalizeMeal);
      setLankanMeals(found);
    } catch (err) {
      console.error("Failed to load Sri Lankan favorites:", err);
      setLankanError("Could not load Sri Lankan favorites. Please try again.");
    } finally {
      setLoadingLankan(false);
    }
  };

  // Load a fresh batch of random "discover" meals from TheMealDB
  const loadRandomMeals = async () => {
    setLoadingRandom(true);
    setRandomError(null);
    try {
      const meals = await getRandomMeals(8);
      setRandomMeals(meals.map(normalizeMeal));
    } catch (err) {
      console.error("Failed to load random meals:", err);
      setRandomError("Could not load meal suggestions from TheMealDB. Please try again.");
    } finally {
      setLoadingRandom(false);
    }
  };

  // Run once when the Home page first mounts
  useEffect(() => {
    loadRandomMeals();
    loadLankanMeals();
    refreshSavedMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
      {/* ----- Sri Lankan Favorites section ----- */}
      <Box sx={{ mb: { xs: 4, sm: 6 }, maxWidth: 760 }}>
        <Typography variant="h2" component="h1" fontWeight={700} sx={{ fontSize: { xs: "2.35rem", sm: "3.5rem" }, lineHeight: 1.05, mb: 2 }}>
          Cook something worth sharing.
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: { xs: "1rem", sm: "1.15rem" }, maxWidth: 600 }}>
          Explore Sri Lankan favorites and fresh ideas from around the world, all in one warm little kitchen.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 2 }}>
        <Typography variant="h4" component="h2" fontWeight={700}>
          Sri Lankan favorites
        </Typography>
      </Box>

      {loadingLankan && <Loader message="Fetching Sri Lankan favorites..." />}
      {!loadingLankan && lankanError && <ErrorMessage message={lankanError} onRetry={loadLankanMeals} />}
      {!loadingLankan && !lankanError && lankanMeals.length === 0 && (
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          No matches found on TheMealDB right now - try Search instead.
        </Typography>
      )}
      {!loadingLankan && !lankanError && lankanMeals.length > 0 && (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {lankanMeals.map((meal) => (
            <Grid item xs={12} sm={6} md={3} key={meal.mealId}>
              <MealCard meal={meal} source="api" />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ----- Discover section ----- */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          🍽️ Discover Meals
        </Typography>
        <Button variant="outlined" color="success" startIcon={<RefreshIcon />} onClick={loadRandomMeals}>
          Shuffle
        </Button>
      </Box>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        A handful of random meal ideas from TheMealDB. Click any card to view full details.
      </Typography>

      {loadingRandom && <Loader message="Fetching meal ideas..." />}
      {!loadingRandom && randomError && <ErrorMessage message={randomError} onRetry={loadRandomMeals} />}
      {!loadingRandom && !randomError && (
        <Grid container spacing={3}>
          {randomMeals.map((meal) => (
            <Grid item xs={12} sm={6} md={3} key={meal.mealId}>
              <MealCard meal={meal} source="api" />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ----- Saved meals section ----- */}
      <Box sx={{ mt: 6, mb: 2 }}>
        <Typography variant="h4" component="h2" fontWeight={700}>
          ⭐ Your Saved Meals
        </Typography>
        <Typography color="text.secondary">
          Meals you've saved to your personal collection ({savedMeals.length}).
        </Typography>
      </Box>

      {loadingSaved && <Loader message="Loading your saved meals..." />}
      {!loadingSaved && savedError && <ErrorMessage message={savedError} onRetry={refreshSavedMeals} />}
      {!loadingSaved && !savedError && savedMeals.length === 0 && (
        <Typography color="text.secondary" sx={{ py: 4 }}>
          You haven't saved any meals yet. Search for a meal and click "Save Meal" to add it here.
        </Typography>
      )}
      {!loadingSaved && !savedError && savedMeals.length > 0 && (
        <Grid container spacing={3}>
          {savedMeals.map((meal) => (
            <Grid item xs={12} sm={6} md={3} key={meal.id}>
              <MealCard meal={meal} source="saved" />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Home;
