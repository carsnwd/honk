import { beforeEach, describe, expect, mock, test } from 'bun:test';
import type { User } from '@honk/schemas/modules/users/user.schema';
import * as repository from './users.repository';
import { usersService } from './users.service';

const mockUser: User = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  firstName: 'Carson',
  lastName: 'Smith',
  email: 'carson@example.com',
  role: 'member',
  createdAt: new Date().toISOString(),
};

beforeEach(() => {
  repository.usersRepository.findAll = mock(() => Promise.resolve([mockUser]));
  repository.usersRepository.findById = mock(() => Promise.resolve(mockUser));
  repository.usersRepository.create = mock(() => Promise.resolve(mockUser));
});

describe('usersService.getAll', () => {
  test('returns all users', async () => {
    const users = await usersService.getAll();
    expect(users).toEqual([mockUser]);
  });
});

describe('usersService.getById', () => {
  test('returns user when found', async () => {
    const user = await usersService.getById(mockUser.id);
    expect(user).toEqual(mockUser);
  });

  test('throws when not found', async () => {
    repository.usersRepository.findById = mock(() =>
      Promise.resolve(undefined)
    );
    expect(usersService.getById('bad-id')).rejects.toThrow('User not found');
  });
});

describe('usersService.checkManagePermission', () => {
  test('returns false for member', async () => {
    const result = await usersService.checkManagePermission(mockUser.id);
    expect(result).toBe(false);
  });

  test('returns true for admin', async () => {
    repository.usersRepository.findById = mock(
      (_id: string): Promise<User | undefined> =>
        Promise.resolve({ ...mockUser, role: 'admin' })
    );

    const result = await usersService.checkManagePermission(mockUser.id);
    expect(result).toBe(true);
  });
});
