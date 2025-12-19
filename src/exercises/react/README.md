# React Exercises

Hands-on React tasks that focus on common anti-patterns and small feature-complete mini apps. These are framework-agnostic and can be completed with plain React (JS or TS) without additional libraries.

## 1) Anti-Patterns Clinic (`react-anti-patterns`)
**Boilerplate:** `src/exercises/react/anti-patterns/boilerplate.html` (open directly or in StackBlitz)  
**Guide:** `src/exercises/react/anti-patterns/README.md`
Refactor a deliberately flawed component tree to remove common React anti-patterns.

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

## 2) Todo List Mini App (`react-todo-mini-app`)
**Boilerplate:** `src/exercises/react/todo-mini-app/boilerplate.html`  
**Guide:** `src/exercises/react/todo-mini-app/README.md`
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

## 3) Dummy API Mini App (`react-dummy-api`)
**Boilerplate:** `src/exercises/react/dummy-api-app/boilerplate.html`  
**Guide:** `src/exercises/react/dummy-api-app/README.md`
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
1. Create components under `src/exercises/react/` using a modern setup like Vite or Next.js. Avoid CRA for new work because it is in maintenance mode and modern alternatives perform better.
2. Keep each exercise self-contained (its own entry point or story).
3. Use TypeScript if you want extra practice with props and hooks typing. For StackBlitz, open any `boilerplate.html` and iterate; each folder includes a README with task details and included libs.

### HackerRank-style Vite template
- Location: `src/exercises/react/hackerrank-template`
- Stack: React 18, Vite, TypeScript (no UMD)
- Scripts: `npm install`, `npm run dev`, `npm run build`, `npm run preview`
- UI: `src/App.tsx` lists exercises and entry points

## Suggested folder layout
```
src/exercises/react/
  ├── anti-patterns/      # Starter components to refactor
  ├── todo-mini-app/      # Todo app components/hooks/tests
  └── dummy-api-app/      # API-driven list/detail UI
```
