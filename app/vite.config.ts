import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  // DOM tests opt in with a `// @vitest-environment jsdom` comment
  test: { environment: 'node', setupFiles: ['src/test/setup.ts'] },
});
