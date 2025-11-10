/**
 * Solution: API Types
 */

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export async function fetchUser(userId: number): Promise<User | null> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (isValidUser(data)) {
      return data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export function getUserContact(user: User): Pick<User, 'name' | 'email'> {
  return {
    name: user.name,
    email: user.email
  };
}

export function isValidUser(data: any): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'number' &&
    typeof data.name === 'string' &&
    typeof data.email === 'string' &&
    typeof data.address === 'object' &&
    typeof data.company === 'object'
  );
}
