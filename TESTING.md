# Testing Guide

## Overview

This repository includes comprehensive automated tests to help both mentors and interviewees validate solutions quickly and efficiently.

## 🎯 For Interviewees (Students)

### Running Tests

There are several ways to run tests:

#### 1. Run All Tests (Watch Mode)
```bash
npm test
```
This will run tests in watch mode - tests automatically re-run when you save changes to your code.

#### 2. Run Tests Once
```bash
npm run test:run
```
This runs all tests once and shows you the results.

#### 3. Run Tests with Visual UI
```bash
npm run test:ui
```
This opens a beautiful web interface where you can:
- See all tests visually
- Filter tests by file or name
- See detailed error messages
- Track your progress

#### 4. Run Tests for Specific Exercise

You can easily run tests for just one exercise or function:

```bash
# Run only array-sum tests
npm test array-sum

# Run only debounce tests
npm test debounce

# Run only throttle tests
npm test throttle
```

**How it works:** Vitest will filter and run only tests that match the pattern you provide. This is perfect when you're working on a specific exercise and want immediate feedback without running all 136 tests.

**All available exercises:**
- JavaScript: `array-sum`, `debounce`, `throttle`, `closure-counter`, `lru-cache`, `rle`, `promise-methods`, `type-coercion`, `type-conversions`, `event-loop`
- TypeScript: `user-validator`, `array-methods`, `readonly-types`

You can also run a specific test file directly:
```bash
npx vitest run src/exercises/javascript/array-sum.test.js
```

### Understanding Test Results

#### ✅ Passing Test
```
✓ should return 0 for an empty array
```
Great! This test passes. Your implementation works correctly for this case.

#### ❌ Failing Test
```
✗ should calculate sum of positive numbers
  Expected: 15
  Received: 0
```
This test failed. The expected result was 15, but your function returned 0. Review your implementation.

### Test-Driven Development Workflow

1. **Read the Exercise**: Open the exercise file (e.g., `array-sum.js`) and read the requirements
2. **Run Tests**: Run `npm test` to see all failing tests
3. **Implement Solution**: Write your code to make tests pass
4. **Watch Tests Pass**: As you save your code, tests automatically re-run
5. **All Green**: When all tests pass, you're done! ✅

### Tips for Success

- **Start with Simple Tests**: Focus on making the simplest test pass first
- **One Test at a Time**: Don't try to pass all tests at once
- **Read Error Messages**: Test failures tell you exactly what's wrong
- **Use console.log**: Add `console.log()` in your code to debug issues
- **Compare with Solutions**: If stuck, peek at the solution files in `src/exercises/solutions/`

## 👨‍🏫 For Mentors

### Quick Validation

Run all tests to validate an interviewee's solutions:

```bash
npm run test:run
```

You'll get a complete report showing:
- ✅ Which exercises are complete
- ❌ Which exercises need work
- 📊 Overall progress percentage

### Detailed Review

Use the UI mode for detailed review:

```bash
npm run test:ui
```

This lets you:
- See exactly which test cases pass/fail
- Review code coverage
- Identify common mistakes
- Track progress over multiple sessions

### Test Coverage

Check code coverage to ensure comprehensive solutions:

```bash
npm run test:coverage
```

This generates a report showing:
- Which lines of code are tested
- Which branches are covered
- Overall coverage percentage

Coverage reports are saved in `coverage/` directory (git-ignored).

## 📋 Available Tests

### JavaScript Exercises
- ✅ `array-sum.test.js` - Array sum calculations
- ✅ `debounce.test.js` - Debounce function implementation
- ✅ `throttle.test.js` - Throttle function implementation
- ✅ `closure-counter.test.js` - Closure-based counter
- ✅ `lru-cache.test.js` - LRU Cache data structure
- ✅ `rle.test.js` - Run-length encoding algorithm
- ✅ `promise-methods.test.js` - Promise.all, race, allSettled

### TypeScript Exercises
- ✅ `user-validator.test.ts` - User validation with types

## 🔧 Test Structure

Each test file follows this structure:

```javascript
import { describe, it, expect } from 'vitest';
import { functionName } from './exercise-file.js';

describe('Exercise Name', () => {
  it('should do something specific', () => {
    expect(functionName(input)).toBe(expectedOutput);
  });
});
```

### Key Testing Functions

- `describe()` - Groups related tests
- `it()` - Defines a single test case
- `expect()` - Makes an assertion
- `.toBe()` - Checks for exact equality
- `.toEqual()` - Checks for deep equality (objects/arrays)
- `.toBeNull()` - Checks if value is null
- `.toBeCloseTo()` - Checks floating-point numbers (handles rounding)

## 🚀 Advanced Features

### Mocking Timers (for debounce/throttle)
Tests for time-dependent functions use fake timers:

```javascript
import { vi } from 'vitest';

beforeEach(() => {
  vi.useFakeTimers(); // Use fake timers
});

afterEach(() => {
  vi.restoreAllMocks(); // Cleanup
});

it('should delay execution', () => {
  const func = vi.fn();
  const debounced = debounce(func, 100);
  
  debounced();
  vi.advanceTimersByTime(100); // Fast-forward time
  expect(func).toHaveBeenCalled();
});
```

### Async Testing (for Promises)
Tests for async functions use `async/await`:

```javascript
it('should resolve with array of values', async () => {
  const result = await promiseAll([Promise.resolve(1), Promise.resolve(2)]);
  expect(result).toEqual([1, 2]);
});
```

## 📊 Interpreting Test Output

### Summary View
```
Test Files  8 passed (8)
     Tests  67 passed (67)
  Start at  16:30:45
  Duration  2.34s
```

### Individual Test Results
```
✓ src/exercises/javascript/array-sum.test.js (6)
  ✓ Array Sum (6)
    ✓ should return 0 for an empty array
    ✓ should calculate sum of positive numbers
    ✓ should handle negative numbers
    ✓ should handle decimal numbers
    ✓ should handle single element array
    ✓ should handle mix of positive and negative numbers
```

## 🐛 Troubleshooting

### Tests Won't Run
```bash
# Reinstall dependencies
npm install

# Check if vitest is installed
npm list vitest
```

### Tests Timeout
Some tests might timeout if implementation has infinite loops. Default timeout is 5 seconds.

### Import Errors
Make sure your function exports match the test imports:
```javascript
// In exercise file
export function myFunction() { }

// In test file
import { myFunction } from './exercise-file.js';
```

## 📚 Learning Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Best Practices](https://testingjavascript.com/)
- [Jest/Vitest API](https://vitest.dev/api/)

## 💡 Best Practices

### For Students
1. **Run tests frequently** - Don't wait until you're done to test
2. **Read test names** - They describe what should happen
3. **Understand failures** - Learn from error messages
4. **Start simple** - Make the easiest test pass first

### For Mentors
1. **Review test output** - Quick way to assess progress
2. **Use test coverage** - Identify untested edge cases
3. **Pair with manual testing** - Tests don't catch everything
4. **Encourage TDD** - Help students develop test-first mindset

## 🎓 Next Steps

After mastering the basics:
1. Try writing your own tests
2. Explore test coverage reports
3. Learn about edge cases
4. Study the test implementations to understand testing patterns

Happy Testing! 🧪✨
