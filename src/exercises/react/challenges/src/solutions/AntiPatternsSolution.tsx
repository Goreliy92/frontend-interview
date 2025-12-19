export default function AntiPatternsSolution() {
  return (
    <article className="card">
      <header className="card__header">
        <div>
          <p className="eyebrow">Solution (reference)</p>
          <h2>Anti-Patterns Clinic</h2>
        </div>
      </header>
      <p className="muted">
        A reference implementation would replace prop drilling with React context, remove duplicated derived state, memoize
        callbacks/objects based on profiler data, fix effect dependencies, and move nested components to top-level files.
      </p>
      <ul className="checklist">
        <li>Context for user/theme shared state.</li>
        <li>Derived lists computed via selectors, not useState.</li>
        <li>useCallback/useMemo applied only where render churn measured.</li>
        <li>Effects declare full dependency arrays; no state set during render.</li>
        <li>All components defined at module scope.</li>
      </ul>
    </article>
  );
}
