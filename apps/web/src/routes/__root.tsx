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

const marginsPage = css({
  marginLeft: '96',
  marginRight: '96',
});

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div>
      <nav class={navStyles}>
        <Link to="/" class={linkStyles}>
          Dashboard
        </Link>
        <Link to="/users" class={linkStyles}>
          Users
        </Link>
      </nav>
      <div class={marginsPage}>
        <Outlet />
      </div>
    </div>
  ),
});
