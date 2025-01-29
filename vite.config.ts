import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Make sure it's set to '/' or your custom path
  server: {
  proxy: {
    '/api': 'https://backend-service.onrender.com'
  }
}
});
