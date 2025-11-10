import { describe, it, expect } from 'vitest';
import { 
  type Person, 
  type ReadonlyPerson, 
  type PersonContact, 
  type PersonWithoutAddress,
  getDisplayName,
  updateEmail 
} from './readonly-types';

describe('Readonly and Utility Types', () => {
  const testPerson: Person = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    address: '123 Main St'
  };

  describe('Person interface', () => {
    it('should have all required properties', () => {
      expect(testPerson).toHaveProperty('name');
      expect(testPerson).toHaveProperty('age');
      expect(testPerson).toHaveProperty('email');
      expect(testPerson).toHaveProperty('address');
    });

    it('should accept valid person objects', () => {
      const person: Person = {
        name: 'Jane Smith',
        age: 25,
        email: 'jane@example.com',
        address: '456 Oak Ave'
      };
      expect(person.name).toBe('Jane Smith');
    });
  });

  describe('ReadonlyPerson type', () => {
    it('should create readonly person', () => {
      const readonlyPerson: ReadonlyPerson = testPerson;
      
      // TypeScript will prevent modification at compile time
      // At runtime, we can verify the object exists
      expect(readonlyPerson.name).toBe('John Doe');
      expect(readonlyPerson.age).toBe(30);
    });
  });

  describe('PersonContact type', () => {
    it('should only have name and email', () => {
      const contact: PersonContact = {
        name: 'John Doe',
        email: 'john@example.com'
      };
      
      expect(contact).toHaveProperty('name');
      expect(contact).toHaveProperty('email');
      expect(contact).not.toHaveProperty('age');
      expect(contact).not.toHaveProperty('address');
    });
  });

  describe('PersonWithoutAddress type', () => {
    it('should have all properties except address', () => {
      const personNoAddress: PersonWithoutAddress = {
        name: 'John Doe',
        age: 30,
        email: 'john@example.com'
      };
      
      expect(personNoAddress).toHaveProperty('name');
      expect(personNoAddress).toHaveProperty('age');
      expect(personNoAddress).toHaveProperty('email');
      expect(personNoAddress).not.toHaveProperty('address');
    });
  });

  describe('getDisplayName', () => {
    it('should return display name for person', () => {
      const readonlyPerson: ReadonlyPerson = testPerson;
      const displayName = getDisplayName(readonlyPerson);
      
      expect(displayName).toBeTruthy();
      expect(typeof displayName).toBe('string');
      expect(displayName.length).toBeGreaterThan(0);
    });

    it('should handle different name formats', () => {
      const person: ReadonlyPerson = {
        name: 'Jane Smith',
        age: 25,
        email: 'jane@example.com',
        address: '789 Elm St'
      };
      
      const displayName = getDisplayName(person);
      expect(displayName).toBeTruthy();
    });
  });

  describe('updateEmail', () => {
    it('should update email and return new person', () => {
      const person: Person = { ...testPerson };
      const newEmail = 'newemail@example.com';
      
      const updated = updateEmail(person, newEmail);
      
      expect(updated.email).toBe(newEmail);
      expect(updated.name).toBe(testPerson.name);
      expect(updated.age).toBe(testPerson.age);
      expect(updated.address).toBe(testPerson.address);
    });

    it('should not modify original person (immutability)', () => {
      const person: Person = { ...testPerson };
      const originalEmail = person.email;
      
      updateEmail(person, 'different@example.com');
      
      // Original should remain unchanged
      expect(person.email).toBe(originalEmail);
    });

    it('should work with different emails', () => {
      const person: Person = { ...testPerson };
      const emails = ['test1@example.com', 'test2@example.com', 'test3@example.com'];
      
      emails.forEach(email => {
        const updated = updateEmail(person, email);
        expect(updated.email).toBe(email);
      });
    });
  });

  // Type system tests (these verify TypeScript compilation)
  describe('Type Safety', () => {
    it('should enforce readonly constraints', () => {
      const readonlyPerson: ReadonlyPerson = testPerson;
      
      // In TypeScript, attempting to modify readonly properties
      // would cause a compilation error:
      // readonlyPerson.name = 'New Name'; // Error!
      
      // Runtime verification that object exists
      expect(readonlyPerson).toBeDefined();
    });

    it('should work with utility types', () => {
      // Pick utility type
      const contact: PersonContact = {
        name: 'Test',
        email: 'test@example.com'
      };
      expect(contact).toBeDefined();
      
      // Omit utility type
      const noAddress: PersonWithoutAddress = {
        name: 'Test',
        age: 25,
        email: 'test@example.com'
      };
      expect(noAddress).toBeDefined();
    });
  });
});
