import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';
import { usersController } from './modules/users/users.controller';

const app = new OpenAPIHono();

app.use('*', cors());

app.route('/users', usersController);

app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    title: 'Honk API',
    version: '0.1.0',
    description: 'Honk full-stack template API',
  },
});

app.get(
  '/docs',
  Scalar({
    theme: 'saturn',
    url: '/openapi.json',
  })
);

export default app;
export type AppType = typeof app;
