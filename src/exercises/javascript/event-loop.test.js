import { describe, it, expect } from 'vitest';
import { getEventLoopOrder, demonstrateEventLoop } from './event-loop.js';

describe('Event Loop Understanding', () => {
  describe('getEventLoopOrder', () => {
    it('should predict correct execution order', () => {
      const expected = ['1', '4', '3', '2'];
      expect(getEventLoopOrder()).toEqual(expected);
    });
  });

  describe('demonstrateEventLoop', () => {
    it('should execute synchronous code immediately', () => {
      const output = demonstrateEventLoop();
      // Synchronous code runs immediately
      expect(output[0]).toBe('Start');
      expect(output[1]).toBe('End');
    });

    it('should have Start and End in order', () => {
      const output = demonstrateEventLoop();
      expect(output).toEqual(['Start', 'End']);
    });
  });

  // Note: Testing async behavior requires waiting for promises/timers
  // In a real test environment, you'd use async/await or done callbacks
  describe('Event Loop Concepts', () => {
    it('should understand call stack execution', () => {
      // Call stack: LIFO (Last In, First Out)
      const order = [];
      
      function first() { order.push('first'); }
      function second() { order.push('second'); }
      function third() { order.push('third'); }
      
      first();
      second();
      third();
      
      expect(order).toEqual(['first', 'second', 'third']);
    });

    it('should understand microtasks run before macrotasks', async () => {
      const order = [];
      
      setTimeout(() => order.push('timeout'), 0); // Macrotask
      Promise.resolve().then(() => order.push('promise')); // Microtask
      order.push('sync'); // Synchronous
      
      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Order should be: sync, promise (microtask), timeout (macrotask)
      expect(order).toEqual(['sync', 'promise', 'timeout']);
    });

    it('should understand promise chaining', async () => {
      const order = [];
      
      Promise.resolve()
        .then(() => order.push('then1'))
        .then(() => order.push('then2'));
      
      order.push('sync');
      
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(order).toEqual(['sync', 'then1', 'then2']);
    });

    it('should understand multiple setTimeout calls', async () => {
      const order = [];
      
      setTimeout(() => order.push('timeout1'), 0);
      setTimeout(() => order.push('timeout2'), 0);
      order.push('sync');
      
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(order).toEqual(['sync', 'timeout1', 'timeout2']);
    });
  });
});
