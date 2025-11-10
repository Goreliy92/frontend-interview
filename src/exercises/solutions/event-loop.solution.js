/**
 * Solution: Event Loop
 */
export function getEventLoopOrder() {
  // Synchronous code runs first: '1', '4'
  // Microtasks (Promises) run next: '3'
  // Macrotasks (setTimeout) run last: '2'
  return ['1', '4', '3', '2'];
}

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
  
  return output;
}
