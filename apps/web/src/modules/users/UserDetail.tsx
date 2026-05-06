import { formatUserName, isAdmin } from '@honk/core/modules/users/user';
import { useQuery } from '@tanstack/solid-query';
import { Link, useLocation, useNavigate } from '@tanstack/solid-router';
import { createMemo, Show } from 'solid-js';
import { css } from '../../../styled-system/css';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { userQueryOptions } from './users.queries';

const containerStyles = css({
  p: '6',
  display: 'flex',
  flexDir: 'column',
  gap: '4',
  maxW: '600px',
});

const backStyles = css({
  fontSize: 'sm',
  color: 'muted.foreground',
  textDecoration: 'none',
  _hover: { color: 'foreground' },
});

const headerStyles = css({
  fontSize: '2xl',
  fontWeight: 'bold',
  color: 'foreground',
});

const headerRowStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
});

const cardStyles = css({
  p: '4',
  borderRadius: 'md',
  borderWidth: '1px',
  borderColor: 'border',
  bg: 'card.default',
  display: 'flex',
  flexDir: 'column',
  gap: '3',
});

const rowStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const labelStyles = css({
  fontSize: 'sm',
  color: 'muted.foreground',
});

const valueStyles = css({
  fontSize: 'sm',
  color: 'foreground',
  fontWeight: 'medium',
});

export function UserDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = createMemo(() => location().pathname.split('/').at(-1) ?? '');
  const user = useQuery(() => userQueryOptions(userId()));

  return (
    <div class={containerStyles}>
      <Link to="/users" class={backStyles}>
        ← Back to users
      </Link>

      <Show when={user.data}>
        {(u) => (
          <>
            <div class={headerRowStyles}>
              <h1 class={headerStyles}>{formatUserName(u())}</h1>
              <Show when={isAdmin(u())}>
                <Badge variant="subtle">Admin</Badge>
              </Show>
            </div>

            <div class={cardStyles}>
              <div class={rowStyles}>
                <span class={labelStyles}>Email</span>
                <span class={valueStyles}>{u().email}</span>
              </div>
              <div class={rowStyles}>
                <span class={labelStyles}>Role</span>
                <span class={valueStyles}>{u().role}</span>
              </div>
              <div class={rowStyles}>
                <span class={labelStyles}>Member since</span>
                <span class={valueStyles}>
                  {new Date(u().createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                navigate({
                  to: '/users/$userId/edit',
                  params: { userId: userId() },
                })
              }
            >
              Edit user
            </Button>
          </>
        )}
      </Show>
    </div>
  );
}
