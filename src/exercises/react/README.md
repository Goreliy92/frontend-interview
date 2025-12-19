# React Exercises

Hands-on React tasks that focus on anti-patterns and small feature-complete mini apps. Use the Vite/React/TS project under `src/exercises/react/challenges`.

## 1) Anti-Patterns Clinic
Implement in the Vite app: `src/exercises/react/challenges/src/tasks/AntiPatterns.tsx`

### What the starter code should include
- Prop drilling across 3+ levels for simple theme/user data
- Re-render storms from recreating handlers/objects inline
- Derived state stored in `useState` (e.g., duplicated filtered lists)
- Side effects in render or missing dependencies in `useEffect`
- Anonymous components declared inside other components

### Tasks
1. Replace prop drilling with Context (or a custom hook) while keeping explicit typing.
2. Stabilize renders using `useMemo`/`useCallback` only where profiling (React DevTools Profiler or similar) shows benefit.
3. Remove duplicated/derived state; compute from source data instead.
4. Fix effect dependencies and avoid setting state during render.
5. Add basic component tests (e.g., with React Testing Library or your preferred approach) to ensure key screens still render.

### Completion checklist
- [ ] No React warnings about missing dependencies or state updates during render
- [ ] Number of renders for child components is reduced after fixes
- [ ] Shared data no longer relies on multi-level prop drilling

## 2) Todo List Mini App
Implement in the Vite app: `src/exercises/react/challenges/src/tasks/TodoMiniApp.tsx`
Build a classic todo list with modern React patterns.

### Requirements
- Add, toggle complete, edit text, and delete todos
- Persist to `localStorage` (or an in-memory store with a persistence hook)
- Filter by All / Active / Completed
- Display remaining count and clear completed action
- Keyboard-friendly: Enter to add, Esc to cancel edit

### Stretch ideas
- Inline error handling for empty/duplicate titles
- Optimistic UI when persisting
- Extract reusable `useTodos` hook with reducer for actions

## 3) Dummy API Mini App
Implement in the Vite app: `src/exercises/react/challenges/src/tasks/DummyApiApp.tsx`
Prefer a local mock API (e.g., `json-server`) to avoid rate limits. As a fallback, JSONPlaceholder (https://jsonplaceholder.typicode.com/) works for quick trials.

### Requirements
- Fetch and display a list of posts (title + body)
- Show loading and error states with retry
- Client-side search/filter by title
- Click a post to view details and its comments
- Add a new post via form; mock the network call and append to the list optimistically

_Tip:_ If you hit CORS restrictions with public dummy APIs, use your local mock server (e.g., `json-server`) or a lightweight CORS proxy.

### Stretch ideas
- Paginate or infinite-scroll the feed
- Cache responses (simple in-memory map keyed by URL)
- Show optimistic updates with rollback on failure

## How to work on these
1. Navigate to `src/exercises/react/challenges`.
2. `npm install` then `npm run dev` to start the Vite app.
3. Implement tasks in `src/tasks/*`; reference approaches live in `src/solutions/*`.
4. Use TypeScript for props/hooks typing; add tests as you see fit.

## Project structure
```
src/exercises/react/challenges/
  package.json
  tsconfig.json
  vite.config.ts
  index.html
  src/
    main.tsx
    App.tsx
    tasks/
      AntiPatterns.tsx
      TodoMiniApp.tsx
      DummyApiApp.tsx
    solutions/
      AntiPatternsSolution.tsx
      TodoMiniAppSolution.tsx
      DummyApiAppSolution.tsx
```
