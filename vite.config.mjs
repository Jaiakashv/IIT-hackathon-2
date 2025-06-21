import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    tsconfigPaths(),
    tagger()
  ],
  server: {
    port: 4028,
    host: true,
    strictPort: true,
    open: true,
  },
  preview: {
    port: 4028,
    strictPort: true,
  },
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
});