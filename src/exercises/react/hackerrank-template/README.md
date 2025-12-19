# React Interview Challenges (HackerRank-style)

## What’s included
- React 18 + ReactDOM (ESM) with Vite
- TypeScript + JSX (no UMD bundles)
- Dev scripts: `npm install`, `npm run dev`, `npm run build`, `npm run preview`
- Entry UI: `src/App.tsx` lists the three exercises and their entry files

## Exercises and entry points
- Anti-Patterns Clinic → `src/exercises/react/anti-patterns/main.js`
- Todo Mini App → `src/exercises/react/todo-mini-app/main.js`
- Dummy API Mini App → `src/exercises/react/dummy-api-app/main.js`

Each entry is already in this repository; wire them into this app or recreate them inside `src/` as needed.

## How to use (StackBlitz/local)
1. Open this folder in StackBlitz (Node/Vite project) or locally.  
2. Run `npm install` then `npm run dev`.  
3. Implement the features described in `src/App.tsx` for each exercise entry.  
4. Add tests if desired (none are bundled).  

## Notes
- Keep solutions self-contained under `src/`.  
- Prefer a11y-friendly components and loading/error states where applicable.  
- Feel free to swap the API URL in the Dummy API exercise to a local mock server.  
