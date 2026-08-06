// pages/NotFound.jsx
// Simple fallback page shown when the user navigates to a route that
// doesn't exist (a catch-all "*" route in App.jsx).

import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
      <Typography variant="h1" fontWeight={800} color="success.main">
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page not found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Box>
        <Button component={RouterLink} to="/" variant="contained" color="success">
          Go back home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;
