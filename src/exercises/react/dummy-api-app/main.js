const { useEffect, useMemo, useState } = React;

const API_URL = 'https://jsonplaceholder.typicode.com';

function DummyApiApp() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/posts?_limit=12`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.warn('Falling back to mock data', err);
      setPosts(mockPosts);
      setError('Using fallback data (API unavailable)');
    } finally {
      setLoading(false);
    }
  }

  async function fetchComments(id) {
    setComments([]);
    try {
      const res = await fetch(`${API_URL}/posts/${id}/comments`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setComments(await res.json());
    } catch {
      setComments(mockComments[id] || []);
    }
  }

  const visible = useMemo(() => {
    const q = query.toLowerCase();
    return posts.filter(p => p.title.toLowerCase().includes(q));
  }, [posts, query]);

  async function handleSelect(post) {
    setSelected(post);
    await fetchComments(post.id);
  }

  async function handleCreate(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get('title').toString();
    const body = form.get('body').toString();
    if (!title.trim()) return;
    const optimistic = { id: crypto.randomUUID(), title, body };
    setPosts(prev => [optimistic, ...prev]);
    e.currentTarget.reset();
    try {
      await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(optimistic)
      });
    } catch {
      // rollback silently in this boilerplate; real app should surface
    }
  }

  return (
    <div style={page}>
      <header style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Dummy API Mini App</h2>
        <input
          placeholder="Search titles..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={search}
        />
        <button onClick={fetchPosts} disabled={loading}>
          {loading ? 'Loading...' : 'Retry'}
        </button>
        {error && <span style={{ color: '#e11d48' }}>{error}</span>}
      </header>

      <section style={grid}>
        <div style={listPane}>
          {visible.map(post => (
            <article
              key={post.id}
              style={card(selected?.id === post.id)}
              onClick={() => handleSelect(post)}
            >
              <h4 style={{ margin: '0 0 6px' }}>{post.title}</h4>
              <p style={{ margin: 0, opacity: 0.8 }}>{post.body}</p>
            </article>
          ))}
        </div>

        <div style={detailPane}>
          <form onSubmit={handleCreate} style={form}>
            <strong>Create Post (mocked)</strong>
            <input name="title" placeholder="Title" required />
            <textarea name="body" placeholder="Body" rows="3"></textarea>
            <button type="submit">Save</button>
          </form>

          {selected ? (
            <>
              <h3>{selected.title}</h3>
              <p>{selected.body}</p>
              <h4>Comments</h4>
              <ul>
                {comments.map(c => (
                  <li key={c.id}>
                    <strong>{c.email}:</strong> {c.body}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Select a post to view details</p>
          )}
        </div>
      </section>
    </div>
  );
}

const mockPosts = Array.from({ length: 6 }).map((_, idx) => ({
  id: `mock-${idx + 1}`,
  title: `Mock post ${idx + 1}`,
  body: 'Offline fallback body.'
}));

const mockComments = {
  'mock-1': [{ id: 'c1', email: 'mock@example.com', body: 'Nice mock!' }]
};

const page = {
  fontFamily: 'Inter, system-ui, sans-serif',
  padding: '20px',
  background: '#f8fafc',
  color: '#0f172a'
};
const search = {
  padding: '8px 10px',
  borderRadius: 8,
  border: '1px solid #cbd5e1',
  flex: 1
};
const grid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
  marginTop: 16
};
const listPane = {
  display: 'grid',
  gap: 10,
  maxHeight: '75vh',
  overflow: 'auto'
};
const detailPane = {
  border: '1px solid #cbd5e1',
  borderRadius: 12,
  padding: 16,
  background: '#fff',
  minHeight: 320
};
const card = active => ({
  border: '1px solid #cbd5e1',
  borderRadius: 10,
  padding: 12,
  background: active ? '#e0f2fe' : '#fff',
  cursor: 'pointer'
});
const form = {
  display: 'grid',
  gap: 8,
  marginBottom: 12
};

const container = document.getElementById('root');
ReactDOM.createRoot(container).render(<DummyApiApp />);
