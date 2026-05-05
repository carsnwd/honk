import { createRouter } from '@tanstack/solid-router';
import { queryClient } from './queryClient';
import { routeTree } from './routeTree.gen';

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

declare module '@tanstack/solid-router' {
  interface Register {
    router: typeof router;
  }
}
