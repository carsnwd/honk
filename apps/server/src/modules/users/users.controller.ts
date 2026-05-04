import {
  CreateUserSchema,
  UpdateUserSchema,
  UserSchema,
} from '@honk/schemas/modules/users/user.schema';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { z } from 'zod';
import { usersService } from './users.service';

export const usersController = new OpenAPIHono();

const getUsers = createRoute({
  method: 'get',
  path: '/',
  tags: ['Users'],
  summary: 'List all users',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(UserSchema),
        },
      },
      description: 'List of users',
    },
  },
});

const getUserById = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['Users'],
  summary: 'Get a user by ID',
  request: {
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    200: {
      content: {
        'application/json': { schema: UserSchema },
      },
      description: 'User found',
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({ message: z.string() }),
        },
      },
      description: 'User not found',
    },
  },
});

const createUser = createRoute({
  method: 'post',
  path: '/',
  tags: ['Users'],
  summary: 'Create a user',
  request: {
    body: {
      content: {
        'application/json': { schema: CreateUserSchema },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': { schema: UserSchema },
      },
      description: 'User created',
    },
  },
});

const updateUser = createRoute({
  method: 'patch',
  path: '/{id}',
  tags: ['Users'],
  summary: 'Update a user',
  request: {
    params: z.object({ id: z.string().uuid() }),
    body: {
      content: {
        'application/json': { schema: UpdateUserSchema },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': { schema: UserSchema },
      },
      description: 'User updated',
    },
  },
});

usersController.openapi(getUsers, async (c) => {
  const users = await usersService.getAll();
  return c.json(users, 200);
});

usersController.openapi(getUserById, async (c) => {
  const { id } = c.req.valid('param');
  const user = await usersService.getById(id);
  if (!user) return c.json({ message: 'User not found' }, 404);
  return c.json(user, 200);
});

usersController.openapi(createUser, async (c) => {
  const body = c.req.valid('json');
  const user = await usersService.create(body);
  return c.json(user, 201);
});

usersController.openapi(updateUser, async (c) => {
  const { id } = c.req.valid('param');
  const body = c.req.valid('json');
  const user = await usersService.update(id, body);
  return c.json(user, 200);
});
