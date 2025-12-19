export default function DummyApiAppSolution() {
  return (
    <article className="card">
      <header className="card__header">
        <div>
          <p className="eyebrow">Solution (reference)</p>
          <h2>Dummy API Mini App</h2>
        </div>
      </header>
      <p className="muted">
        A reference approach fetches posts with loading/error states, supports client-side search, shows details/comments, and
        posts optimistically with rollback on failure. It uses a configurable API_URL to swap between real and mock servers.
      </p>
      <ul className="checklist">
        <li>Fetch with retry or guarded errors; show loading/error UI.</li>
        <li>Search/filter in-memory.</li>
        <li>Detail view + comments list.</li>
        <li>Optimistic create + rollback.</li>
        <li>Pluggable API_URL for mocks (e.g., json-server).</li>
      </ul>
    </article>
  );
}
