import { definePreset } from '@pandacss/dev';

export const honkPreset = definePreset({
  name: 'honk-preset',
  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: { value: 'Inter, sans-serif' },
          serif: { value: 'Source Serif 4, serif' },
          mono: { value: 'JetBrains Mono, monospace' },
        },
        radii: {
          sm: { value: 'calc(0.375rem - 4px)' },
          md: { value: 'calc(0.375rem - 2px)' },
          lg: { value: '0.375rem' },
          xl: { value: 'calc(0.375rem + 4px)' },
          full: { value: '9999px' },
        },
        shadows: {
          '2xs': { value: '0px 4px 8px -1px hsl(0 0% 0% / 0.05)' },
          xs: { value: '0px 4px 8px -1px hsl(0 0% 0% / 0.05)' },
          sm: {
            value:
              '0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10)',
          },
          md: {
            value:
              '0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 2px 4px -2px hsl(0 0% 0% / 0.10)',
          },
          lg: {
            value:
              '0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 4px 6px -2px hsl(0 0% 0% / 0.10)',
          },
          xl: {
            value:
              '0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 8px 10px -2px hsl(0 0% 0% / 0.10)',
          },
          '2xl': { value: '0px 4px 8px -1px hsl(0 0% 0% / 0.25)' },
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
          16: { value: '4rem' },
          20: { value: '5rem' },
          24: { value: '6rem' },
        },
        fontSizes: {
          xs: { value: '0.75rem' },
          sm: { value: '0.875rem' },
          md: { value: '1rem' },
          lg: { value: '1.125rem' },
          xl: { value: '1.25rem' },
          '2xl': { value: '1.5rem' },
          '3xl': { value: '1.875rem' },
          '4xl': { value: '2.25rem' },
        },
        lineHeights: {
          tight: { value: '1.25' },
          normal: { value: '1.5' },
          relaxed: { value: '1.75' },
        },
        fontWeights: {
          normal: { value: '400' },
          medium: { value: '500' },
          semibold: { value: '600' },
          bold: { value: '700' },
        },
      },

      semanticTokens: {
        colors: {
          background: {
            value: {
              base: 'oklch(1.0000 0 0)',
              _dark: 'oklch(0.2046 0 0)',
            },
          },
          foreground: {
            value: {
              base: 'oklch(0.2686 0 0)',
              _dark: 'oklch(0.9219 0 0)',
            },
          },
          card: {
            default: {
              value: {
                base: 'oklch(1.0000 0 0)',
                _dark: 'oklch(0.2686 0 0)',
              },
            },
            foreground: {
              value: {
                base: 'oklch(0.2686 0 0)',
                _dark: 'oklch(0.9219 0 0)',
              },
            },
          },
          popover: {
            default: {
              value: {
                base: 'oklch(1.0000 0 0)',
                _dark: 'oklch(0.2686 0 0)',
              },
            },
            foreground: {
              value: {
                base: 'oklch(0.2686 0 0)',
                _dark: 'oklch(0.9219 0 0)',
              },
            },
          },
          primary: {
            default: {
              value: {
                base: 'oklch(0.7686 0.1647 70.0804)',
                _dark: 'oklch(0.7686 0.1647 70.0804)',
              },
            },
            foreground: {
              value: {
                base: 'oklch(0 0 0)',
                _dark: 'oklch(0 0 0)',
              },
            },
          },
          secondary: {
            default: {
              value: {
                base: 'oklch(0.9670 0.0029 264.5419)',
                _dark: 'oklch(0.2686 0 0)',
              },
            },
            foreground: {
              value: {
                base: 'oklch(0.4461 0.0263 256.8018)',
                _dark: 'oklch(0.9219 0 0)',
              },
            },
          },
          muted: {
            default: {
              value: {
                base: 'oklch(0.9846 0.0017 247.8389)',
                _dark: 'oklch(0.2393 0 0)',
              },
            },
            foreground: {
              value: {
                base: 'oklch(0.5510 0.0234 264.3637)',
                _dark: 'oklch(0.7155 0 0)',
              },
            },
          },
          accent: {
            default: {
              value: {
                base: 'oklch(0.9869 0.0214 95.2774)',
                _dark: 'oklch(0.4732 0.1247 46.2007)',
              },
            },
            foreground: {
              value: {
                base: 'oklch(0.4732 0.1247 46.2007)',
                _dark: 'oklch(0.9243 0.1151 95.7459)',
              },
            },
          },
          destructive: {
            default: {
              value: {
                base: 'oklch(0.6368 0.2078 25.3313)',
                _dark: 'oklch(0.6368 0.2078 25.3313)',
              },
            },
            foreground: {
              value: {
                base: 'oklch(1.0000 0 0)',
                _dark: 'oklch(1.0000 0 0)',
              },
            },
          },
          border: {
            value: {
              base: 'oklch(0.9276 0.0058 264.5313)',
              _dark: 'oklch(0.3715 0 0)',
            },
          },
          input: {
            value: {
              base: 'oklch(0.9276 0.0058 264.5313)',
              _dark: 'oklch(0.3715 0 0)',
            },
          },
          ring: {
            value: {
              base: 'oklch(0.7686 0.1647 70.0804)',
              _dark: 'oklch(0.7686 0.1647 70.0804)',
            },
          },
          sidebar: {
            default: {
              value: {
                base: 'oklch(0.9846 0.0017 247.8389)',
                _dark: 'oklch(0.1684 0 0)',
              },
            },
            foreground: {
              value: {
                base: 'oklch(0.2686 0 0)',
                _dark: 'oklch(0.9219 0 0)',
              },
            },
            primary: {
              value: {
                base: 'oklch(0.7686 0.1647 70.0804)',
                _dark: 'oklch(0.7686 0.1647 70.0804)',
              },
            },
            primaryForeground: {
              value: {
                base: 'oklch(1.0000 0 0)',
                _dark: 'oklch(1.0000 0 0)',
              },
            },
            accent: {
              value: {
                base: 'oklch(0.9869 0.0214 95.2774)',
                _dark: 'oklch(0.4732 0.1247 46.2007)',
              },
            },
            accentForeground: {
              value: {
                base: 'oklch(0.4732 0.1247 46.2007)',
                _dark: 'oklch(0.9243 0.1151 95.7459)',
              },
            },
            border: {
              value: {
                base: 'oklch(0.9276 0.0058 264.5313)',
                _dark: 'oklch(0.3715 0 0)',
              },
            },
            ring: {
              value: {
                base: 'oklch(0.7686 0.1647 70.0804)',
                _dark: 'oklch(0.7686 0.1647 70.0804)',
              },
            },
          },
          chart: {
            1: {
              value: {
                base: 'oklch(0.7686 0.1647 70.0804)',
                _dark: 'oklch(0.8369 0.1644 84.4286)',
              },
            },
            2: {
              value: {
                base: 'oklch(0.6658 0.1574 58.3183)',
                _dark: 'oklch(0.6658 0.1574 58.3183)',
              },
            },
            3: {
              value: {
                base: 'oklch(0.5553 0.1455 48.9975)',
                _dark: 'oklch(0.4732 0.1247 46.2007)',
              },
            },
            4: {
              value: {
                base: 'oklch(0.4732 0.1247 46.2007)',
                _dark: 'oklch(0.5553 0.1455 48.9975)',
              },
            },
            5: {
              value: {
                base: 'oklch(0.4137 0.1054 45.9038)',
                _dark: 'oklch(0.4732 0.1247 46.2007)',
              },
            },
          },
        },
      },
    },
  },
});
