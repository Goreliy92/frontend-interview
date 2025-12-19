export default function AntiPatterns() {
  return (
    <article className="card">
      <header className="card__header">
        <div>
          <p className="eyebrow">Task</p>
          <h2>Anti-Patterns Clinic</h2>
          <p className="muted">
            Refactor the flawed tree to remove prop drilling, duplicated derived state, render storms, and incorrect effects.
          </p>
        </div>
      </header>
      <ul className="checklist">
        <li>Replace prop drilling with context/custom hooks.</li>
        <li>Remove duplicated derived state (single source of truth).</li>
        <li>Stabilize handlers/objects only after profiling.</li>
        <li>Fix useEffect dependencies; avoid state updates during render.</li>
        <li>Move inline components out of render paths.</li>
        <li>Add a sanity test or two (optional).</li>
      </ul>
      <p className="muted">Implement in: `src/tasks/AntiPatterns.tsx` (and supporting files if needed).</p>
    </article>
  );
}
