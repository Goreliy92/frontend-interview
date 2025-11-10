/**
 * Solution: Fetch with Retry
 */

interface RetryOptions {
  maxRetries: number;
  delayMs: number;
  backoffMultiplier?: number;
}

export async function fetchWithRetry<T = any>(
  url: string,
  options: RetryOptions = { maxRetries: 3, delayMs: 1000, backoffMultiplier: 2 }
): Promise<T> {
  let lastError: Error;
  let currentDelay = options.delayMs;
  const backoff = options.backoffMultiplier || 2;
  
  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      lastError = error as Error;
      
      // If this was the last attempt, throw
      if (attempt === options.maxRetries) {
        throw lastError;
      }
      
      // Wait before retrying
      await delay(currentDelay);
      
      // Increase delay for next attempt
      currentDelay *= backoff;
    }
  }
  
  throw lastError!;
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function testRetryLogic(): Promise<{ success: boolean; attempts: number }> {
  let attempts = 0;
  
  const mockFetch = async (): Promise<any> => {
    attempts++;
    if (attempts < 3) {
      throw new Error(`Attempt ${attempts} failed`);
    }
    return { data: 'success' };
  };
  
  try {
    // Simulate retry logic
    let lastError: Error;
    for (let i = 0; i < 3; i++) {
      try {
        await mockFetch();
        return { success: true, attempts };
      } catch (error) {
        lastError = error as Error;
        if (i < 2) {
          await delay(100);
        }
      }
    }
    return { success: false, attempts };
  } catch (error) {
    return { success: false, attempts };
  }
}
