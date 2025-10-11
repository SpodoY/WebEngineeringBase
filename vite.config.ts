import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/WebEngineeringBase/',
  resolve: {
    alias: {
      '@': resolve(
        __dirname,
        './src'
      ) /* This beauty gave me the good stuff 😫🍆 */,
    },
  },
});
