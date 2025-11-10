import { describe, it, expect } from 'vitest';
import { promiseAll, promiseRace, promiseAllSettled } from './promise-methods.js';

describe('Promise Methods', () => {
  describe('promiseAll', () => {
    it('should resolve with array of values when all promises resolve', async () => {
      const promises = [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
      ];
      const result = await promiseAll(promises);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should reject immediately when any promise rejects', async () => {
      const promises = [
        Promise.resolve(1),
        Promise.reject('error'),
        Promise.resolve(3)
      ];
      await expect(promiseAll(promises)).rejects.toBe('error');
    });

    it('should handle empty array', async () => {
      const result = await promiseAll([]);
      expect(result).toEqual([]);
    });

    it('should maintain order of results', async () => {
      const promises = [
        new Promise(resolve => setTimeout(() => resolve('first'), 100)),
        Promise.resolve('second'),
        new Promise(resolve => setTimeout(() => resolve('third'), 50))
      ];
      const result = await promiseAll(promises);
      expect(result).toEqual(['first', 'second', 'third']);
    });
  });

  describe('promiseRace', () => {
    it('should resolve with first resolved promise', async () => {
      const promises = [
        new Promise(resolve => setTimeout(() => resolve('slow'), 100)),
        Promise.resolve('fast'),
        new Promise(resolve => setTimeout(() => resolve('slower'), 200))
      ];
      const result = await promiseRace(promises);
      expect(result).toBe('fast');
    });

    it('should reject with first rejected promise', async () => {
      const promises = [
        new Promise((_, reject) => setTimeout(() => reject('error'), 10)),
        new Promise(resolve => setTimeout(() => resolve('slow'), 100))
      ];
      await expect(promiseRace(promises)).rejects.toBe('error');
    });

    it('should handle single promise', async () => {
      const result = await promiseRace([Promise.resolve(42)]);
      expect(result).toBe(42);
    });
  });

  describe('promiseAllSettled', () => {
    it('should return array of results for all promises', async () => {
      const promises = [
        Promise.resolve(1),
        Promise.reject('error'),
        Promise.resolve(3)
      ];
      const result = await promiseAllSettled(promises);
      
      expect(result).toEqual([
        { status: 'fulfilled', value: 1 },
        { status: 'rejected', reason: 'error' },
        { status: 'fulfilled', value: 3 }
      ]);
    });

    it('should wait for all promises to settle', async () => {
      const promises = [
        new Promise(resolve => setTimeout(() => resolve('first'), 100)),
        new Promise((_, reject) => setTimeout(() => reject('error'), 50)),
        new Promise(resolve => setTimeout(() => resolve('third'), 75))
      ];
      const result = await promiseAllSettled(promises);
      
      expect(result).toHaveLength(3);
      expect(result[0].status).toBe('fulfilled');
      expect(result[1].status).toBe('rejected');
      expect(result[2].status).toBe('fulfilled');
    });

    it('should handle empty array', async () => {
      const result = await promiseAllSettled([]);
      expect(result).toEqual([]);
    });

    it('should handle all rejected promises', async () => {
      const promises = [
        Promise.reject('error1'),
        Promise.reject('error2')
      ];
      const result = await promiseAllSettled(promises);
      
      expect(result).toEqual([
        { status: 'rejected', reason: 'error1' },
        { status: 'rejected', reason: 'error2' }
      ]);
    });
  });
});
