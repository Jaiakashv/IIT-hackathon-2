import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  // Base public path when served in production
  base: '/',  // Update this if deploying to a subdirectory
  
  // Build configuration
  build: {
    outDir: "dist",  // Changed from 'build' to 'dist' for Vercel compatibility
    sourcemap: true,  // Enable source maps for better debugging
    chunkSizeWarningLimit: 2000,  // Increase chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor dependencies into separate chunks
          react: ['react', 'react-dom', 'react-router-dom'],
          // Add other large dependencies here
        },
      },
    },
    // Minify the output for production
    minify: 'esbuild',
    // Enable brotli compression
    brotliSize: true,
  },
  
  // Development server configuration
  server: {
    port: 4028,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new'],
    // Enable HMR (Hot Module Replacement)
    hmr: {
      overlay: true,
    },
  },
  
  // Plugins
  plugins: [
    tsconfigPaths(),
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Enable JSX in .jsx and .tsx files
      include: ['**/*.tsx', '**/*.ts', '**/*.jsx', '**/*.js'],
    }),
    tagger(),
  ],
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    // Enable esbuild optimizations
    esbuildOptions: {
      target: 'es2020',
    },
  },
  
  // Environment variables
  define: {
    'process.env': {}
  },
  
  // Static assets handling
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot'],
  
  // CSS configuration
  css: {
    devSourcemap: true,  // Enable source maps for CSS in development
    modules: {
      // Configure CSS modules
      scopeBehaviour: 'local',
      localsConvention: 'camelCaseOnly',
    },
  },
  
  // Build optimization for assets
  build: {
    outDir: "dist",
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
      },
    },
  },
});