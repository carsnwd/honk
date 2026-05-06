import type {
  CreateUserDto,
  User,
} from '@honk/schemas/modules/users/user.schema';
import type { AppType } from '@honk/server';
import { useMutation, useQueryClient } from '@tanstack/solid-query';
import { useNavigate } from '@tanstack/solid-router';
import { hc } from 'hono/client';
import { createSignal } from 'solid-js';
import { css } from '../../../styled-system/css';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { userQueryOptions, usersQueryOptions } from './users.queries';

const formStyles = css({
  p: '6',
  display: 'flex',
  flexDir: 'column',
  gap: '4',
  maxW: '400px',
});

const fieldStyles = css({
  display: 'flex',
  flexDir: 'column',
  gap: '1',
});

const labelStyles = css({
  fontSize: 'sm',
  fontWeight: 'medium',
  color: 'foreground',
});

const headerStyles = css({
  fontSize: '2xl',
  fontWeight: 'bold',
  color: 'foreground',
});

const selectStyles = css({
  px: '3',
  py: '2',
  borderWidth: '1px',
  borderColor: 'border',
  borderRadius: 'sm',
  bg: 'background',
  color: 'foreground',
  fontSize: 'sm',
  outline: 'none',
  _focus: {
    borderColor: 'ring',
  },
});

const api = hc<AppType>('http://localhost:3000');

interface UserFormProps {
  user?: User;
}

export function UserForm(props: UserFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [firstName, setFirstName] = createSignal(props.user?.firstName ?? '');
  const [lastName, setLastName] = createSignal(props.user?.lastName ?? '');
  const [email, setEmail] = createSignal(props.user?.email ?? '');
  const [role, setRole] = createSignal<CreateUserDto['role']>(
    props.user?.role ?? 'member'
  );

  const saveUser = useMutation(() => ({
    mutationFn: async (data: CreateUserDto) => {
      if (props.user) {
        const res = await api.users[':id'].$patch({
          param: { id: props.user.id },
          json: data,
        });

        if (!res.ok) throw new Error('Failed to update user');
        return res.json();
      }

      const res = await api.users.$post({ json: data });
      if (!res.ok) throw new Error('Failed to create user');
      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: usersQueryOptions().queryKey,
      });

      if (props.user) {
        await queryClient.invalidateQueries({
          queryKey: userQueryOptions(props.user.id).queryKey,
        });

        navigate({
          to: '/users/$userId',
          params: { userId: props.user.id },
        });
        return;
      }

      navigate({ to: '/users' });
    },
  }));

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    saveUser.mutate({
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      role: role(),
    });
  };

  return (
    <form class={formStyles} onSubmit={handleSubmit}>
      <h1 class={headerStyles}>{props.user ? 'Edit User' : 'Create User'}</h1>

      <div class={fieldStyles}>
        <label for="firstName" class={labelStyles}>
          First name
        </label>
        <Input
          id="firstName"
          type="text"
          value={firstName()}
          onInput={(e) => setFirstName(e.currentTarget.value)}
          placeholder="Goose"
          required
        />
      </div>

      <div class={fieldStyles}>
        <label for="lastName" class={labelStyles}>
          Last name
        </label>
        <Input
          id="lastName"
          type="text"
          value={lastName()}
          onInput={(e) => setLastName(e.currentTarget.value)}
          placeholder="Smith"
          required
        />
      </div>

      <div class={fieldStyles}>
        <label for="email" class={labelStyles}>
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
          placeholder="goose@example.com"
          required
        />
      </div>

      <div class={fieldStyles}>
        <label for="role" class={labelStyles}>
          Role
        </label>
        <select
          id="role"
          value={role()}
          onChange={(e) =>
            setRole(e.currentTarget.value as CreateUserDto['role'])
          }
          class={selectStyles}
        >
          <option value="member">Member</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <Button type="submit" disabled={saveUser.isPending}>
        {saveUser.isPending
          ? props.user
            ? 'Saving...'
            : 'Creating...'
          : props.user
            ? 'Save User'
            : 'Create User'}
      </Button>
    </form>
  );
}
