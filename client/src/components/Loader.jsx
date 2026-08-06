// components/Loader.jsx
// A simple, reusable loading indicator shown while data is being fetched.

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function Loader({ message = "Loading..." }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        gap: 2,
      }}
    >
      <CircularProgress color="success" />
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  );
}

export default Loader;
