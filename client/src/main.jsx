// main.jsx
// The entry point of the React application. This file mounts the <App />
// component into the #root div in index.html, and sets up two "providers"
// that wrap the whole app:
//   1. BrowserRouter - enables React Router's client-side routing
//   2. ThemeProvider  - applies our custom Material UI color theme

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App.jsx";
import "./index.css";

// Custom MUI theme - inspired by the colors of the Sri Lankan flag:
// deep maroon, gold, and the green/orange stripes.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#8D153A" }, // maroon (lion flag background)
    success: { main: "#00534E" }, // deep green stripe
    warning: { main: "#FFB700" }, // gold border/trim
    secondary: { main: "#FF7000" }, // saffron/orange stripe
    background: { default: "#FAF6EF" }, // warm off-white
  },
  shape: { borderRadius: 10 },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
