// src/components/input.tsx
import { ark } from '@ark-ui/solid';
import type { ComponentProps } from 'solid-js';
import { css } from '../../styled-system/css';

const inputStyles = css({
  width: '100%',
  px: '3',
  py: '2',
  fontSize: 'sm',
  borderWidth: '1px',
  borderColor: 'border.default',
  borderRadius: 'sm',
  bg: 'bg.default',
  color: 'text.default',
  outline: 'none',
  _focus: {
    borderColor: 'accent.DEFAULT',
    ringWidth: '2px',
    ringColor: 'accent.subtle',
  },
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export function Input(props: ComponentProps<'input'>) {
  return <ark.input {...props} class={inputStyles} />;
}
