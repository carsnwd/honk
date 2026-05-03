import { defineConfig } from '@pandacss/dev';
import { honkPreset } from './panda.preset';

export default defineConfig({
  presets: ['@pandacss/dev/presets', honkPreset],
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
});
