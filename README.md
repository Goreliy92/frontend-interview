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

## 🎯 How to Use

1. Open a file in the `src/exercises/` directory
2. Read the task description in the comments
3. Implement the required functionality
4. Test your solution using the interactive interface in the browser
5. Check `src/exercises/solutions/` for reference implementations (if stuck)

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