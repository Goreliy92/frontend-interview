/**
 * Solution: Readonly and Utility Types
 */

export interface Person {
  name: string;
  age: number;
  email: string;
  address: string;
}

export type ReadonlyPerson = Readonly<Person>;

export type PersonContact = Pick<Person, 'name' | 'email'>;

export type PersonWithoutAddress = Omit<Person, 'address'>;

export function getDisplayName(person: ReadonlyPerson): string {
  return `${person.name} (${person.email})`;
}

export function updateEmail(person: Person, newEmail: string): Person {
  return {
    ...person,
    email: newEmail
  };
}
