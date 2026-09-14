// App.jsx
// The root component. Sets up client-side routing with React Router and
// wraps the whole app in our MealProvider so every page can access
// shared state (saved meals) via the useMeals() hook.

import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MealDetails from "./pages/MealDetails";
import AddMeal from "./pages/AddMeal";
import NotFound from "./pages/NotFound";
import { MealProvider } from "./context/MealContext";

const theme = createTheme({
  palette: {
    primary: { main: "#8D153A" },
    secondary: { main: "#D97745" },
    success: { main: "#2F6B4F" },
    background: { default: "#F7F5F0", paper: "#FFFFFF" },
    text: { primary: "#25231F", secondary: "#6B665D" },
  },
  typography: {
    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
    h1: { fontFamily: '"Fraunces", Georgia, serif', letterSpacing: "-0.02em" },
    h2: { fontFamily: '"Fraunces", Georgia, serif', letterSpacing: "-0.02em" },
    h3: { fontFamily: '"Fraunces", Georgia, serif', letterSpacing: "-0.02em" },
    h4: { fontFamily: '"Fraunces", Georgia, serif', letterSpacing: "-0.02em" },
    button: { textTransform: "none", fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: { root: { borderRadius: 8, minHeight: 42 } },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 8 } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(37, 35, 31, 0.08)",
          boxShadow: "0 8px 24px rgba(55, 43, 30, 0.07)",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MealProvider>
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "background.default" }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/meal/:id" element={<MealDetails />} />
              <Route path="/add-meal" element={<AddMeal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          <Box component="footer" sx={{ borderTop: "1px solid rgba(37, 35, 31, 0.1)", px: 2, py: 2.5, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              © 2026 HomeMeals
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Created by Kavith Palansuriya
            </Typography>
          </Box>
        </Box>
        <SpeedInsights />
      </MealProvider>
    </ThemeProvider>
  );
}

export default App;
