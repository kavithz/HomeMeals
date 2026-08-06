// context/MealContext.jsx
// This is our global state manager, built with React's Context API.
// It holds the list of meals SAVED in our own SQLite database, plus
// loading/error state, and exposes functions to refresh, add, update,
// and delete meals. Any component can access this via useMeals().

import { createContext, useContext, useState, useCallback } from "react";
import * as api from "../services/api";

// 1. Create the context object
const MealContext = createContext(undefined);

// 2. Create the Provider component - this wraps our whole app in App.jsx
export function MealProvider({ children }) {
  const [savedMeals, setSavedMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch every saved meal from our backend and store it in state
  const refreshSavedMeals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getSavedMeals();
      setSavedMeals(response.data.data);
    } catch (err) {
      console.error("Failed to load saved meals:", err);
      setError("Could not load saved meals. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  // Save a new meal (to our own database) and add it to state
  const addSavedMeal = useCallback(async (mealData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.createMeal(mealData);
      const alreadyExisted = Boolean(response.data.alreadyExisted);
      // Only prepend to local state if this is genuinely a new row -
      // if it already existed, it's already represented in savedMeals.
      if (!alreadyExisted) {
        setSavedMeals((prev) => [response.data.data, ...prev]);
      }
      return { success: true, data: response.data.data, alreadyExisted };
    } catch (err) {
      console.error("Failed to save meal:", err);
      const message = err.response?.data?.message || "Could not save meal.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing saved meal
  const editSavedMeal = useCallback(async (id, mealData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.updateMeal(id, mealData);
      setSavedMeals((prev) => prev.map((m) => (m.id === Number(id) ? response.data.data : m)));
      return { success: true, data: response.data.data };
    } catch (err) {
      console.error("Failed to update meal:", err);
      const message = err.response?.data?.message || "Could not update meal.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a saved meal
  const removeSavedMeal = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.deleteMeal(id);
      setSavedMeals((prev) => prev.filter((m) => m.id !== Number(id)));
      return { success: true };
    } catch (err) {
      console.error("Failed to delete meal:", err);
      const message = err.response?.data?.message || "Could not delete meal.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Everything we want to expose to components that use this context
  const value = {
    savedMeals,
    loading,
    error,
    refreshSavedMeals,
    addSavedMeal,
    editSavedMeal,
    removeSavedMeal,
    setError,
  };

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}

// 3. Custom hook for easy access to the context from any component.
// Usage: const { savedMeals, addSavedMeal } = useMeals();
export function useMeals() {
  const context = useContext(MealContext);
  if (context === undefined) {
    throw new Error("useMeals() must be used inside a <MealProvider>");
  }
  return context;
}
