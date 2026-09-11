// components/Navbar.jsx
// Top navigation bar, shown on every page. Uses React Router's Link/NavLink
// so clicking a link changes the page WITHOUT a full browser reload.

import { useState } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MenuIcon from "@mui/icons-material/Menu";

// Small helper: the styles applied to each nav Button change depending on
// whether that route is currently active (isActive comes from NavLink).
const navButtonStyle = (isActive) => ({
  color: "white",
  fontWeight: isActive ? 700 : 400,
  borderBottom: isActive ? "2px solid white" : "2px solid transparent",
  borderRadius: 0,
});

function Navbar() {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const closeMenu = () => setMenuAnchor(null);

  return (
    <AppBar position="sticky" sx={{ bgcolor: "primary.main", boxShadow: "0 3px 18px rgba(65, 24, 35, 0.18)" }}>
      <Toolbar sx={{ minHeight: { xs: 64, sm: 72 }, px: { xs: 2, sm: 3 } }}>
        <RestaurantIcon sx={{ mr: 1, color: "secondary.main" }} />
        <Typography
          variant="h5"
          component={NavLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "white", fontWeight: 700, fontFamily: '"Fraunces", Georgia, serif' }}
        >
          HomeMeals
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
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
        <IconButton
          color="inherit"
          aria-label="Open navigation menu"
          onClick={(event) => setMenuAnchor(event.currentTarget)}
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
          <MenuItem component={NavLink} to="/" onClick={closeMenu}>Home</MenuItem>
          <MenuItem component={NavLink} to="/search" onClick={closeMenu}>Search</MenuItem>
          <MenuItem component={NavLink} to="/add-meal" onClick={closeMenu}>Add Meal</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
