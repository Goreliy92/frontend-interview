const { useEffect, useReducer, useRef } = React;

const initialState = {
  items: [
    { id: '1', text: 'Try StackBlitz', done: false },
    { id: '2', text: 'Wire filters', done: true }
  ],
  filter: 'all'
};

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      if (!action.text.trim()) return state;
      const next = { id: crypto.randomUUID(), text: action.text.trim(), done: false };
      return { ...state, items: [...state.items, next] };
    }
    case 'toggle':
      return {
        ...state,
        items: state.items.map(item => (item.id === action.id ? { ...item, done: !item.done } : item))
      };
    case 'remove':
      return { ...state, items: state.items.filter(item => item.id !== action.id) };
    case 'edit':
      return {
        ...state,
        items: state.items.map(item => (item.id === action.id ? { ...item, text: action.text } : item))
      };
    case 'filter':
      return { ...state, filter: action.filter };
    case 'clearDone':
      return { ...state, items: state.items.filter(item => !item.done) };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState, initFromStorage);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('react-todos', JSON.stringify(state));
  }, [state]);

  const filtered = state.items.filter(item =>
    state.filter === 'all' ? true : state.filter === 'active' ? !item.done : item.done
  );

  return (
    <div style={layout}>
      <header style={{ display: 'flex', gap: 8 }}>
        <input
          ref={inputRef}
          style={input}
          placeholder="Add todo and press Enter"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              dispatch({ type: 'add', text: e.currentTarget.value });
              e.currentTarget.value = '';
            }
            if (e.key === 'Escape') {
              e.currentTarget.value = '';
            }
          }}
        />
        <button
          onClick={() => {
            dispatch({ type: 'add', text: inputRef.current?.value || '' });
            if (inputRef.current) inputRef.current.value = '';
          }}
        >
          Add
        </button>
      </header>

      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
        {['all', 'active', 'done'].map(key => (
          <button
            key={key}
            onClick={() => dispatch({ type: 'filter', filter: key })}
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              border: '1px solid #cbd5e1',
              background: state.filter === key ? '#0ea5e9' : '#e2e8f0',
              color: state.filter === key ? '#fff' : '#0f172a'
            }}
          >
            {key}
          </button>
        ))}
        <button onClick={() => dispatch({ type: 'clearDone' })}>Clear completed</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
        {filtered.map(item => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #e2e8f0'
            }}
          >
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => dispatch({ type: 'toggle', id: item.id })}
            />
            <input
              defaultValue={item.text}
              style={{ flex: 1, padding: '6px 8px', borderRadius: 6, border: '1px solid #cbd5e1' }}
              onBlur={e => dispatch({ type: 'edit', id: item.id, text: e.currentTarget.value })}
              onKeyDown={e => {
                if (e.key === 'Enter') e.currentTarget.blur();
                if (e.key === 'Escape') e.currentTarget.value = item.text;
              }}
            />
            <button onClick={() => dispatch({ type: 'remove', id: item.id })}>✕</button>
          </li>
        ))}
      </ul>

      <footer style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
        <span>{state.items.filter(i => !i.done).length} remaining</span>
        <span>LocalStorage key: react-todos</span>
      </footer>
    </div>
  );
}

function initFromStorage() {
  try {
    const raw = localStorage.getItem('react-todos');
    return raw ? JSON.parse(raw) : initialState;
  } catch {
    return initialState;
  }
}

const layout = {
  maxWidth: 640,
  margin: '0 auto',
  padding: '24px',
  fontFamily: 'Inter, system-ui, sans-serif',
  color: '#0f172a'
};

const input = {
  flex: 1,
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid #cbd5e1'
};

const container = document.getElementById('root');
ReactDOM.createRoot(container).render(<TodoApp />);
