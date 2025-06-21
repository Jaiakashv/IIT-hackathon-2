import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",  // Changed from 'build' to 'dist' for Vercel
    sourcemap: true,
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: 4028,
    host: true,
    strictPort: true,
  },
  preview: {
    port: 4028,
    strictPort: true,
  },
  define: {
    // For environment variables
    'process.env': process.env,
  },
});