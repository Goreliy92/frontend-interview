# React Exercises

Hands-on React tasks that focus on common anti-patterns and small feature-complete mini apps. These are framework-agnostic and can be completed with plain React (JS or TS) without additional libraries.

## 1) Anti-Patterns Clinic (`react-anti-patterns`)
Refactor a deliberately flawed component tree to remove common React anti-patterns.

### What the starter code should include
- Prop drilling across 3+ levels for simple theme/user data
- Re-render storms from recreating handlers/objects inline
- Derived state stored in `useState` (e.g., duplicated filtered lists)
- Side effects in render or missing dependencies in `useEffect`
- Anonymous components declared inside other components

### Tasks
1. Replace prop drilling with Context (or a custom hook) while keeping explicit typing.
2. Stabilize renders using `useMemo`/`useCallback` only where profiling shows benefit.
3. Remove duplicated/derived state; compute from source data instead.
4. Fix effect dependencies and avoid setting state during render.
5. Add basic component tests (e.g., with React Testing Library or your preferred approach) to ensure key screens still render.

### Completion checklist
- [ ] No React warnings about missing dependencies or state updates during render
- [ ] Number of renders for child components is reduced after fixes
- [ ] Shared data no longer relies on multi-level prop drilling

## 2) Todo List Mini App (`react-todo-mini-app`)
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
Consume a dummy API (e.g., https://jsonplaceholder.typicode.com/) to render data with proper loading/error states.

### Requirements
- Fetch and display a list of posts (title + body)
- Show loading and error states with retry
- Client-side search/filter by title
- Click a post to view details and its comments
- Add a new post via form; mock the network call and append to the list optimistically

### Stretch ideas
- Paginate or infinite-scroll the feed
- Cache responses (simple in-memory map keyed by URL)
- Show optimistic updates with rollback on failure

## How to work on these
1. Create components under `src/exercises/react/` using a modern setup like Vite or Next.js (CRA is no longer recommended).
2. Keep each exercise self-contained (its own entry point or story).
3. Use TypeScript if you want extra practice with props and hooks typing.

## Suggested folder layout
```
src/exercises/react/
  ├── anti-patterns/      # Starter components to refactor
  ├── todo-mini-app/      # Todo app components/hooks/tests
  └── dummy-api-app/      # API-driven list/detail UI
```
