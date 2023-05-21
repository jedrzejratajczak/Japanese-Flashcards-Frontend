import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'https://jedrzejratajczak.github.io/Japanese-Flashcards-Frontend/',
  server: {
    port: 3000,
    strictPort: true
  }
});
