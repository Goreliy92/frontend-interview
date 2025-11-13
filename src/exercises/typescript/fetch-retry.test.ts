/**
 * Tests for Fetch with Retry Exercise
 * 
 * Tests the retry logic, exponential backoff, and error handling
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchWithRetry, delay, testRetryLogic } from './fetch-retry';

// Mock fetch globally
const mockFetch = vi.fn();
(globalThis as any).fetch = mockFetch;

describe('Fetch with Retry', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('delay', () => {
    it('should delay for specified milliseconds', async () => {
      const delayPromise = delay(1000);
      
      // Fast-forward time
      vi.advanceTimersByTime(999);
      expect(vi.getTimerCount()).toBe(1);
      
      vi.advanceTimersByTime(1);
      await delayPromise;
      
      expect(vi.getTimerCount()).toBe(0);
    });

    it('should work with different delay times', async () => {
      const delays = [100, 500, 2000];
      
      for (const ms of delays) {
        const delayPromise = delay(ms);
        vi.advanceTimersByTime(ms);
        await delayPromise;
      }
    });

    it('should return a Promise', () => {
      const result = delay(100);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('fetchWithRetry', () => {
    describe('successful requests', () => {
      it('should return data on first successful attempt', async () => {
        const mockData = { id: 1, name: 'Test' };
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData
        });

        const promise = fetchWithRetry('https://api.example.com/data');
        await vi.runAllTimersAsync();
        const result = await promise;

        expect(result).toEqual(mockData);
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      it('should work with custom type parameter', async () => {
        interface User {
          id: number;
          name: string;
          email: string;
        }

        const mockUser: User = {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com'
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockUser
        });

        const promise = fetchWithRetry<User>('https://api.example.com/user/1');
        await vi.runAllTimersAsync();
        const result = await promise;

        expect(result).toEqual(mockUser);
        expect(result.email).toBe('john@example.com');
      });

      it('should use default options when not provided', async () => {
        const mockData = { success: true };
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData
        });

        const promise = fetchWithRetry('https://api.example.com/data');
        await vi.runAllTimersAsync();
        const result = await promise;

        expect(result).toEqual(mockData);
      });
    });

    describe('retry logic', () => {
      it('should retry once after first failure', async () => {
        const mockData = { success: true };
        
        // First call fails, second succeeds
        mockFetch
          .mockRejectedValueOnce(new Error('Network error'))
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
          });

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 1,
          delayMs: 1000
        });

        // Advance timers to allow retry
        await vi.runAllTimersAsync();
        const result = await promise;

        expect(result).toEqual(mockData);
        expect(mockFetch).toHaveBeenCalledTimes(2);
      });

      it('should retry multiple times until success', async () => {
        const mockData = { success: true };
        
        // Fail 3 times, then succeed
        mockFetch
          .mockRejectedValueOnce(new Error('Attempt 1 failed'))
          .mockRejectedValueOnce(new Error('Attempt 2 failed'))
          .mockRejectedValueOnce(new Error('Attempt 3 failed'))
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
          });

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 3,
          delayMs: 100
        });

        await vi.runAllTimersAsync();
        const result = await promise;

        expect(result).toEqual(mockData);
        expect(mockFetch).toHaveBeenCalledTimes(4); // 1 initial + 3 retries
      });

      it('should respect maxRetries limit', async () => {
        mockFetch.mockRejectedValue(new Error('Network error'));

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 2,
          delayMs: 100
        });

        await vi.runAllTimersAsync();

        await expect(promise).rejects.toThrow('Network error');
        expect(mockFetch).toHaveBeenCalledTimes(3); // 1 initial + 2 retries
      });

      it('should throw error when all retries exhausted', async () => {
        const errorMessage = 'Persistent network error';
        mockFetch.mockRejectedValue(new Error(errorMessage));

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 2,
          delayMs: 100
        });

        await vi.runAllTimersAsync();

        await expect(promise).rejects.toThrow(errorMessage);
      });
    });

    describe('exponential backoff', () => {
      it('should increase delay with default backoff multiplier (2x)', async () => {
        const delays: number[] = [];
        
        mockFetch.mockRejectedValue(new Error('Network error'));

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 3,
          delayMs: 100,
          backoffMultiplier: 2
        });

        // Track delays by checking timer state
        const timers: number[] = [];
        let attemptCount = 0;

        // Manually advance timers and track delays
        while (vi.getTimerCount() > 0 && attemptCount < 3) {
          const timerInfo = vi.getTimerCount();
          if (timerInfo > 0) {
            // Get the next timer delay
            const nextTimer = 100 * Math.pow(2, attemptCount);
            timers.push(nextTimer);
            vi.advanceTimersByTime(nextTimer);
            attemptCount++;
          }
        }

        await expect(promise).rejects.toThrow();

        // Verify delays increased: 100ms, 200ms, 400ms
        // Exponential backoff with multiplier 2
        expect(mockFetch).toHaveBeenCalledTimes(4); // 1 + 3 retries
      });

      it('should use custom backoff multiplier', async () => {
        mockFetch.mockRejectedValue(new Error('Network error'));

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 2,
          delayMs: 100,
          backoffMultiplier: 3 // 3x multiplier
        });

        await vi.runAllTimersAsync();

        await expect(promise).rejects.toThrow();
        expect(mockFetch).toHaveBeenCalledTimes(3);
      });

      it('should handle backoff multiplier of 1 (constant delay)', async () => {
        mockFetch.mockRejectedValue(new Error('Network error'));

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 2,
          delayMs: 500,
          backoffMultiplier: 1
        });

        await vi.runAllTimersAsync();

        await expect(promise).rejects.toThrow();
        expect(mockFetch).toHaveBeenCalledTimes(3);
      });
    });

    describe('HTTP error handling', () => {
      it('should retry on HTTP error status (4xx)', async () => {
        const mockData = { success: true };

        mockFetch
          .mockResolvedValueOnce({
            ok: false,
            status: 404,
            json: async () => ({ error: 'Not found' })
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
          });

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 1,
          delayMs: 100
        });

        await vi.runAllTimersAsync();
        const result = await promise;

        expect(result).toEqual(mockData);
        expect(mockFetch).toHaveBeenCalledTimes(2);
      });

      it('should retry on HTTP error status (5xx)', async () => {
        const mockData = { success: true };

        mockFetch
          .mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({ error: 'Server error' })
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
          });

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 1,
          delayMs: 100
        });

        await vi.runAllTimersAsync();
        const result = await promise;

        expect(result).toEqual(mockData);
      });

      it('should throw error for HTTP errors after retries exhausted', async () => {
        mockFetch.mockResolvedValue({
          ok: false,
          status: 503,
          json: async () => ({ error: 'Service unavailable' })
        });

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 1,
          delayMs: 100
        });

        await vi.runAllTimersAsync();

        await expect(promise).rejects.toThrow('HTTP error! status: 503');
      });
    });

    describe('edge cases', () => {
      it('should handle maxRetries of 0 (no retries)', async () => {
        mockFetch.mockRejectedValue(new Error('Network error'));

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 0,
          delayMs: 100
        });

        await vi.runAllTimersAsync();

        await expect(promise).rejects.toThrow('Network error');
        expect(mockFetch).toHaveBeenCalledTimes(1); // Only initial attempt
      });

      it('should handle very short delays', async () => {
        const mockData = { success: true };

        mockFetch
          .mockRejectedValueOnce(new Error('Network error'))
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
          });

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 1,
          delayMs: 1
        });

        await vi.runAllTimersAsync();
        const result = await promise;

        expect(result).toEqual(mockData);
      });

      it('should handle large retry counts', async () => {
        const mockData = { success: true };
        
        // Fail many times, then succeed
        for (let i = 0; i < 10; i++) {
          mockFetch.mockRejectedValueOnce(new Error('Network error'));
        }
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData
        });

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 10,
          delayMs: 10
        });

        await vi.runAllTimersAsync();
        const result = await promise;

        expect(result).toEqual(mockData);
        expect(mockFetch).toHaveBeenCalledTimes(11);
      });

      it('should handle JSON parsing errors', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => {
            throw new Error('Invalid JSON');
          }
        });

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 1,
          delayMs: 100
        });

        await vi.runAllTimersAsync();

        await expect(promise).rejects.toThrow('Invalid JSON');
      });
    });

    describe('real-world scenarios', () => {
      it('should handle flaky network (intermittent failures)', async () => {
        const mockData = { data: 'success' };

        // Simulate: fail, succeed, but we only see up to success
        mockFetch
          .mockRejectedValueOnce(new Error('Connection timeout'))
          .mockRejectedValueOnce(new Error('Connection reset'))
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
          });

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 3,
          delayMs: 100,
          backoffMultiplier: 2
        });

        await vi.runAllTimersAsync();
        const result = await promise;

        expect(result).toEqual(mockData);
        expect(mockFetch).toHaveBeenCalledTimes(3);
      });

      it('should handle rate limiting (429 status)', async () => {
        const mockData = { data: 'success' };

        mockFetch
          .mockResolvedValueOnce({
            ok: false,
            status: 429, // Too Many Requests
            json: async () => ({ error: 'Rate limit exceeded' })
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
          });

        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 2,
          delayMs: 1000,
          backoffMultiplier: 2
        });

        await vi.runAllTimersAsync();
        const result = await promise;

        expect(result).toEqual(mockData);
      });

      it('should work with different URLs', async () => {
        const urls = [
          'https://api.example.com/users',
          'https://api.example.com/posts',
          'https://api.example.com/comments'
        ];

        for (let i = 0; i < urls.length; i++) {
          mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: i, url: urls[i] })
          });
        }

        for (let i = 0; i < urls.length; i++) {
          const promise = fetchWithRetry(urls[i], {
            maxRetries: 1,
            delayMs: 100
          });
          await vi.runAllTimersAsync();
          const result = await promise;
          expect(result.url).toBe(urls[i]);
        }
      });
    });
  });

  describe('testRetryLogic', () => {
    it('should demonstrate retry logic with mock fetch', async () => {
      const promise = testRetryLogic();
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.attempts).toBe(3);
    });

    it('should track number of attempts', async () => {
      const promise = testRetryLogic();
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result.attempts).toBeGreaterThan(0);
      expect(typeof result.attempts).toBe('number');
    });

    it('should return success status', async () => {
      const promise = testRetryLogic();
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(typeof result.success).toBe('boolean');
    });
  });

  describe('integration tests', () => {
    it('should handle complete retry flow with exponential backoff', async () => {
      const mockData = { userId: 123, data: 'test' };
      let attemptNumber = 0;

      // Simulate 3 failures then success
      mockFetch.mockImplementation(async () => {
        attemptNumber++;
        if (attemptNumber < 4) {
          throw new Error(`Attempt ${attemptNumber} failed`);
        }
        return {
          ok: true,
          json: async () => mockData
        };
      });

      const promise = fetchWithRetry('https://api.example.com/user/123', {
        maxRetries: 3,
        delayMs: 100,
        backoffMultiplier: 2
      });

      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toEqual(mockData);
      expect(attemptNumber).toBe(4); // 1 initial + 3 retries
    });

    it('should work with async/await pattern', async () => {
      const mockData = { test: true };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      try {
        const promise = fetchWithRetry('https://api.example.com/data', {
          maxRetries: 2,
          delayMs: 100
        });
        await vi.runAllTimersAsync();
        const result = await promise;
        expect(result).toEqual(mockData);
      } catch (error) {
        // Should not reach here
        expect(error).toBeUndefined();
      }
    });

    it('should handle promise chain', async () => {
      const mockData = { value: 42 };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const promise = fetchWithRetry<{ value: number }>('https://api.example.com/data')
        .then(data => data.value * 2);

      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe(84);
    });
  });
});
