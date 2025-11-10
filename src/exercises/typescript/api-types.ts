/**
 * TypeScript Exercise: Building Types from API Response
 * 
 * Task: Create TypeScript types based on API response structure
 * 
 * Common real-world scenario: Define types for external API responses
 * to ensure type safety when working with fetched data.
 */

/**
 * Example API Response from JSONPlaceholder (https://jsonplaceholder.typicode.com/users/1)
 * 
 * {
 *   "id": 1,
 *   "name": "Leanne Graham",
 *   "username": "Bret",
 *   "email": "Sincere@april.biz",
 *   "address": {
 *     "street": "Kulas Light",
 *     "suite": "Apt. 556",
 *     "city": "Gwenborough",
 *     "zipcode": "92998-3874",
 *     "geo": {
 *       "lat": "-37.3159",
 *       "lng": "81.1496"
 *     }
 *   },
 *   "phone": "1-770-736-8031 x56442",
 *   "website": "hildegard.org",
 *   "company": {
 *     "name": "Romaguera-Crona",
 *     "catchPhrase": "Multi-layered client-server neural-net",
 *     "bs": "harness real-time e-markets"
 *   }
 * }
 */

// TODO: Define the Geo interface
export interface Geo {
  // Add properties
}

// TODO: Define the Address interface
export interface Address {
  // Add properties including Geo
}

// TODO: Define the Company interface
export interface Company {
  // Add properties
}

// TODO: Define the User interface
export interface User {
  // Add all properties
}

/**
 * Fetch user from API and return typed data
 * @param userId - User ID to fetch
 * @returns Promise with User data
 */
export async function fetchUser(userId: number): Promise<User | null> {
  // TODO: Implement fetch with proper error handling
  // Use: https://jsonplaceholder.typicode.com/users/${userId}
  // Return null if fetch fails
  
  return null;
}

/**
 * Extract only name and email from user
 * TODO: Use Pick utility type for return type
 */
export function getUserContact(user: User): { name: string; email: string } {
  // TODO: Return object with only name and email
  return { name: '', email: '' };
}

/**
 * Type guard to check if response is valid User
 */
export function isValidUser(data: any): data is User {
  // TODO: Implement type guard
  // Check if data has required User properties
  return false;
}
