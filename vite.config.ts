import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, Plugin } from 'vite';

function devHtmlPlugin(): Plugin {
  return {
    name: 'dev-html-transform',
    transformIndexHtml(html) {
      return html
        .replace(/<script type="module" crossorigin src="[^"]*assets\/index\.js"><\/script>/, '<script type="module" src="/src/main.tsx"></script>')
        .replace(/<link rel="stylesheet" crossorigin href="[^"]*assets\/index\.css">/, '');
    },
  };
}

export default defineConfig(({ mode }) => {
  return {
    // Base URL configuration for GitHub Pages deployment under https://hurke-games.github.io/landing/
    base: process.env.BASE_URL || (mode === 'production' ? '/landing/' : '/'),
    plugins: [devHtmlPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': import.meta.dirname,
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
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
