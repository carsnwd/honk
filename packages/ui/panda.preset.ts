import { definePreset } from '@pandacss/dev';

export const honkPreset = definePreset({
  name: 'honk-preset',
  theme: {
    extend: {
      tokens: {
        colors: {
          neutral: {
            0: { value: '#ffffff' },
            100: { value: '#f5f5f5' },
            200: { value: '#e5e5e5' },
            300: { value: '#d4d4d4' },
            600: { value: '#525252' },
            800: { value: '#262626' },
            900: { value: '#0a0a0a' },
          },
          accent: {
            DEFAULT: { value: '#0066cc' },
            subtle: { value: '#e8f0fb' },
          },
          danger: {
            DEFAULT: { value: '#cc0000' },
            subtle: { value: '#fef2f2' },
          },
          success: {
            DEFAULT: { value: '#007a33' },
            subtle: { value: '#f0faf4' },
          },
        },
        fontSizes: {
          xs: { value: '0.75rem' },
          sm: { value: '0.875rem' },
          md: { value: '1rem' },
          lg: { value: '1.125rem' },
          xl: { value: '1.25rem' },
          '2xl': { value: '1.5rem' },
        },
        radii: {
          sm: { value: '4px' },
          md: { value: '8px' },
          lg: { value: '12px' },
          full: { value: '9999px' },
        },
        spacing: {
          1: { value: '0.25rem' },
          2: { value: '0.5rem' },
          3: { value: '0.75rem' },
          4: { value: '1rem' },
          5: { value: '1.25rem' },
          6: { value: '1.5rem' },
          8: { value: '2rem' },
          10: { value: '2.5rem' },
          12: { value: '3rem' },
        },
      },
      semanticTokens: {
        colors: {
          bg: {
            default: { value: '{colors.neutral.0}' },
            subtle: { value: '{colors.neutral.100}' },
            muted: { value: '{colors.neutral.200}' },
          },
          text: {
            default: { value: '{colors.neutral.900}' },
            subtle: { value: '{colors.neutral.600}' },
            muted: { value: '{colors.neutral.300}' },
          },
          border: {
            default: { value: '{colors.neutral.200}' },
            subtle: { value: '{colors.neutral.100}' },
          },
        },
      },
    },
  },
});
