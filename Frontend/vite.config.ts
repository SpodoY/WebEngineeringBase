import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	base: '/WebEngineeringBase/',
	// server: {
	// 	proxy: {
	// 		'/api': {
	// 			target: 'http://localhost:5007',
	// 			changeOrigin: true,
	// 		}
	// 	}
	// }
});
