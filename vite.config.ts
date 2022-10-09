import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

const config = defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [sveltekit()],
});

export default config;