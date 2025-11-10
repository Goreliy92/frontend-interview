import { describe, it, expect } from 'vitest';
import { sumArray } from './array-sum.js';

describe('Array Sum', () => {
  it('should return 0 for an empty array', () => {
    expect(sumArray([])).toBe(0);
  });

  it('should calculate sum of positive numbers', () => {
    expect(sumArray([1, 2, 3, 4, 5])).toBe(15);
  });

  it('should handle negative numbers', () => {
    expect(sumArray([-1, 1, -2, 2])).toBe(0);
    expect(sumArray([-5, -3, -2])).toBe(-10);
  });

  it('should handle decimal numbers', () => {
    expect(sumArray([1.5, 2.5, 3.0])).toBe(7);
    expect(sumArray([0.1, 0.2])).toBeCloseTo(0.3);
  });

  it('should handle single element array', () => {
    expect(sumArray([42])).toBe(42);
  });

  it('should handle mix of positive and negative numbers', () => {
    expect(sumArray([10, -5, 3, -2, 7])).toBe(13);
  });
});
