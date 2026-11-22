import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

function aliasUnhashedAssetsPlugin(): Plugin {
  return {
    name: 'alias-unhashed-assets',
    closeBundle() {
      const assetsDir = path.resolve(import.meta.dirname, 'dist', 'assets');
      if (!fs.existsSync(assetsDir)) return;
      const files = fs.readdirSync(assetsDir);
      const latestJs = files.find((f) => /^index-[^.]+\.js$/.test(f));
      const latestCss = files.find((f) => /^index-[^.]+\.css$/.test(f));
      if (latestJs) {
        fs.copyFileSync(path.join(assetsDir, latestJs), path.join(assetsDir, 'index.js'));
      }
      if (latestCss) {
        fs.copyFileSync(path.join(assetsDir, latestCss), path.join(assetsDir, 'index.css'));
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  return {
    // Base URL configuration for GitHub Pages deployment under https://hurke-games.github.io/landing/
    base: process.env.BASE_URL || (mode === 'production' ? '/landing/' : '/'),
    plugins: [react(), tailwindcss(), aliasUnhashedAssetsPlugin()],
    resolve: {
      alias: {
        '@': import.meta.dirname,
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
