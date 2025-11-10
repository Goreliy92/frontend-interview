/**
 * JavaScript Exercise: Promise Methods
 * 
 * Task: Implement custom versions of Promise.all, Promise.race, and Promise.allSettled
 * 
 * Understanding these Promise methods is crucial for handling async operations.
 * These are common interview questions about JavaScript async patterns.
 */

/**
 * Custom implementation of Promise.all
 * Resolves when all promises resolve, rejects if any promise rejects
 * 
 * @param {Array<Promise>} promises - Array of promises
 * @returns {Promise<Array>} - Promise that resolves with array of results
 */
export function promiseAll(promises) {
  // TODO: Implement Promise.all
  // Hints:
  // 1. Return a new Promise
  // 2. Track resolved values in an array
  // 3. Resolve when all promises complete
  // 4. Reject immediately if any promise rejects
  
  return Promise.resolve([]);
}

/**
 * Custom implementation of Promise.race
 * Resolves/rejects with the first promise that settles
 * 
 * @param {Array<Promise>} promises - Array of promises
 * @returns {Promise} - Promise that resolves/rejects with first settled promise
 */
export function promiseRace(promises) {
  // TODO: Implement Promise.race
  // Hints:
  // 1. Return a new Promise
  // 2. Attach then/catch to all promises
  // 3. Resolve/reject with the first one that settles
  
  return Promise.resolve();
}

/**
 * Custom implementation of Promise.allSettled
 * Waits for all promises to settle (resolve or reject)
 * Returns array of objects with status and value/reason
 * 
 * @param {Array<Promise>} promises - Array of promises
 * @returns {Promise<Array>} - Promise with array of {status, value/reason} objects
 */
export function promiseAllSettled(promises) {
  // TODO: Implement Promise.allSettled
  // Hints:
  // 1. Return a new Promise that never rejects
  // 2. Wrap each promise to capture resolve/reject
  // 3. Return array with objects: { status: 'fulfilled', value } or { status: 'rejected', reason }
  
  return Promise.resolve([]);
}

/**
 * Test helper: creates a promise that resolves after delay
 */
export function delay(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

/**
 * Test helper: creates a promise that rejects after delay
 */
export function delayReject(ms, reason) {
  return new Promise((_, reject) => setTimeout(() => reject(reason), ms));
}
