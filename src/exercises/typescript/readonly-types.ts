/**
 * TypeScript Exercise: Readonly and Utility Types
 * 
 * Task: Work with readonly properties and TypeScript utility types
 * 
 * Learn about immutability and built-in TypeScript utility types like
 * Readonly, Partial, Pick, Omit, etc.
 */

// TODO: Define a Person interface with:
// - name: string
// - age: number
// - email: string
// - address: string
export interface Person {
  // Your interface here
}

// TODO: Create a type that makes all Person properties readonly
export type ReadonlyPerson = unknown; // Replace 'unknown' with correct type

// TODO: Create a type that picks only 'name' and 'email' from Person
export type PersonContact = unknown; // Replace with Pick utility type

// TODO: Create a type that omits 'address' from Person
export type PersonWithoutAddress = unknown; // Replace with Omit utility type

/**
 * Function that accepts a readonly person and returns their display name
 * @param person - A readonly person object
 * @returns Display name string
 */
export function getDisplayName(person: ReadonlyPerson): string {
  // TODO: Implement this function
  // Should not be able to modify person properties due to Readonly
  return '';
}

/**
 * Function that updates a person's email
 * This should work with regular Person but not ReadonlyPerson
 */
export function updateEmail(person: Person, newEmail: string): Person {
  // TODO: Implement email update
  // Return a new Person object with updated email
  return person;
}
