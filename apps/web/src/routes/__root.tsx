import type { QueryClient } from '@tanstack/solid-query';
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/solid-router';
import { css } from '../../styled-system/css';

interface RouterContext {
  queryClient: QueryClient;
}

const navStyles = css({
  display: 'flex',
  gap: '4',
  p: '4',
  borderBottomWidth: '1px',
  borderColor: 'border',
  bg: 'background',
});

const linkStyles = css({
  color: 'foreground',
  textDecoration: 'none',
  fontWeight: 'semibold',
  _hover: { color: 'primary.default' },
});

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div>
      <nav class={navStyles}>
        <Link to="/" class={linkStyles}>
          Dashboard
        </Link>
      </nav>
      <Outlet />
    </div>
  ),
});
