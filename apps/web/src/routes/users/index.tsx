import { createFileRoute } from '@tanstack/solid-router';
import { usersQueryOptions } from '../../modules/users/users.queries';

export const Route = createFileRoute('/users/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(usersQueryOptions());
  },
});
