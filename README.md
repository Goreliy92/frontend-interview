# Frontend Interview Boilerplate

A mentorship-focused boilerplate with exercises for JavaScript, TypeScript, and DOM API. Perfect for learning and practicing frontend development concepts.

## 🚀 Quick Start on StackBlitz

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Goreliy92/frontend-interview)

## 📦 Local Setup

1. Clone the repository:
```bash
git clone https://github.com/Goreliy92/frontend-interview.git
cd frontend-interview
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

## 🧪 Testing

This repository includes comprehensive automated tests for all exercises!

### Quick Start with Testing

```bash
# Run all tests in watch mode
npm test

# Run tests for specific exercise (e.g., array-sum)
npm test array-sum

# Run tests with visual UI
npm run test:ui

# Run tests once
npm run test:run
```

**For detailed testing documentation, see [TESTING.md](TESTING.md)**

**CLI Filtering:** You can run tests for any specific exercise by adding its name after `npm test`. Examples: `npm test debounce`, `npm test lru-cache`, `npm test user-validator`. See [TESTING-QUICK-REF.md](TESTING-QUICK-REF.md) for all available filters.

Tests help both students and mentors:
- ✅ **Students**: Validate your solutions instantly with automated tests
- 👨‍🏫 **Mentors**: Quickly review progress and identify areas needing help
- 📊 **Progress Tracking**: See exactly which exercises are complete

## 📚 Exercises

### JavaScript Exercises

#### 1. Array Sum
**File:** `src/exercises/javascript/array-sum.js`

Write a function that calculates the sum of all numbers in an array.

#### 2. Throttle
**File:** `src/exercises/javascript/throttle.js`

Implement a throttle function that limits how often a function can be called. Essential for performance optimization in scroll/resize handlers.

#### 3. Debounce
**File:** `src/exercises/javascript/debounce.js`

Implement a debounce function that delays execution until after a wait period. Useful for search inputs and auto-save features.

#### 4. Closure - Counter
**File:** `src/exercises/javascript/closure-counter.js`

Create a counter using closures to demonstrate private variables and encapsulation.

#### 5. Event Loop
**File:** `src/exercises/javascript/event-loop.js`

Understand JavaScript's event loop by predicting execution order of synchronous code, Promises, and setTimeout.

#### 6. LRU Cache
**File:** `src/exercises/javascript/lru-cache.js`

Implement a Least Recently Used cache with get/put operations. Common data structures interview question.

#### 7. Promise Methods
**File:** `src/exercises/javascript/promise-methods.js`

Implement custom versions of Promise.all, Promise.race, and Promise.allSettled to understand async coordination patterns.

#### 8. Type Conversions
**File:** `src/exercises/javascript/type-conversions.js`

Master JavaScript type coercion with functions for converting between strings, numbers, booleans, and parsing JSON.

#### 9. Type Coercion (== vs ===)
**File:** `src/exercises/javascript/type-coercion.js`

Understand the difference between loose equality (==) and strict equality (===). Learn when type coercion happens and how to avoid common bugs.

#### 10. Run-Length Encoding
**File:** `src/exercises/javascript/rle.js`

Implement RLE compression/decompression algorithm - a classic string manipulation and algorithm problem.

### TypeScript Exercises

#### 1. User Validator
**File:** `src/exercises/typescript/user-validator.ts`

Define a User interface and implement a validation function with proper type safety.

#### 2. Readonly & Utility Types
**File:** `src/exercises/typescript/readonly-types.ts`

Work with readonly properties and TypeScript utility types like Pick, Omit, and Readonly.

#### 3. Array Methods with Types
**File:** `src/exercises/typescript/array-methods.ts`

Implement type-safe array wrapper with push, concat, filter, and map methods using generics.

#### 4. API Types from Response
**File:** `src/exercises/typescript/api-types.ts`

Build TypeScript types from real API responses (JSONPlaceholder). Practice type guards and Pick utility.

#### 5. Fetch with Retry
**File:** `src/exercises/typescript/fetch-retry.ts`

Implement API calls with automatic retry logic and exponential backoff for network resilience.

### DOM API Exercises

#### 1. Todo List
**File:** `src/exercises/dom/todo-list.ts`

Create an interactive todo list using createElement, appendChild, and event listeners.

#### 2. Event Delegation
**File:** `src/exercises/dom/event-delegation.ts`

Learn the Event Delegation pattern - use a single event listener on a parent to handle events for many children. Essential for performance in large lists and dynamic content. Includes interactive demo at `event-delegation-demo.html`.

**Key Concepts:**
- Event bubbling and capturing
- Performance optimization (one listener vs many)
- Handling dynamically added elements
- Using `closest()` and `data-*` attributes

### React Exercises

All React tasks now live in a single Vite/React/TypeScript project:
- Location: `src/exercises/react/challenges`
- Run: `npm install && npm run dev` (from that folder)
- Implement tasks in `src/tasks/*`; reference approaches in `src/solutions/*`
  - Anti-Patterns Clinic — refactor a flawed tree (prop drilling, derived state, render storms, bad effects)
  - Todo Mini App — CRUD + filters + persistence + keyboard UX
  - Dummy API Mini App — loading/error/retry, search, details + comments, optimistic create (API or mock)

## 🎯 How to Use

### For Students (Interviewees)

1. **Choose an exercise** from `src/exercises/` directory
2. **Read the task description** in the file comments  
3. **Run tests in watch mode**: `npm test`
4. **Implement the solution** while watching tests turn green ✅
5. **All tests pass?** Move to the next exercise!

See [TESTING.md](TESTING.md) for detailed testing guide.

### For Mentors

1. **Quick validation**: `npm run test:run` - see all exercise completion status
2. **Visual review**: `npm run test:ui` - interactive test results in browser
3. **Check coverage**: `npm run test:coverage` - see code coverage reports
4. **Manual review**: Compare solutions with reference implementations in `src/exercises/solutions/`

## 📁 Project Structure

```
frontend-interview/
├── index.html              # Main HTML file
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── src/
│   ├── main.ts            # Main application logic
│   ├── style.css          # Styles
│   └── exercises/
│       ├── javascript/    # JavaScript exercises
│       ├── typescript/    # TypeScript exercises
│       ├── dom/          # DOM API exercises
│       └── solutions/    # Reference solutions
└── README.md
```

## 🛠️ Tech Stack

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Vanilla JS/TS** - No frameworks, pure web APIs

## 📝 Adding New Exercises

1. Create a new file in the appropriate `src/exercises/` subdirectory
2. Add the exercise description in comments
3. Update `src/main.ts` to include the new exercise
4. Add a new section in `index.html` if needed

## 🤝 Contributing

Feel free to add more exercises, improve existing ones, or enhance the UI!

## 📄 License

MIT
