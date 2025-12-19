import { useMemo } from 'react';

const sections = [
  {
    id: 'anti-patterns',
    title: 'Anti-Patterns Clinic',
    summary: 'Refactor the flawed tree to remove prop drilling, duplicated derived state, render storms, and effect issues.',
    checklist: [
      'Replace prop drilling with context/custom hooks',
      'Remove duplicated derived state (single source of truth)',
      'Stabilize handlers/objects only after profiling',
      'Fix useEffect dependencies; avoid setState during render',
      'Move inline components out of render paths',
      'Add a sanity test or two (optional)'
    ],
    entry: 'src/exercises/react/anti-patterns/main.js'
  },
  {
    id: 'todo',
    title: 'Todo Mini App',
    summary: 'Implement add, edit, toggle, delete, filters, remaining count, clear completed, and keyboard-friendly UX.',
    checklist: [
      'Add/toggle/edit/delete todos',
      'Filters: All / Active / Done',
      'Remaining count + clear completed',
      'Keyboard: Enter to add, Esc to cancel edit',
      'Persist to localStorage (key: react-todos)',
      'Optional: optimistic persistence, inline validation'
    ],
    entry: 'src/exercises/react/todo-mini-app/main.js'
  },
  {
    id: 'dummy-api',
    title: 'Dummy API Mini App',
    summary: 'Consume an API (or local mock) with loading/error/retry, search, details + comments, and optimistic create.',
    checklist: [
      'List posts with loading/error states',
      'Client-side search/filter by title',
      'Select post to view body + comments',
      'Create a post (mock/optimistic) with rollback handling',
      'Handle rate limits/CORS by swapping API_URL to local mock',
      'Optional: pagination or infinite scroll'
    ],
    entry: 'src/exercises/react/dummy-api-app/main.js'
  }
];

export default function App() {
  const cards = useMemo(
    () =>
      sections.map(section => (
        <article key={section.id} className="card">
          <header className="card__header">
            <div>
              <p className="eyebrow">Exercise</p>
              <h2>{section.title}</h2>
              <p className="muted">{section.summary}</p>
            </div>
            <code className="entry">Entry: {section.entry}</code>
          </header>
          <ul className="checklist">
            {section.checklist.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      )),
    []
  );

  return (
    <main className="page">
      <div className="hero">
        <div>
          <p className="eyebrow">React Interview Pack</p>
          <h1>HackerRank-style boilerplate</h1>
          <p className="muted">
            Install deps (`npm install`), run `npm run dev`, and implement the features in each exercise entry.
            Stick to React 18 + Vite; no UMD bundles are used here.
          </p>
        </div>
        <div className="meta">
          <div>Stack: React 18, Vite, TypeScript</div>
          <div>Scripts: npm run dev | build | preview</div>
        </div>
      </div>
      <section className="grid">{cards}</section>
    </main>
  );
}
