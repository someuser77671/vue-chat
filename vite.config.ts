import { URL, fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    tailwindcss(),
    vueDevTools(),
    mode === 'analyze' ?
      visualizer({
        open: true,
        filename: 'stats.html',
        gzipSize: true,
        brotliSize: true,
      })
    : null,
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.ts', '.json'],
  },
  envPrefix: 'APP_',
  appType: 'spa',
  base: '/vue-chat/',
  server: {
    host: false,
    port: 5173,
    strictPort: true,
    open: false,
  },
  preview: {
    host: false,
    port: 5174,
    strictPort: true,
    open: false,
  },
}));
