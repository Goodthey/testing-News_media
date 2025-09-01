import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@entities": "/src/entities",
      "@features": "/src/features",
      "@shared": "/src/shared",
      "@app": "/src/app",
    },
  },
});
