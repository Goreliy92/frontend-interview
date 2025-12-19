export default function TodoMiniApp() {
  return (
    <article className="card">
      <header className="card__header">
        <div>
          <p className="eyebrow">Task</p>
          <h2>Todo Mini App</h2>
          <p className="muted">
            Implement add, edit, toggle, delete, filters, remaining count, clear completed, and keyboard-friendly UX.
          </p>
        </div>
      </header>
      <ul className="checklist">
        <li>Add/toggle/edit/delete todos.</li>
        <li>Filters: All / Active / Done.</li>
        <li>Remaining count + clear completed.</li>
        <li>Keyboard: Enter to add, Esc to cancel edit.</li>
        <li>Persist to localStorage (key: react-todos).</li>
        <li>Optional: optimistic persistence, inline validation.</li>
      </ul>
      <p className="muted">Implement in: `src/tasks/TodoMiniApp.tsx` (and supporting files if needed).</p>
    </article>
  );
}
