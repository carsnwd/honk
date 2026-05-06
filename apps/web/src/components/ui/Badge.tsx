import { type ComponentProps, splitProps } from 'solid-js';
import { cva, type RecipeVariantProps } from '../../../styled-system/css';

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
      solid: { bg: 'primary.default', color: 'primary.foreground' },
      subtle: { bg: 'accent.default', color: 'accent.foreground' },
      danger: { bg: 'destructive.default', color: 'destructive.foreground' },
      success: { bg: 'secondary.default', color: 'secondary.foreground' },
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
