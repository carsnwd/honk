import { createFileRoute } from '@tanstack/solid-router';
import { UserDetail } from '../../../modules/users/UserDetail';
import { usersQueryOptions } from '../../../modules/users/users.queries';

export const Route = createFileRoute('/users/$userId/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(usersQueryOptions());
  },
  component: UserDetail,
});
