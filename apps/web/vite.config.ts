import pandacss from '@pandacss/dev/postcss';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    solid(),
  ],
  css: {
    postcss: {
      plugins: [pandacss],
    },
  },
});
