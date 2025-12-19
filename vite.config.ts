import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const isPagesBuild = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  base: isPagesBuild ? "/Vitality-reset/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "public"),
  build: {
    outDir: isPagesBuild
      ? path.resolve(import.meta.dirname, "docs")
      : path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    middlewareMode: true,
    allowedHosts: true,
  },
});
