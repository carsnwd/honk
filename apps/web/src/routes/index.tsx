// apps/web/src/routes/index.tsx

import { Button } from '@honk/ui';
import { createFileRoute } from '@tanstack/solid-router';
import { css } from '../../styled-system/css';

const boxStyles = css({
  bg: 'AccentColor',
  color: 'AccentColorForeground',
  p: '4',
  borderRadius: 'md',
  fontSize: 'lg',
  fontWeight: 'semibold',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Route = createFileRoute('/')({
  component: () => (
    <div class={boxStyles}>
      🪿 Honk — Panda CSS is working
      <Button variant="solid" size="lg">
        Button
      </Button>
    </div>
  ),
});
