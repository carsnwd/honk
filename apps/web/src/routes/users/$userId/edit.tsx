import { createFileRoute } from '@tanstack/solid-router';
import { UserForm } from '../../../modules/users/UserForm';
import { userQueryOptions } from '../../../modules/users/users.queries';

export const Route = createFileRoute('/users/$userId/edit')({
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(userQueryOptions(params.userId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const user = Route.useLoaderData();

  return <UserForm user={user()} />;
}
