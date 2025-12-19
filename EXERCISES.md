# Additional Exercises Summary

This document provides an overview of all the additional exercises added to the boilerplate.

## JavaScript Exercises

### 1. Throttle (`throttle.js`)
**Concept:** Rate limiting for function calls
**Use Case:** Scroll handlers, resize events, button clicks
**Learning Goals:** 
- Performance optimization
- Closure usage
- Timing control with Date.now()

### 2. Debounce (`debounce.js`)
**Concept:** Delay execution until inactivity period
**Use Case:** Search inputs, auto-save, API calls
**Learning Goals:**
- setTimeout/clearTimeout
- Closure for state management
- Difference from throttle

### 3. Closure Counter (`closure-counter.js`)
**Concept:** Private variables using closures
**Use Case:** State management, encapsulation
**Learning Goals:**
- Lexical scoping
- Private state
- Method closures

### 4. Event Loop (`event-loop.js`)
**Concept:** Understanding JavaScript's concurrency model
**Use Case:** Predicting async code execution
**Learning Goals:**
- Call stack vs event loop
- Microtasks (Promises) vs Macrotasks (setTimeout)
- Execution order

### 5. LRU Cache (`lru-cache.js`)
**Concept:** Least Recently Used caching algorithm
**Use Case:** Caching API responses, memoization
**Learning Goals:**
- Data structure design
- Map operations and ordering
- Algorithm implementation

### 6. Promise Methods (`promise-methods.js`)
**Concept:** Async coordination patterns
**Use Case:** Handling multiple promises, race conditions, resilience
**Learning Goals:**
- Promise.all implementation
- Promise.race implementation
- Promise.allSettled implementation
- Understanding promise resolution/rejection

### 7. Type Conversions (`type-conversions.js`)
**Concept:** JavaScript type coercion and conversion
**Use Case:** Data validation, parsing user input, API data handling
**Learning Goals:**
- Implicit vs explicit conversion
- String, number, boolean conversions
- JSON parsing and error handling
- Query string manipulation

### 8. Type Coercion (`type-coercion.js`)
**Concept:** Understanding == vs === and type coercion rules
**Use Case:** Avoiding equality comparison bugs, interview preparation
**Learning Goals:**
- Difference between == (loose) and === (strict) equality
- How JavaScript coerces types in comparisons
- Common coercion pitfalls and bugs
- Best practices for equality checks
- Understanding falsy values vs loose equality

### 9. Run-Length Encoding (`rle.js`)
**Concept:** String compression algorithm
**Use Case:** Data compression, pattern recognition
**Learning Goals:**
- String manipulation
- Algorithm implementation
- Encode/decode patterns
- Optimization strategies

## DOM API Exercises

### 1. Todo List (`todo-list.ts`)
**Concept:** Basic DOM manipulation
**Use Case:** Interactive list management
**Learning Goals:**
- createElement, appendChild
- Event listeners
- Element removal
- DOM traversal

### 2. Event Delegation (`event-delegation.ts`)
**Concept:** Single event listener for multiple dynamic elements
**Use Case:** Large lists, dynamic content, performance optimization
**Learning Goals:**
- Event bubbling and capturing
- Event.target vs Event.currentTarget
- Using closest() and matches()
- data-* attributes for action identification
- Performance benefits of delegation
- Handling dynamically added elements

## TypeScript Exercises

### 1. Readonly & Utility Types (`readonly-types.ts`)
**Concept:** Immutability and built-in utility types
**Topics Covered:**
- Readonly<T>
- Pick<T, K>
- Omit<T, K>
- Interface definition

### 2. Array Methods with Types (`array-methods.ts`)
**Concept:** Generic type-safe array wrapper
**Topics Covered:**
- Generic classes
- Generic methods
- Method chaining with types
- push, concat, filter, map

### 3. API Types from Response (`api-types.ts`)
**Concept:** Building types from real API data
**Topics Covered:**
- Interface composition
- Type guards (type predicates)
- Async/await with types
- JSONPlaceholder API integration
- Pick utility type usage

