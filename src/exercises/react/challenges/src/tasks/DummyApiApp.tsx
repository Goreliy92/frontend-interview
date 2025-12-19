export default function DummyApiApp() {
  return (
    <article className="card">
      <header className="card__header">
        <div>
          <p className="eyebrow">Task</p>
          <h2>Dummy API Mini App</h2>
          <p className="muted">
            Consume an API (or local mock) with loading/error/retry, search, details + comments, and optimistic create.
          </p>
        </div>
      </header>
      <ul className="checklist">
        <li>List posts with loading/error states.</li>
        <li>Client-side search/filter by title.</li>
        <li>Select post to view body + comments.</li>
        <li>Create a post (mock/optimistic) with rollback handling.</li>
        <li>Handle rate limits/CORS by swapping API_URL to local mock.</li>
        <li>Optional: pagination or infinite scroll.</li>
      </ul>
      <p className="muted">Implement in: `src/tasks/DummyApiApp.tsx` (and supporting files if needed).</p>
    </article>
  );
}
