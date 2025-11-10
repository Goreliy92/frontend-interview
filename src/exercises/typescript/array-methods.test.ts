import { describe, it, expect } from 'vitest';
import { TypedArray, testTypedArray } from './array-methods';

describe('Array Methods with Types', () => {
  describe('TypedArray', () => {
    describe('push', () => {
      it('should add item to array and return new length', () => {
        const arr = new TypedArray<number>([1, 2, 3]);
        const length = arr.push(4);
        expect(length).toBe(4);
        expect(arr.getItems()).toEqual([1, 2, 3, 4]);
      });

      it('should work with empty array', () => {
        const arr = new TypedArray<string>();
        const length = arr.push('hello');
        expect(length).toBe(1);
        expect(arr.getItems()).toEqual(['hello']);
      });

      it('should maintain type safety', () => {
        const arr = new TypedArray<number>([1, 2]);
        arr.push(3);
        expect(arr.getItems()).toEqual([1, 2, 3]);
      });
    });

    describe('concat', () => {
      it('should concatenate arrays', () => {
        const arr1 = new TypedArray<number>([1, 2]);
        const result = arr1.concat([3, 4], [5, 6]);
        expect(result.getItems()).toEqual([1, 2, 3, 4, 5, 6]);
      });

      it('should work with empty arrays', () => {
        const arr1 = new TypedArray<number>([1, 2]);
        const result = arr1.concat([], [3]);
        expect(result.getItems()).toEqual([1, 2, 3]);
      });

      it('should not modify original array', () => {
        const arr1 = new TypedArray<number>([1, 2]);
        arr1.concat([3, 4]);
        expect(arr1.getItems()).toEqual([1, 2]);
      });
    });

    describe('filter', () => {
      it('should filter items by predicate', () => {
        const arr = new TypedArray<number>([1, 2, 3, 4, 5]);
        const result = arr.filter(x => x > 2);
        expect(result.getItems()).toEqual([3, 4, 5]);
      });

      it('should return empty array when no items match', () => {
        const arr = new TypedArray<number>([1, 2, 3]);
        const result = arr.filter(x => x > 10);
        expect(result.getItems()).toEqual([]);
      });

      it('should not modify original array', () => {
        const arr = new TypedArray<number>([1, 2, 3]);
        arr.filter(x => x > 1);
        expect(arr.getItems()).toEqual([1, 2, 3]);
      });
    });

    describe('map', () => {
      it('should transform items to new type', () => {
        const arr = new TypedArray<number>([1, 2, 3]);
        const result = arr.map(x => String(x));
        expect(result.getItems()).toEqual(['1', '2', '3']);
      });

      it('should work with same type transformation', () => {
        const arr = new TypedArray<number>([1, 2, 3]);
        const result = arr.map(x => x * 2);
        expect(result.getItems()).toEqual([2, 4, 6]);
      });

      it('should not modify original array', () => {
        const arr = new TypedArray<number>([1, 2, 3]);
        arr.map(x => x * 2);
        expect(arr.getItems()).toEqual([1, 2, 3]);
      });
    });

    describe('length', () => {
      it('should return correct length', () => {
        const arr = new TypedArray<number>([1, 2, 3]);
        expect(arr.length).toBe(3);
      });

      it('should return 0 for empty array', () => {
        const arr = new TypedArray<number>();
        expect(arr.length).toBe(0);
      });
    });
  });

  describe('testTypedArray', () => {
    it('should demonstrate TypedArray usage', () => {
      // This tests the example usage function
      // Students should implement this to return true
      // when all operations work correctly
      const result = testTypedArray();
      expect(result).toBe(true);
    });
  });
});
