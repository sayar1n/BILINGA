import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:5220',
        changeOrigin: true
      },
      '/api': {
        target: 'http://localhost:5220',
        changeOrigin: true
      }
    }
  }
}); 