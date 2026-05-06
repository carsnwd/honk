// apps/web/vite.config.ts

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

const config: UserConfig = {
  plugins: [
    solid(),
    TanStackRouterVite({ target: 'solid', autoCodeSplitting: true }),
  ],
  optimizeDeps: {
    include: ['tree-visit'],
  },
  resolve: {
    conditions: ['import', 'module', 'browser', 'default'],
  },
};

export default defineConfig(config);
