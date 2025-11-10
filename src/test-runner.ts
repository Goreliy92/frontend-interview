/**
 * Browser Test Runner
 * 
 * This module provides in-browser testing capabilities for exercises.
 * It runs tests defined in the test files and displays results in the UI.
 */

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  duration?: number;
}

interface TestSuite {
  name: string;
  tests: TestResult[];
}

/**
 * Test runner class for exercises
 */
export class BrowserTestRunner {
  private results: TestSuite[] = [];

  /**
   * Register a test suite
   */
  describe(suiteName: string, tests: () => void): void {
    const suite: TestSuite = {
      name: suiteName,
      tests: []
    };
    
    this.results.push(suite);
    
    // Create context for tests
    const testContext = {
      it: (testName: string, testFn: () => void | Promise<void>) => {
        this.runTest(suite, testName, testFn);
      },
      expect: this.createExpect()
    };

    tests.call(testContext);
  }

  /**
   * Run a single test
   */
  private async runTest(
    suite: TestSuite, 
    testName: string, 
    testFn: () => void | Promise<void>
  ): Promise<void> {
    const startTime = performance.now();
    
    try {
      await testFn();
      suite.tests.push({
        name: testName,
        passed: true,
        duration: performance.now() - startTime
      });
    } catch (error) {
      suite.tests.push({
        name: testName,
        passed: false,
        error: error instanceof Error ? error.message : String(error),
        duration: performance.now() - startTime
      });
    }
  }

  /**
   * Create expect assertion helper
   */
  private createExpect() {
    return function expect(actual: any) {
      return {
        toBe(expected: any) {
          if (actual !== expected) {
            throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
          }
        },
        toEqual(expected: any) {
          if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
          }
        },
        toBeNull() {
          if (actual !== null) {
            throw new Error(`Expected null but got ${JSON.stringify(actual)}`);
          }
        },
        toBeTruthy() {
          if (!actual) {
            throw new Error(`Expected truthy value but got ${JSON.stringify(actual)}`);
          }
        },
        toBeFalsy() {
          if (actual) {
            throw new Error(`Expected falsy value but got ${JSON.stringify(actual)}`);
          }
        }
      };
    };
  }

  /**
   * Get test results
   */
  getResults(): TestSuite[] {
    return this.results;
  }

  /**
   * Clear test results
   */
  clear(): void {
    this.results = [];
  }

  /**
   * Render results to HTML
   */
  renderResults(containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) return;

    const totalTests = this.results.reduce((sum, suite) => sum + suite.tests.length, 0);
    const passedTests = this.results.reduce(
      (sum, suite) => sum + suite.tests.filter(t => t.passed).length, 
      0
    );
    const failedTests = totalTests - passedTests;

    const html = `
      <div class="test-summary ${failedTests === 0 ? 'success' : 'error'}">
        <h3>Test Results</h3>
        <div class="test-stats">
          <span class="stat-total">Total: ${totalTests}</span>
          <span class="stat-passed">✓ Passed: ${passedTests}</span>
          ${failedTests > 0 ? `<span class="stat-failed">✗ Failed: ${failedTests}</span>` : ''}
        </div>
      </div>
      ${this.results.map(suite => this.renderSuite(suite)).join('')}
    `;

    container.innerHTML = html;
  }

  /**
   * Render a single test suite
   */
  private renderSuite(suite: TestSuite): string {
    const passed = suite.tests.filter(t => t.passed).length;
    const total = suite.tests.length;
    
    return `
      <div class="test-suite">
        <h4>${suite.name} (${passed}/${total})</h4>
        <ul class="test-list">
          ${suite.tests.map(test => this.renderTest(test)).join('')}
        </ul>
      </div>
    `;
  }

  /**
   * Render a single test
   */
  private renderTest(test: TestResult): string {
    return `
      <li class="test-item ${test.passed ? 'passed' : 'failed'}">
        <span class="test-icon">${test.passed ? '✓' : '✗'}</span>
        <span class="test-name">${test.name}</span>
        ${test.duration ? `<span class="test-duration">(${test.duration.toFixed(1)}ms)</span>` : ''}
        ${test.error ? `<div class="test-error">${test.error}</div>` : ''}
      </li>
    `;
  }
}

// Export singleton instance
export const testRunner = new BrowserTestRunner();
