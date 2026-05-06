import { createFileRoute } from '@tanstack/solid-router';
import { UserForm } from '../../modules/users/UserForm';
import { usersQueryOptions } from '../../modules/users/users.queries';

export const Route = createFileRoute('/users/create')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(usersQueryOptions());
  },
  component: UserForm,
});
