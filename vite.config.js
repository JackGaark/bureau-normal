import { defineConfig } from 'vite'

// Source lives in src/, static images in src/public/, build goes to dist/ (served by .openai/hosting.json).
export default defineConfig({
  root: 'src',
  base: './',
  build: { outDir: '../dist', emptyOutDir: true },
  server: { port: 8000 },
})
