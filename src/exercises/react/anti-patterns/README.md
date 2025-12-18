# React Anti-Patterns Clinic — HackerRank-style Boilerplate

## Included stack
- React 18 (UMD) + ReactDOM 18 (UMD)
- Babel standalone for JSX/TSX-in-browser editing
- Entry point: `boilerplate.html` loads `main.js`

## Task
Refactor the intentionally flawed component tree in `main.js` to remove React anti-patterns:
- Replace prop drilling with context/custom hooks.
- Remove duplicated derived state (single source of truth).
- Fix `useEffect` dependencies and avoid state updates during render.
- Stabilize handlers/objects responsibly (profile first).
- Move inline component declarations out of render paths.

## Getting started (StackBlitz-friendly)
1) Open `boilerplate.html` in StackBlitz (static project) or any local dev server.  
2) Edit `main.js` directly; Babel will transpile in-browser.  
3) Use React DevTools Profiler to verify render improvements.  
4) (Optional) Add lightweight tests with your preferred runner; none are bundled here.  
