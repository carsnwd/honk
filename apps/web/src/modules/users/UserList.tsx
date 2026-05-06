import { canManageUsers, formatUserName } from '@honk/core/modules/users/user';
import { useQuery } from '@tanstack/solid-query';
import { For } from 'solid-js';
import { css } from '../../../styled-system/css';
import { Badge } from '../../components/ui/Badge';
import { usersQueryOptions } from './users.queries';

const containerStyles = css({
  p: '6',
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
});

const headerRowStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const headerStyles = css({
  fontSize: '2xl',
  fontWeight: 'bold',
  color: 'foreground',
});

const listStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
});

const listItemStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  p: '4',
  borderRadius: 'md',
  borderWidth: '1px',
  borderColor: 'border',
  bg: 'card.default',
  color: 'card.foreground',
  textDecoration: 'none',
  _hover: { bg: 'accent.default' },
  transition: 'background 0.2s',
});

export function UserList() {
  const users = useQuery(() => usersQueryOptions());
  return (
    <div class={containerStyles}>
      <div class={headerRowStyles}>
        <h1 class={headerStyles}>Users</h1>
        <a href="/users/create">Create User</a>
      </div>

      <ul class={listStyles}>
        <For each={users.data}>
          {(user) => (
            <a href={`/users/${user.id}`} class={listItemStyles}>
              <span>{formatUserName(user)}</span>
              {canManageUsers(user) && <Badge variant="subtle">Admin</Badge>}
            </a>
          )}
        </For>
      </ul>
    </div>
  );
}
