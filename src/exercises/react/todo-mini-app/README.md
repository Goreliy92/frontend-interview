# React Todo Mini App — HackerRank-style Boilerplate

## Included stack
- React 18 (UMD) + ReactDOM 18 (UMD)
- Babel standalone for JSX/TSX-in-browser editing
- Entry point: `boilerplate.html` loads `main.js`

## Task
Build a modern todo app with:
- Add, toggle, edit, delete
- Filters: All / Active / Done
- Remaining count + clear completed
- Keyboard-friendly (Enter to add, Esc to cancel edit)
- Persist to `localStorage`

Stretch ideas: inline validation, optimistic persistence, extract `useTodos` hook/reducer.

## Getting started (StackBlitz-friendly)
1) Open `boilerplate.html` in StackBlitz (static project) or any local dev server.  
2) Edit `main.js` directly; Babel will transpile in-browser.  
3) Verify persistence via `localStorage` key `react-todos`.  
4) Add tests if desired (none bundled).  
