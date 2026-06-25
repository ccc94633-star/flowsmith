import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/flowsmith/',
  plugins: [vue()],
  server: {
    open: true,
  }
});
