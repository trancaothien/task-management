import * as bcrypt from 'bcrypt';

/**
 * Convert Password To Hash
 * @param {string} password :password of user
 * @returns {string}
 */
export async function hashPassword(password: string) {
  const saltOrRounds = 10;
  return bcrypt.hash(password, saltOrRounds);
}

/**
 * Compare Password
 * @param {string} password : password of user
 * @param {string} hash: password already hash
 * @returns {string}
 */
export async function hashMatching(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function genaratePassword(): string {
  return Math.random().toString(36).slice(-8);
}
