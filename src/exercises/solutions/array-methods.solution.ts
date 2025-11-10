/**
 * Solution: Array Methods with Types
 */

export class TypedArray<T> {
  private items: T[];
  
  constructor(initialItems: T[] = []) {
    this.items = [...initialItems];
  }
  
  push(item: T): number {
    this.items.push(item);
    return this.items.length;
  }
  
  concat(...arrays: T[][]): TypedArray<T> {
    const allItems = this.items.concat(...arrays);
    return new TypedArray<T>(allItems);
  }
  
  filter(predicate: (item: T) => boolean): TypedArray<T> {
    return new TypedArray<T>(this.items.filter(predicate));
  }
  
  map<U>(mapper: (item: T) => U): TypedArray<U> {
    return new TypedArray<U>(this.items.map(mapper));
  }
  
  getItems(): T[] {
    return [...this.items];
  }
  
  get length(): number {
    return this.items.length;
  }
}

export function testTypedArray(): boolean {
  const arr = new TypedArray<number>([1, 2, 3]);
  arr.push(4);
  
  const concatenated = arr.concat([5, 6], [7, 8]);
  const filtered = concatenated.filter(x => x > 3);
  const mapped = filtered.map(x => x * 2);
  
  return mapped.getItems().length === 5; // [4,5,6,7,8] -> [8,10,12,14,16]
}
