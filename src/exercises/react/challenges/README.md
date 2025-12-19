# React Interview Challenges

Three React tasks with a real project structure (Vite, React 18, TypeScript). No UMD builds.

## Tasks
- **Anti-Patterns Clinic** — Refactor a flawed tree to remove prop drilling, duplicated derived state, render storms, and effect issues.
- **Todo Mini App** — CRUD todos with filters, remaining count, keyboard UX, and localStorage persistence.
- **Dummy API Mini App** — Consume an API (or mock) with loading/error/retry, search, details + comments, and optimistic create.

## Structure
- `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`
- `src/main.tsx` — bootstraps the app
- `src/App.tsx` — shows tasks and toggles between briefs and reference solutions
- `src/tasks/*` — where you implement each task
- `src/solutions/*` — high-level reference approaches

## Run
1) `npm install`  
2) `npm run dev` (or `npm run build` / `npm run preview`)

## Notes
- Keep implementations self-contained under `src/tasks/`.
- You may swap the API URL in the Dummy API task to a local mock server (e.g., json-server).
- Add tests as needed; none are bundled.
