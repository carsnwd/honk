import { defineConfig } from '@pandacss/dev';
import { honkPreset } from './panda.preset';

export default defineConfig({
  presets: ['@pandacss/dev/presets', honkPreset],
  preflight: true,
  include: ['./src/**/*.{ts,tsx}'],
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
