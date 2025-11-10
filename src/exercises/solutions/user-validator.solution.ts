/**
 * Solution: User Validator
 */

export interface User {
  name: string;
  age: number;
  email: string;
}

export function isValidUser(user: User): boolean {
  // Check all validation rules
  const isNameValid = user.name.trim().length > 0;
  const isAgeValid = user.age >= 18;
  const isEmailValid = user.email.includes('@');
  
  return isNameValid && isAgeValid && isEmailValid;
}
