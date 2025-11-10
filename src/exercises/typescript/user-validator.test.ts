import { describe, it, expect } from 'vitest';
import { isValidUser, type User } from './user-validator';

describe('User Validator', () => {
  describe('isValidUser', () => {
    it('should validate a valid user', () => {
      const user: User = {
        name: 'John Doe',
        age: 25,
        email: 'john@example.com'
      };
      expect(isValidUser(user)).toBe(true);
    });

    it('should reject user with empty name', () => {
      const user: User = {
        name: '',
        age: 25,
        email: 'john@example.com'
      };
      expect(isValidUser(user)).toBe(false);
    });

    it('should reject user under 18', () => {
      const user: User = {
        name: 'John Doe',
        age: 17,
        email: 'john@example.com'
      };
      expect(isValidUser(user)).toBe(false);
    });

    it('should accept user exactly 18 years old', () => {
      const user: User = {
        name: 'John Doe',
        age: 18,
        email: 'john@example.com'
      };
      expect(isValidUser(user)).toBe(true);
    });

    it('should reject email without @', () => {
      const user: User = {
        name: 'John Doe',
        age: 25,
        email: 'johnexample.com'
      };
      expect(isValidUser(user)).toBe(false);
    });

    it('should reject user with whitespace-only name', () => {
      const user: User = {
        name: '   ',
        age: 25,
        email: 'john@example.com'
      };
      expect(isValidUser(user)).toBe(false);
    });

    it('should reject user with multiple validation failures', () => {
      const user: User = {
        name: '',
        age: 15,
        email: 'invalid-email'
      };
      expect(isValidUser(user)).toBe(false);
    });

    it('should accept user with older age', () => {
      const user: User = {
        name: 'Jane Smith',
        age: 65,
        email: 'jane@example.com'
      };
      expect(isValidUser(user)).toBe(true);
    });
  });
});
