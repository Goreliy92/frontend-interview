/**
 * JavaScript Exercise: Event Loop Understanding
 * 
 * Task: Predict the order of console.log outputs
 * 
 * This exercise helps understand the JavaScript event loop,
 * microtasks (Promises), and macrotasks (setTimeout).
 * 
 * @returns {Array<string>} - Array of outputs in the expected order
 */
export function getEventLoopOrder() {
  // TODO: Return an array with the order of console.log outputs
  // 
  // Given this code:
  // console.log('1');
  // setTimeout(() => console.log('2'), 0);
  // Promise.resolve().then(() => console.log('3'));
  // console.log('4');
  //
  // What order will the numbers be logged?
  // Return as array: ['1', '4', '3', '2']
  
  return []; // Replace with correct order
}

/**
 * Demonstrates the event loop with setTimeout and Promises
 */
export function demonstrateEventLoop() {
  const output = [];
  
  output.push('Start');
  
  setTimeout(() => {
    output.push('setTimeout 1');
  }, 0);
  
  Promise.resolve().then(() => {
    output.push('Promise 1');
  }).then(() => {
    output.push('Promise 2');
  });
  
  setTimeout(() => {
    output.push('setTimeout 2');
  }, 0);
  
  output.push('End');
  
  // Return output for testing
  // Note: Async operations won't be in this array immediately
  return output;
}
