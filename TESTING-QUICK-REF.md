# Quick Testing Reference

## 🚀 Common Commands

```bash
# Watch mode - tests auto-rerun on file changes (RECOMMENDED for development)
npm test

# Run once - get results and exit
npm run test:run

# Visual UI - open in browser
npm run test:ui

# With coverage report
npm run test:coverage
```

## 🎯 Running Specific Tests (CLI Filtering)

You can run tests for specific exercises or functions:

```bash
# Run tests for array-sum exercise
npm test array-sum

# Run tests for debounce function
npm test debounce

# Run tests for LRU cache
npm test lru-cache

# Run tests matching a pattern
npm test "type-"

# Run a specific test file
npm test src/exercises/javascript/array-sum.test.js
```

**How it works:** Add the test name or file pattern after `npm test` and Vitest will filter to only run matching tests.

### Examples by Exercise:

```bash
# JavaScript exercises
npm test array-sum          # Array sum tests
npm test debounce          # Debounce tests
npm test throttle          # Throttle tests
npm test closure-counter   # Closure counter tests
npm test lru-cache         # LRU cache tests
npm test rle              # Run-length encoding tests
npm test promise-methods   # Promise methods tests
npm test type-coercion     # Type coercion tests
npm test type-conversions  # Type conversions tests
npm test event-loop        # Event loop tests

# TypeScript exercises
npm test user-validator    # User validator tests
npm test array-methods     # Array methods tests
npm test readonly-types    # Readonly types tests
```

## 📊 Test Status Indicators

- ✅ `✓` = Test Passed
- ❌ `✗` = Test Failed
- ⏭️ `skip` = Test Skipped
- 🚧 `todo` = Test Not Implemented Yet

## 🎯 Quick Workflow

### For Students:
1. Open exercise file (e.g., `array-sum.js`)
2. Run `npm test` in terminal
3. Implement solution
4. Watch tests turn green ✅
5. When all pass, move to next exercise

### For Mentors:
1. Run `npm run test:run`
2. Review summary report
3. Check coverage: `npm run test:coverage`
4. Open `coverage/index.html` in browser

## 💡 Pro Tips

- **Watch specific tests**: `npm test array-sum` then press `w` in watch mode for more options
- **Update snapshots**: `npm test -- -u` (if using snapshots)
- **Debug mode**: Add `debugger` in your code, run `node --inspect-brk ./node_modules/.bin/vitest`
- **Bail on failure**: `npm test -- --bail 1` (stops at first failure)
- **Verbose output**: Add `-- --reporter=verbose` for detailed test output

## 🐛 Common Issues

**Tests timeout?**
- Check for infinite loops in your code
- Default timeout is 5 seconds

**Import errors?**
- Ensure function is exported: `export function myFunc() {}`
- Check import matches: `import { myFunc } from './file.js'`

**Tests won't run?**
- Try `npm install` to reinstall dependencies
- Check Node version: `node --version` (should be 18+)

## 📚 Learn More

Full documentation: [TESTING.md](TESTING.md)
