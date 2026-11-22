import { defineConfig } from '@vite-pwa/assets-generator/config';

// App icons for the installable app (PWA). The source is the logo centred on the brand colour
// (public/icon-source.png). Regenerate after changing it: npm run icons
const background = '#567a78';

export default defineConfig({
  headLinkOptions: { preset: '2023' },
  preset: {
    transparent: { sizes: [64, 192, 512], favicons: [[48, 'favicon.ico']], padding: 0 },
    maskable: { sizes: [512], padding: 0.15, resizeOptions: { background } },
    apple: { sizes: [180], padding: 0, resizeOptions: { background } },
  },
  images: ['public/icon-source.png'],
});
