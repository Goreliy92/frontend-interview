import { describe, it, expect } from 'vitest';
import { createCounter } from './closure-counter.js';

describe('Closure Counter', () => {
  it('should start with initial value 0', () => {
    const counter = createCounter();
    expect(counter.getValue()).toBe(0);
  });

  it('should increment by 1', () => {
    const counter = createCounter();
    counter.increment();
    expect(counter.getValue()).toBe(1);
    counter.increment();
    expect(counter.getValue()).toBe(2);
  });

  it('should decrement by 1', () => {
    const counter = createCounter();
    counter.increment();
    counter.increment();
    counter.decrement();
    expect(counter.getValue()).toBe(1);
  });

  it('should reset to 0', () => {
    const counter = createCounter();
    counter.increment();
    counter.increment();
    counter.increment();
    counter.reset();
    expect(counter.getValue()).toBe(0);
  });

  it('should maintain independent state for multiple counters', () => {
    const counter1 = createCounter();
    const counter2 = createCounter();

    counter1.increment();
    counter1.increment();
    counter2.increment();

    expect(counter1.getValue()).toBe(2);
    expect(counter2.getValue()).toBe(1);
  });

  it('should not allow direct access to internal state', () => {
    const counter = createCounter();
    counter.increment();
    
    // Internal state should not be accessible
    expect(counter.count).toBeUndefined();
    expect(counter.value).toBeUndefined();
  });
});
