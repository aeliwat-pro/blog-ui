import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from "lovable-tagger";

// Vite configuration
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Listen on all IP addresses, adjust as necessary
    port: 3030, // Port for your React app
    proxy: {
      '/api': {
        target: 'http://localhost:9090', // blog-service spring boot Localhost for development
        changeOrigin: true, // Required to modify the origin header
        secure: mode === 'production' // Set to true if using HTTPS in production
       // rewrite: (path) => path.replace(/^\/api/, '') // Optional: rewrite the path to remove the `/api` prefix
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(), // Optional plugin based on the mode
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Path alias for your source files
    },
  },
}));
