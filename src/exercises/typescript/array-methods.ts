/**
 * TypeScript Exercise: Array Methods with Types
 * 
 * Task: Implement typed array manipulation methods
 * 
 * Understanding how push, concat work with TypeScript's type system
 * and practicing type-safe array operations.
 */

/**
 * Type-safe array wrapper with common operations
 */
export class TypedArray<T> {
  private items: T[];
  
  constructor(initialItems: T[] = []) {
    this.items = initialItems;
  }
  
  /**
   * Add item to end of array
   * TODO: Implement push that maintains type safety
   */
  push(item: T): number {
    // Return new length of array
    return 0;
  }
  
  /**
   * Concatenate arrays
   * TODO: Implement concat that accepts multiple arrays
   */
  concat(...arrays: T[][]): TypedArray<T> {
    // Return new TypedArray with concatenated items
    return new TypedArray<T>();
  }
  
  /**
   * Filter items by predicate
   * TODO: Implement type-safe filter
   */
  filter(predicate: (item: T) => boolean): TypedArray<T> {
    return new TypedArray<T>();
  }
  
  /**
   * Map items to new type
   * TODO: Implement generic map function
   */
  map<U>(mapper: (item: T) => U): TypedArray<U> {
    return new TypedArray<U>();
  }
  
  /**
   * Get all items
   */
  getItems(): T[] {
    return this.items;
  }
  
  /**
   * Get array length
   */
  get length(): number {
    return this.items.length;
  }
}

/**
 * Example usage and testing
 */
export function testTypedArray(): boolean {
  // TODO: Create a TypedArray<number>, use push, concat, filter, map
  // Return true if all operations work correctly
  return false;
}
