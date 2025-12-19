export default function TodoMiniAppSolution() {
  return (
    <article className="card">
      <header className="card__header">
        <div>
          <p className="eyebrow">Solution (reference)</p>
          <h2>Todo Mini App</h2>
        </div>
      </header>
      <p className="muted">
        A solution typically uses a reducer or custom hook for actions (add/edit/toggle/delete), localStorage persistence, filters,
        keyboard shortcuts, and inline validation for empty titles.
      </p>
      <ul className="checklist">
        <li>Reducer-driven state with action types.</li>
        <li>localStorage sync + hydration.</li>
        <li>Filters + derived counts.</li>
        <li>Accessible inputs with keyboard support.</li>
        <li>Optimistic updates and revert on failure (optional).</li>
      </ul>
    </article>
  );
}
