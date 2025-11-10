import { describe, it, expect } from 'vitest';
import { LRUCache } from './lru-cache.js';

describe('LRU Cache', () => {
  it('should get and put values', () => {
    const cache = new LRUCache(2);
    cache.put(1, 'one');
    expect(cache.get(1)).toBe('one');
  });

  it('should return null for non-existent keys', () => {
    const cache = new LRUCache(2);
    expect(cache.get(999)).toBeNull();
  });

  it('should evict least recently used item when capacity is exceeded', () => {
    const cache = new LRUCache(2);
    cache.put(1, 'one');
    cache.put(2, 'two');
    cache.put(3, 'three'); // Should evict key 1

    expect(cache.get(1)).toBeNull();
    expect(cache.get(2)).toBe('two');
    expect(cache.get(3)).toBe('three');
  });

  it('should update access order on get', () => {
    const cache = new LRUCache(2);
    cache.put(1, 'one');
    cache.put(2, 'two');
    cache.get(1); // Access key 1, making it most recently used
    cache.put(3, 'three'); // Should evict key 2, not key 1

    expect(cache.get(1)).toBe('one');
    expect(cache.get(2)).toBeNull();
    expect(cache.get(3)).toBe('three');
  });

  it('should update value for existing key', () => {
    const cache = new LRUCache(2);
    cache.put(1, 'one');
    cache.put(1, 'ONE');
    expect(cache.get(1)).toBe('ONE');
  });

  it('should handle capacity of 1', () => {
    const cache = new LRUCache(1);
    cache.put(1, 'one');
    cache.put(2, 'two');
    expect(cache.get(1)).toBeNull();
    expect(cache.get(2)).toBe('two');
  });

  it('should maintain correct order with multiple operations', () => {
    const cache = new LRUCache(3);
    cache.put(1, 'one');
    cache.put(2, 'two');
    cache.put(3, 'three');
    cache.get(1); // Access order: 2, 3, 1
    cache.put(4, 'four'); // Should evict 2

    expect(cache.get(2)).toBeNull();
    expect(cache.get(1)).toBe('one');
    expect(cache.get(3)).toBe('three');
    expect(cache.get(4)).toBe('four');
  });
});
