import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1 MB
  },
});