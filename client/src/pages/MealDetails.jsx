// pages/MealDetails.jsx
// Shows the full details of a single meal: image, name, category, area,
// ingredients list, and full instructions.
//
// This page can display a meal from TWO different sources, chosen via the
// ?source= query string:
//   - source=api   -> fetch full details live from TheMealDB by its mealId
//   - source=saved -> fetch the meal from OUR OWN database by its numeric id
//
// It also lets the user Save (if viewing an API meal) or Delete (if viewing
// a saved meal).

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useMeals } from "../context/MealContext";
import { getMealDetails, normalizeMeal } from "../services/mealDbApi";
import * as api from "../services/api";
import { SRI_LANKAN_MEAL_DETAILS } from "../services/sriLankanMeals";

function MealDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const source = searchParams.get("source") || "api"; // "api" | "saved"

  const [meal, setMeal] = useState(null); // normalized meal shape used by the whole page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedDbId, setSavedDbId] = useState(null); // the row id in OUR database, if this meal is already saved

  const { addSavedMeal, removeSavedMeal } = useMeals();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const loadMeal = async () => {
    setLoading(true);
    setError(null);
    try {
      if (source === "curated") {
        const curatedName = searchParams.get("name") || "Sri Lankan dish";
        const curatedDetails = SRI_LANKAN_MEAL_DETAILS[curatedName] || {
          description: "A curated Sri Lankan dish with regional and family variations.",
          ingredients: [],
        };
        setMeal({
          mealId: id,
          name: curatedName,
          category: "Sri Lankan cuisine",
          area: "Sri Lanka",
          thumbnail: "",
          ingredients: curatedDetails.ingredients.map((ingredient) => ({ ingredient, measure: "" })),
          instructions: curatedDetails.description,
        });
        setSavedDbId(null);
      } else if (source === "saved") {
        // Fetch straight from our own backend/database
        const response = await api.getSavedMealById(id);
        const row = response.data.data;
        setMeal({
          mealId: row.mealId,
          name: row.name,
          category: row.category,
          area: row.area,
          instructions: row.instructions,
          thumbnail: row.thumbnail,
          // ingredients are stored as a JSON string in the DB - parse them back into an array
          ingredients: row.ingredients ? JSON.parse(row.ingredients) : [],
        });
        setSavedDbId(row.id);
      } else {
        // Fetch live from TheMealDB
        const response = await getMealDetails(id);
        const rawMeal = response.data.meals ? response.data.meals[0] : null;
        if (!rawMeal) {
          setError("Meal not found.");
          return;
        }
        setMeal(normalizeMeal(rawMeal));
        setSavedDbId(null);

        // Check whether this exact meal (by its TheMealDB id) was already
        // saved in a previous session, so we don't show "Save Meal" again
        // and risk creating a duplicate row.
        try {
          const savedResponse = await api.getSavedMeals();
          const existingMatch = savedResponse.data.data.find((m) => m.mealId === rawMeal.idMeal);
          if (existingMatch) {
            setSavedDbId(existingMatch.id);
          }
        } catch (lookupErr) {
          // Non-fatal: worst case the Save button shows when it technically
          // doesn't need to. The backend itself will also reject duplicates.
          console.warn("Could not check for existing saved meal:", lookupErr);
        }
      }
    } catch (err) {
      console.error("Failed to load meal details:", err);
      setError("Could not load this meal's details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, source]);

  const handleSave = async () => {
    const result = await addSavedMeal(meal);
    if (result.success) {
      const message = result.alreadyExisted
        ? "This meal is already in your saved collection."
        : "Meal saved to your collection!";
      setSnackbar({ open: true, message, severity: result.alreadyExisted ? "info" : "success" });
      setSavedDbId(result.data.id);
    } else {
      setSnackbar({ open: true, message: result.message || "Failed to save meal.", severity: "error" });
    }
  };

  const handleDelete = async () => {
    if (!savedDbId) return;
    const result = await removeSavedMeal(savedDbId);
    if (result.success) {
      setSnackbar({ open: true, message: "Meal removed from your collection.", severity: "success" });
      // Give the user a moment to see the confirmation, then go back home
      setTimeout(() => navigate("/"), 800);
    } else {
      setSnackbar({ open: true, message: result.message || "Failed to delete meal.", severity: "error" });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Loader message="Loading meal details..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ErrorMessage message={error} onRetry={loadMeal} />
      </Container>
    );
  }

  if (!meal) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          {meal.thumbnail && (
            <Paper elevation={2} sx={{ overflow: "hidden", borderRadius: 2 }}>
              <img src={meal.thumbnail} alt={meal.name} style={{ width: "100%", display: "block" }} />
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={7}>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            {meal.name}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
            {meal.category && <Chip label={meal.category} color="success" />}
            {meal.area && <Chip label={meal.area} color="warning" />}
          </Stack>

          {source === "api" && !savedDbId && (
            <Button variant="contained" color="success" startIcon={<BookmarkAddIcon />} onClick={handleSave} sx={{ mb: 2 }}>
              Save Meal
            </Button>
          )}

          {source === "saved" && (
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete} sx={{ mb: 2 }}>
              Remove from Saved
            </Button>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight={700} gutterBottom>
            Ingredients
          </Typography>
          <List dense>
            {meal.ingredients.length === 0 && (
              <Typography color="text.secondary">No ingredient list available.</Typography>
            )}
            {meal.ingredients.map((item, index) => (
              <ListItem key={index} disableGutters>
                <ListItemText primary={item.ingredient} secondary={item.measure} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Instructions
          </Typography>
          <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
            {meal.instructions || "No instructions available."}
          </Typography>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default MealDetails;
