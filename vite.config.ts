import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          mui: ["@mui/icons-material", "@mui/joy", "@mui/system", "@emotion/react", "@emotion/styled"],
          lib: ["xlsx"],
        },
      },
    },
  },
});
