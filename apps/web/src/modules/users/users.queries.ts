import type { AppType } from '@honk/server';
import { queryOptions } from '@tanstack/solid-query';
import { hc } from 'hono/client';

const client = hc<AppType>('http://localhost:3000');

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await client.users.$get();
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
  });

export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await client.users[':id'].$get({ param: { id } });
      if (!res.ok) throw new Error('Failed to fetch user');
      return res.json();
    },
  });
