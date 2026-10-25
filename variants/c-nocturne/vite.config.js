import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  root: __dirname,
  base: './',
  plugins: [react()],
  server: { fs: { allow: [path.resolve(__dirname, '../..')] } },
  build: { outDir: path.resolve(__dirname, '../../dist/c-nocturne'), emptyOutDir: true },
});
