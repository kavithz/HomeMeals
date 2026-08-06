// components/ErrorMessage.jsx
// A reusable component for displaying error messages consistently
// across the app, with an optional "Retry" button.

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

/**
 * @param {Object} props
 * @param {string} props.message - the error message to display
 * @param {Function} [props.onRetry] - optional callback for a "Retry" button
 */
function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <Box sx={{ my: 3 }}>
      <Alert
        severity="error"
        action={
          onRetry ? (
            <Button color="inherit" size="small" onClick={onRetry}>
              RETRY
            </Button>
          ) : undefined
        }
      >
        <AlertTitle>Something went wrong</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}

export default ErrorMessage;
