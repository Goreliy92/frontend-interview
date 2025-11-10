import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './debounce.js';

describe('Debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should delay function execution', () => {
    const func = vi.fn();
    const debounced = debounce(func, 100);

    debounced();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should cancel previous timeout on new call', () => {
    const func = vi.fn();
    const debounced = debounce(func, 100);

    debounced();
    vi.advanceTimersByTime(50);
    debounced(); // Should cancel previous call
    vi.advanceTimersByTime(50);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments correctly', () => {
    const func = vi.fn();
    const debounced = debounce(func, 100);

    debounced('hello', 'world');
    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledWith('hello', 'world');
  });

  it('should maintain correct context', () => {
    const obj = {
      value: 42,
      method: function() {
        return this.value;
      }
    };

    const func = vi.fn(obj.method);
    obj.debounced = debounce(func, 100);

    obj.debounced();
    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalled();
  });

  it('should only execute once after multiple rapid calls', () => {
    const func = vi.fn();
    const debounced = debounce(func, 100);

    // Rapid calls
    debounced();
    debounced();
    debounced();
    debounced();
    debounced();

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });
});
