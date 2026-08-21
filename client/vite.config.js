import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration for the HomeMeals client.
// See https://vitejs.dev/config/ for more options.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy any request starting with /api to our Express backend,
    // so the client can just call fetch("/api/meals") without CORS issues.
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
