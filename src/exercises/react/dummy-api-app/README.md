# React Dummy API Mini App — HackerRank-style Boilerplate

## Included stack
- React 18 (UMD) + ReactDOM 18 (UMD)
- Babel standalone for JSX/TSX-in-browser editing
- Entry point: `boilerplate.html` loads `main.js`

## Task
Consume an API (prefer local mock like `json-server`; JSONPlaceholder as fallback) to:
- List posts with loading/error/retry states
- Search/filter by title
- View details + comments
- Create a post (mocked/optimistic)

Stretch ideas: pagination/infinite scroll, caching responses, optimistic rollback.

## Getting started (StackBlitz-friendly)
1) Open `boilerplate.html` in StackBlitz (static project) or any local dev server.  
2) Edit `main.js` directly; Babel will transpile in-browser.  
3) If CORS/rate limits occur, switch the `API_URL` to your local mock server.  
4) Add tests if desired (none bundled).  
