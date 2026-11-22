import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

function syncStaticDeployOutputsPlugin(): Plugin {
  return {
    name: 'sync-static-deploy-outputs',
    closeBundle() {
      const rootDir = import.meta.dirname;
      const distDir = path.resolve(rootDir, 'dist');
      const assetsDir = path.join(distDir, 'assets');
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

      const distIndex = path.join(distDir, 'index.html');
      if (fs.existsSync(distIndex)) {
        const distAdminDir = path.join(distDir, 'admin');
        fs.mkdirSync(distAdminDir, { recursive: true });
        fs.copyFileSync(distIndex, path.join(distAdminDir, 'index.html'));
        fs.copyFileSync(distIndex, path.join(distDir, 'admin.html'));
        fs.copyFileSync(distIndex, path.join(rootDir, 'admin.html'));
      }

      const docsDir = path.resolve(rootDir, 'docs');
      fs.rmSync(docsDir, { recursive: true, force: true });
      fs.cpSync(distDir, docsDir, { recursive: true });

      const rootAssetsDir = path.resolve(rootDir, 'assets');
      fs.rmSync(rootAssetsDir, { recursive: true, force: true });
      fs.cpSync(assetsDir, rootAssetsDir, { recursive: true });
    },
  };
}

export default defineConfig(({ mode }) => {
  return {
    // Base URL configuration for GitHub Pages deployment under https://hurke-games.github.io/landing/
    base: process.env.BASE_URL || (mode === 'production' ? '/landing/' : '/'),
    plugins: [react(), tailwindcss(), syncStaticDeployOutputsPlugin()],
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
          assetFileNames: (assetInfo) =>
            assetInfo.names?.some((n) => n.endsWith('.css'))
              ? 'assets/[name]-[hash].[ext]'
              : 'assets/[name].[ext]',
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
