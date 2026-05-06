// apps/web/vite.config.ts

import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

const config: UserConfig = {
  plugins: [solid()],
  optimizeDeps: {
    include: ['tree-visit'],
  },
  resolve: {
    conditions: ['import', 'module', 'browser', 'default'],
  },
};

export default defineConfig(config);
