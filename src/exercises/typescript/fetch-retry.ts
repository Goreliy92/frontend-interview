/**
 * TypeScript/JavaScript Exercise: API Retry Logic
 * 
 * Task: Implement a fetch function with automatic retry on failure
 * 
 * Useful for handling flaky network connections or rate-limited APIs.
 * Implements exponential backoff for retries.
 */

interface RetryOptions {
  maxRetries: number;
  delayMs: number;
  backoffMultiplier?: number; // Multiply delay by this on each retry
}

/**
 * Fetch with retry logic
 * @param url - URL to fetch
 * @param options - Retry configuration
 * @returns Promise with response data
 */
export async function fetchWithRetry<T = any>(
  url: string,
  options: RetryOptions = { maxRetries: 3, delayMs: 1000, backoffMultiplier: 2 }
): Promise<T> {
  // TODO: Implement fetch with retry
  // 1. Try to fetch the URL
  // 2. If it fails and retries remain, wait delayMs and try again
  // 3. Increase delay by backoffMultiplier for each retry
  // 4. If all retries exhausted, throw the last error
  
  throw new Error('Not implemented');
}

/**
 * Helper function to create delay
 */
export function delay(ms: number): Promise<void> {
  // TODO: Return a promise that resolves after ms milliseconds
  return Promise.resolve();
}

/**
 * Test the retry logic
 * This simulates an API that fails the first 2 times then succeeds
 */
export async function testRetryLogic(): Promise<{ success: boolean; attempts: number }> {
  let attempts = 0;
  
  // Mock fetch that fails first 2 times
  const mockFetch = async () => {
    attempts++;
    if (attempts < 3) {
      throw new Error(`Attempt ${attempts} failed`);
    }
    return { data: 'success' };
  };
  
  // TODO: Use your retry logic here
  // Should succeed on 3rd attempt
  
  return { success: false, attempts: 0 };
}
