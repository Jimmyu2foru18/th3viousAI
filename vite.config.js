import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  base: '/th3vious-ai/',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 5173
  }
});