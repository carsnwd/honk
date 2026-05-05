// src/components/button.tsx
import { ark } from '@ark-ui/solid';
import { type ComponentProps, splitProps } from 'solid-js';
import { cva, type RecipeVariantProps } from '../../styled-system/css';

const buttonStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'md',
    fontWeight: 'semibold',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    _disabled: { opacity: 0.5, cursor: 'not-allowed' },
  },
  variants: {
    variant: {
      solid: {
        bg: 'primary.default',
        color: 'primary.foreground',
        _hover: { opacity: 0.85 },
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'border',
        color: 'foreground',
        _hover: { bg: 'accent.default' },
      },
      ghost: {
        color: 'foreground',
        _hover: { bg: 'accent.default' },
      },
      destructive: {
        bg: 'destructive.default',
        color: 'destructive.foreground',
        _hover: { opacity: 0.85 },
      },
      secondary: {
        bg: 'secondary.default',
        color: 'secondary.foreground',
        _hover: { opacity: 0.85 },
      },
    },
    size: {
      sm: { px: '3', py: '1.5', fontSize: 'sm' },
      md: { px: '4', py: '2', fontSize: 'md' },
      lg: { px: '6', py: '3', fontSize: 'lg' },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});

type ButtonVariants = RecipeVariantProps<typeof buttonStyles>;
type ButtonProps = ComponentProps<'button'> & ButtonVariants;

export function Button(props: ButtonProps) {
  const [variants, rest] = splitProps(props, ['variant', 'size']);
  return (
    <ark.button
      {...rest}
      class={buttonStyles({ variant: variants.variant, size: variants.size })}
    />
  );
}
