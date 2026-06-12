import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.svg', 'hero.png', 'icons.svg'],
			manifest: {
				name: 'Wedding Gift Planner',
				short_name: 'GiftPlanner',
				description: 'Calcola il regalo di matrimonio perfetto',
				theme_color: '#f43f5e',
				background_color: '#f8fafc',
				display: 'standalone',
				icons: [
					{
						src: 'favicon.svg',
						sizes: '192x192',
						type: 'image/svg+xml',
						purpose: 'any maskable',
					},
					{
						src: 'favicon.svg',
						sizes: '512x512',
						type: 'image/svg+xml',
						purpose: 'any maskable',
					},
				],
			},
		}),
	],
})
