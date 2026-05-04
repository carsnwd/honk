import type { User } from '@honk/schemas/modules/users/user.schema';

export function isAdmin(user: User): boolean {
  return user.role === 'admin';
}

export function canManageUsers(user: User): boolean {
  return user.role === 'admin' || user.role === 'moderator';
}

export function formatUserName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}
