// pages/AddMeal.jsx
// A form that lets the user manually create their own custom meal and
// save it directly to our SQLite database (as opposed to importing one
// from TheMealDB, which happens on the MealDetails page).

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useMeals } from "../context/MealContext";

// The shape of one empty ingredient row in the form
const emptyIngredient = { ingredient: "", measure: "" };

function AddMeal() {
  const navigate = useNavigate();
  const { addSavedMeal } = useMeals();

  const [form, setForm] = useState({
    name: "",
    category: "",
    area: "",
    instructions: "",
    thumbnail: "",
  });
  const [ingredients, setIngredients] = useState([{ ...emptyIngredient }]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Update a top-level text field (name, category, area, instructions, thumbnail)
  const handleFieldChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Update one ingredient row
  const handleIngredientChange = (index, field) => (e) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: e.target.value };
    setIngredients(updated);
  };

  const addIngredientRow = () => {
    setIngredients((prev) => [...prev, { ...emptyIngredient }]);
  };

  const removeIngredientRow = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!form.name.trim()) {
      setFormError("Meal name is required.");
      return;
    }

    // Drop any blank ingredient rows before saving
    const cleanedIngredients = ingredients.filter((i) => i.ingredient.trim() !== "");

    setSubmitting(true);
    const result = await addSavedMeal({
      ...form,
      ingredients: cleanedIngredients,
    });
    setSubmitting(false);

    if (result.success) {
      setSnackbar({ open: true, message: "Meal added successfully!", severity: "success" });
      // Give the user a moment to see the confirmation, then send them to the new meal
      setTimeout(() => navigate(`/meal/${result.data.id}?source=saved`), 800);
    } else {
      setFormError(result.message || "Failed to save meal.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        ➕ Add a New Meal
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Create your own custom meal and save it to your personal collection.
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Meal Name"
              required
              fullWidth
              value={form.name}
              onChange={handleFieldChange("name")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Image URL"
              fullWidth
              placeholder="https://..."
              value={form.thumbnail}
              onChange={handleFieldChange("thumbnail")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              fullWidth
              placeholder="e.g. Dessert"
              value={form.category}
              onChange={handleFieldChange("category")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Area / Cuisine"
              fullWidth
              placeholder="e.g. Sri Lankan"
              value={form.area}
              onChange={handleFieldChange("area")}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Instructions"
              fullWidth
              multiline
              minRows={4}
              value={form.instructions}
              onChange={handleFieldChange("instructions")}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" fontWeight={700} sx={{ mt: 2, mb: 1 }}>
              Ingredients
            </Typography>

            {ingredients.map((row, index) => (
              <Box key={index} sx={{ display: "flex", gap: 2, mb: 1, alignItems: "center" }}>
                <TextField
                  label="Ingredient"
                  size="small"
                  value={row.ingredient}
                  onChange={handleIngredientChange(index, "ingredient")}
                  sx={{ flexGrow: 1 }}
                />
                <TextField
                  label="Measure"
                  size="small"
                  value={row.measure}
                  onChange={handleIngredientChange(index, "measure")}
                  sx={{ flexGrow: 1 }}
                />
                <IconButton
                  color="error"
                  onClick={() => removeIngredientRow(index)}
                  disabled={ingredients.length === 1}
                  aria-label="Remove ingredient"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Box>
            ))}

            <Button startIcon={<AddCircleOutlineIcon />} onClick={addIngredientRow} sx={{ mt: 1 }}>
              Add Ingredient
            </Button>
          </Grid>
        </Grid>

        {formError && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {formError}
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="success" startIcon={<SaveIcon />} disabled={submitting}>
            {submitting ? "Saving..." : "Save Meal"}
          </Button>
        </Box>
      </Box>

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

export default AddMeal;
