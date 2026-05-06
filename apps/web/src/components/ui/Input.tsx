// apps/web/src/components/ui/input.tsx
import { ark } from '@ark-ui/solid';
import type { ComponentProps } from 'solid-js';
import { css } from '../../../styled-system/css';

const inputStyles = css({
  width: '100%',
  px: '3',
  py: '2',
  fontSize: 'sm',
  borderWidth: '1px',
  borderColor: 'border',
  borderRadius: 'sm',
  bg: 'background',
  color: 'foreground',
  outline: 'none',
  _focus: {
    borderColor: 'ring',
    ringWidth: '2px',
    ringColor: 'ring',
  },
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export function Input(props: ComponentProps<'input'>) {
  return <ark.input {...props} class={inputStyles} />;
}
