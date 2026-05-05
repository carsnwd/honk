// apps/web/panda.config.ts
import { defineConfig } from '@pandacss/dev';
import { honkPreset } from '../../packages/ui/panda.preset';

export default defineConfig({
  presets: ['@pandacss/dev/presets', honkPreset],
  preflight: true,
  include: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
  globalCss: {
    'html, body': {
      fontFamily: 'sans',
      bg: 'background',
      color: 'foreground',
      margin: '0',
      padding: '0',
    },
    '*': {
      boxSizing: 'border-box',
    },
  },
});
