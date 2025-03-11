import { URL, fileURLToPath } from 'node:url';
import path from 'node:path';
// @ts-ignore
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['**/src/**/*.ts'],
      exclude: [
        '**/src/database/**',
        '**/src/entities/**',
        '**/src/trpc/index.ts',
        '**/src/repositories/index.ts',
      ],
    },

    // necessary for Vitest VS Code extension to pick up env variables
    env: loadEnv('', process.cwd(), ''),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@server': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests'),
    },
  },
});
