import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/auth": {
        target: process.env.VITE_API_PROXY_TARGET ?? "https://nest-react-docker.onrender.com",
        changeOrigin: true,
      },
      "/api": {
        target: process.env.VITE_API_PROXY_TARGET ?? "https://nest-react-docker.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
