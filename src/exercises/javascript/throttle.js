/**
 * JavaScript Exercise: Throttle Function
 * 
 * Task: Implement a throttle function that limits how often a function can be called
 * 
 * Throttle ensures that a function is called at most once in a specified time period.
 * Useful for performance optimization (e.g., scroll or resize handlers).
 * 
 * @param {Function} func - The function to throttle
 * @param {number} delay - Time in milliseconds
 * @returns {Function} - Throttled function
 */
export function throttle(func, delay) {
  // TODO: Implement throttle
  // Hint: Use a flag to track if the function is allowed to run
  // After calling the function, set a timeout to reset the flag
  
  return function(...args) {
    // Your implementation here
  };
}
