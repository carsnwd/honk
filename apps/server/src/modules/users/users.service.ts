import { canManageUsers } from '@honk/core/modules/users/user';
import type {
  CreateUserDto,
  User,
} from '@honk/schemas/modules/users/user.schema';
import { usersRepository } from './users.repository';

export const usersService = {
  async getAll(): Promise<User[]> {
    return usersRepository.findAll();
  },

  async getById(id: string): Promise<User> {
    const user = await usersRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  },

  async create(data: CreateUserDto): Promise<User> {
    return usersRepository.create(data);
  },

  async update(id: string, data: Partial<CreateUserDto>): Promise<User> {
    return usersRepository.update(id, data);
  },

  async checkManagePermission(requestingUserId: string): Promise<boolean> {
    const user = await usersRepository.findById(requestingUserId);
    if (!user) return false;
    return canManageUsers(user);
  },
};
