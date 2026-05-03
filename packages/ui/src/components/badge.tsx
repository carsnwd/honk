// src/components/badge.tsx

import { type ComponentProps, splitProps } from 'solid-js';
import { cva, type RecipeVariantProps } from '../../styled-system/css';

const badgeStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 'full',
    fontWeight: 'semibold',
    fontSize: 'xs',
  },
  variants: {
    variant: {
      solid: { bg: 'accent.DEFAULT', color: 'white' },
      subtle: { bg: 'accent.subtle', color: 'accent.DEFAULT' },
      danger: { bg: 'danger.subtle', color: 'danger.DEFAULT' },
      success: { bg: 'success.subtle', color: 'success.DEFAULT' },
    },
    size: {
      sm: { px: '2', py: '0.5' },
      md: { px: '3', py: '1' },
    },
  },
  defaultVariants: {
    variant: 'subtle',
    size: 'sm',
  },
});

type BadgeVariants = RecipeVariantProps<typeof badgeStyles>;
type BadgeProps = ComponentProps<'span'> & BadgeVariants;

export function Badge(props: BadgeProps) {
  const [variants, rest] = splitProps(props, ['variant', 'size']);
  return (
    <span
      {...rest}
      class={badgeStyles({ variant: variants.variant, size: variants.size })}
    />
  );
}
