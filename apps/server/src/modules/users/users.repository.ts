import { db } from '@honk/db';
import { users } from '@honk/db/schema';
import type {
  CreateUserDto,
  User,
} from '@honk/schemas/modules/users/user.schema';
import { eq } from 'drizzle-orm';

export const usersRepository = {
  async findAll(): Promise<User[]> {
    return db.select().from(users);
  },

  async findById(id: string): Promise<User | undefined> {
    return db.select().from(users).where(eq(users.id, id)).get();
  },

  async create(data: CreateUserDto): Promise<User> {
    return db
      .insert(users)
      .values({
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      })
      .returning()
      .get();
  },

  async update(id: string, data: Partial<CreateUserDto>): Promise<User> {
    return db.update(users).set(data).where(eq(users.id, id)).returning().get();
  },
};
