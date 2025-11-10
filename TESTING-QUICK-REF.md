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

- **Filter tests**: `npm test -- array-sum` (runs only array-sum tests)
- **Update snapshots**: `npm test -- -u` (if using snapshots)
- **Debug mode**: Add `debugger` in your code, run `node --inspect-brk ./node_modules/.bin/vitest`
- **Bail on failure**: `npm test -- --bail 1` (stops at first failure)

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
