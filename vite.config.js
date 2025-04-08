import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  base: '/th3viousAI/',
  server: {
    port: 5173
  }
});