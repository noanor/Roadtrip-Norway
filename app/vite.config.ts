import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  // GitHub Pages serves the app from /<repo>/, so the deploy workflow sets BASE_PATH.
  // Locally and in Docker the app runs from /.
  const base = loadEnv(mode, '.', 'BASE_PATH').BASE_PATH || '/';

  return {
    base,
    plugins: [
      react(),
      // Installable app: manifest, icons and an offline cache of the app itself.
      // Map tiles and routes still need a network connection.
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.png', 'favicon.ico', 'apple-touch-icon-180x180.png'],
        manifest: {
          name: 'Roadtrip Norway',
          short_name: 'Roadtrip',
          description: 'Planlegg bilturen gjennom Norge, med stopp langs ruten.',
          lang: 'nb',
          start_url: base,
          scope: base,
          display: 'standalone',
          orientation: 'portrait',
          background_color: '#567a78',
          theme_color: '#567a78',
          icons: [
            { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
            { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,ico,svg,woff2}'],
          globIgnores: ['icon-source.png'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
              handler: 'StaleWhileRevalidate',
              options: { cacheName: 'google-fonts', expiration: { maxEntries: 20 } },
            },
          ],
        },
      }),
    ],
    server: { port: 5173 },
    // DOM tests opt in with a `// @vitest-environment jsdom` comment
    test: { environment: 'node', setupFiles: ['src/test/setup.ts'] },
  };
});
