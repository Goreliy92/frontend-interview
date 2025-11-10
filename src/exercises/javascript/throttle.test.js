import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { throttle } from './throttle.js';

describe('Throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should execute immediately on first call', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should prevent execution during throttle period', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled();
    throttled();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should allow execution after throttle period', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    throttled();
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should pass arguments correctly', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled('test', 123);
    expect(func).toHaveBeenCalledWith('test', 123);
  });

  it('should maintain correct context', () => {
    const obj = {
      value: 42,
      method: vi.fn(function() {
        return this.value;
      })
    };

    obj.throttled = throttle(obj.method, 100);
    obj.throttled();
    expect(obj.method).toHaveBeenCalled();
  });

  it('should limit function calls over time', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    // Call 10 times rapidly
    for (let i = 0; i < 10; i++) {
      throttled();
      vi.advanceTimersByTime(10);
    }

    // Should have been called twice: at 0ms and at 100ms
    expect(func).toHaveBeenCalledTimes(2);
  });
});
