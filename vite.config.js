import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        workshops: 'workshops/index.html',
        shows: 'shows/index.html',
        portfolio: 'portfolio/index.html',
        customs: 'customs/index.html',
      }
    }
  }
});
