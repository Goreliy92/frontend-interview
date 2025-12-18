const { useEffect, useMemo, useState } = React;

/**
 * Intentional anti-patterns to refactor:
 * - Prop drilling theme/user down multiple levels
 * - Derived state duplicated in local state
 * - Inline object/handler recreation causing render storms
 * - Effect missing dependencies
 * - Components declared inside render
 */

const initialUser = {
  name: 'Alex',
  theme: 'light',
  todos: ['Ship React exercise', 'Refactor anti-patterns', 'Add tests']
};

function AntiPatternApp() {
  const [user, setUser] = useState(initialUser);
  const [filter, setFilter] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState(
    user.todos.filter(todo => todo.length > 0) // duplicated derived state
  );

  // Missing dependencies on purpose; will not update when user changes
  useEffect(() => {
    setFilteredTodos(user.todos.filter(todo => (filter === 'all' ? true : todo.includes(filter))));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const themeStyles = useMemo(
    () => ({
      background: user.theme === 'light' ? '#f8fafc' : '#0f172a',
      color: user.theme === 'light' ? '#0f172a' : '#e2e8f0',
      minHeight: '100vh',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '24px'
    }),
    [user] // recalculates on every user change (render churn risk)
  );

  // Inline toggle recreates on every render
  const toggleTheme = () =>
    setUser(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));

  const addTodo = () => {
    const next = prompt('Add todo'); // simple, intentionally imperative
    if (next) {
      setUser(prev => ({ ...prev, todos: [...prev.todos, next] }));
    }
  };

  return (
    <div style={themeStyles}>
      <Header user={user} theme={user.theme} onToggleTheme={toggleTheme} />
      <Filters filter={filter} setFilter={setFilter} />
      <TodoList todos={filteredTodos} theme={user.theme} onAdd={addTodo} />
      <DebugPanel user={user} />
    </div>
  );
}

function Header({ user, theme, onToggleTheme }) {
  return (
    <header style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
      <h2 style={{ margin: 0 }}>Anti-Patterns Clinic</h2>
      <span style={{ opacity: 0.7 }}>User: {user.name}</span>
      <button onClick={onToggleTheme}>Toggle theme (currently {theme})</button>
    </header>
  );
}

function Filters({ filter, setFilter }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      {['all', 'Ship', 'Refactor'].map(key => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: filter === key ? '#0ea5e9' : '#e2e8f0',
            color: filter === key ? '#fff' : '#0f172a'
          }}
        >
          {key}
        </button>
      ))}
    </div>
  );
}

function TodoList({ todos, theme, onAdd }) {
  return (
    <section
      style={{
        border: '1px solid #cbd5e1',
        borderRadius: 10,
        padding: 16,
        background: theme === 'light' ? '#fff' : '#1e293b'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>Todos (derived, refactor to single source of truth)</h3>
        <button onClick={onAdd}>Add</button>
      </div>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {todos.map((todo, idx) => (
          <li key={`${todo}-${idx}`} style={{ marginBottom: 6 }}>
            {todo}
          </li>
        ))}
      </ul>
    </section>
  );
}

function DebugPanel({ user }) {
  const inlineObject = { timestamp: Date.now() }; // recreated every render
  return (
    <pre
      style={{
        marginTop: 16,
        padding: 12,
        borderRadius: 8,
        border: '1px dashed #94a3b8',
        background: '#0b1120',
        color: '#e2e8f0'
      }}
    >
      {/* Storing derived data instead of computing on the fly */}
      {JSON.stringify({ user, inlineObject }, null, 2)}
    </pre>
  );
}

const container = document.getElementById('root');
ReactDOM.createRoot(container).render(<AntiPatternApp />);
