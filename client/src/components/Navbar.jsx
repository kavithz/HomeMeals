// components/Navbar.jsx
// Top navigation bar, shown on every page. Uses React Router's Link/NavLink
// so clicking a link changes the page WITHOUT a full browser reload.

import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import RestaurantIcon from "@mui/icons-material/Restaurant";

// Small helper: the styles applied to each nav Button change depending on
// whether that route is currently active (isActive comes from NavLink).
const navButtonStyle = (isActive) => ({
  color: "white",
  fontWeight: isActive ? 700 : 400,
  borderBottom: isActive ? "2px solid white" : "2px solid transparent",
  borderRadius: 0,
});

function Navbar() {
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#8D153A" }}>
      <Toolbar>
        <RestaurantIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "white", fontWeight: 700 }}
        >
          HomeMeals
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button component={NavLink} to="/" end style={({ isActive }) => navButtonStyle(isActive)}>
            Home
          </Button>
          <Button component={NavLink} to="/search" style={({ isActive }) => navButtonStyle(isActive)}>
            Search
          </Button>
          <Button component={NavLink} to="/add-meal" style={({ isActive }) => navButtonStyle(isActive)}>
            Add Meal
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
