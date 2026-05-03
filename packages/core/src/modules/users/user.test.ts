import { describe, expect, test } from 'bun:test';
import type { User } from '@honk/schemas/';
import { canManageUsers, formatUserName, isAdmin } from './user';

const baseUser: User = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  firstName: 'Carson',
  lastName: 'Smith',
  email: 'carson@example.com',
  role: 'member',
  createdAt: new Date().toISOString(),
};

describe('isAdmin', () => {
  test('returns false for member', () => {
    expect(isAdmin(baseUser)).toBe(false);
  });

  test('returns true for admin', () => {
    expect(isAdmin({ ...baseUser, role: 'admin' })).toBe(true);
  });
});

describe('canManageUsers', () => {
  test('returns false for member', () => {
    expect(canManageUsers(baseUser)).toBe(false);
  });

  test('returns true for admin', () => {
    expect(canManageUsers({ ...baseUser, role: 'admin' })).toBe(true);
  });
});

describe('formatUserName', () => {
  test('formats member correctly', () => {
    expect(formatUserName(baseUser)).toBe('Carson Smith');
  });

  test('formats admin correctly', () => {
    expect(formatUserName({ ...baseUser, role: 'admin' })).toBe('Carson Smith');
  });
});