### 4. Fetch with Retry (`fetch-retry.ts`)
**Concept:** Network resilience patterns
**Topics Covered:**
- Async/await error handling
- Exponential backoff
- Generic return types
- Promise utilities

## React Exercises

### 1. Anti-Patterns Clinic (`react-anti-patterns`)
**Concept:** Identifying and refactoring common React anti-patterns  
**Use Case:** Stabilizing large component trees and reducing unnecessary renders  
**Learning Goals:**
- Replace prop drilling with context/custom hooks
- Remove duplicated derived state
- Stabilize callbacks/objects to avoid render storms
- Fix `useEffect` dependency and state-update anti-patterns

### 2. Todo List Mini App (`react-todo-mini-app`)
**Concept:** Core React CRUD flow with modern patterns  
**Use Case:** Everyday productivity app with local state/persistence  
**Learning Goals:**
- Manage todo add/edit/toggle/delete flows
- Persist to `localStorage` and keep UI keyboard-friendly
- Build reusable hooks/reducers for state transitions
- Implement filters (All/Active/Completed) and bulk clear

### 3. Dummy API Mini App (`react-dummy-api`)
**Concept:** API-driven UI with optimistic updates  
**Use Case:** Posts feed backed by a dummy API (e.g., JSONPlaceholder)  
**Learning Goals:**
- Fetch with loading/error/retry states
- Implement client-side search/filter and detail view with comments
- Mock create requests and append data optimistically
- Explore pagination/infinite scroll and simple caching strategies

**Boilerplates:**  
- `src/exercises/react/anti-patterns/boilerplate.html`  
- `src/exercises/react/todo-mini-app/boilerplate.html`  
- `src/exercises/react/dummy-api-app/boilerplate.html`
**Guides:**  
- `src/exercises/react/anti-patterns/README.md`  
- `src/exercises/react/todo-mini-app/README.md`  
- `src/exercises/react/dummy-api-app/README.md`

### HackerRank-style Template
- `src/exercises/react/hackerrank-template` (React 18 + Vite + TS, no UMD)
- Scripts: `npm install`, `npm run dev`, `npm run build`, `npm run preview`
- UI lists the three React exercises and their entry files

## Exercise Difficulty Levels

### Beginner
- Array Sum
- User Validator
- Todo List
- Closure Counter
- Type Conversions (basic)
- Type Coercion (== vs ===)
- Event Delegation

### Intermediate
- Throttle
- Debounce
- Event Loop
- Readonly Types
- Array Methods
- Type Conversions (advanced)
- Run-Length Encoding

### Advanced
- LRU Cache
- API Types
- Fetch with Retry
- Promise Methods (Promise.all, race, allSettled)

## Topics Coverage

### Core JavaScript
- ✅ Array methods
- ✅ Closures
- ✅ Event loop
- ✅ Async/await
- ✅ Promises (all, race, allSettled)
- ✅ Performance patterns (throttle/debounce)
- ✅ Data structures (LRU)
- ✅ Type coercion & conversion
- ✅ Equality operators (== vs ===)
- ✅ String algorithms (RLE)

### TypeScript
- ✅ Interfaces
- ✅ Generics
- ✅ Utility types (Pick, Omit, Readonly)
- ✅ Type guards
- ✅ Type safety with APIs

### DOM API
- ✅ Element creation
- ✅ Event handling
- ✅ DOM manipulation
- ✅ Event delegation

### Patterns & Best Practices
- ✅ Retry logic
- ✅ Error handling
- ✅ Type safety
- ✅ Performance optimization
- ✅ API integration

## Testing Recommendations

Each exercise can be tested:

1. **Manual Testing**: Use the provided solutions to verify implementation
2. **Interactive Testing**: Test in the browser with actual inputs
3. **Unit Testing**: Add test files if needed for automated testing

## Next Steps for Students

1. Start with beginner exercises
2. Read the comments and understand requirements
3. Implement the solution
4. Compare with provided solutions
5. Experiment with variations
6. Move to intermediate/advanced exercises
