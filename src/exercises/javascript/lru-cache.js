/**
 * JavaScript Exercise: LRU Cache
 * 
 * Task: Implement a Least Recently Used (LRU) cache
 * 
 * LRU cache evicts the least recently used item when capacity is reached.
 * Common interview question testing Map/object usage and algorithm knowledge.
 * 
 * @param {number} capacity - Maximum number of items in cache
 */
export class LRUCache {
  constructor(capacity) {
    // TODO: Initialize the cache
    // Hint: Use a Map to maintain insertion order
    this.capacity = capacity;
  }
  
  /**
   * Get value from cache
   * @param {string|number} key 
   * @returns {*} value or undefined if not found
   */
  get(key) {
    // TODO: Implement get
    // If key exists, move it to most recent position and return value
    // If not found, return undefined
  }
  
  /**
   * Put key-value pair in cache
   * @param {string|number} key 
   * @param {*} value 
   */
  put(key, value) {
    // TODO: Implement put
    // If key exists, update value and move to most recent
    // If key is new and cache is full, remove least recently used
    // Add the new key-value pair
  }
  
  /**
   * Get current size of cache
   * @returns {number}
   */
  size() {
    // TODO: Return current cache size
  }
}
