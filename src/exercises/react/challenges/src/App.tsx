import AntiPatterns from './tasks/AntiPatterns';
import TodoMiniApp from './tasks/TodoMiniApp';
import DummyApiApp from './tasks/DummyApiApp';
import AntiPatternsSolution from './solutions/AntiPatternsSolution';
import TodoMiniAppSolution from './solutions/TodoMiniAppSolution';
import DummyApiAppSolution from './solutions/DummyApiAppSolution';
import { useState } from 'react';

type View = 'brief' | 'solution';

const tabs = [
  { id: 'anti', label: 'Anti-Patterns Clinic', brief: <AntiPatterns />, solution: <AntiPatternsSolution /> },
  { id: 'todo', label: 'Todo Mini App', brief: <TodoMiniApp />, solution: <TodoMiniAppSolution /> },
  { id: 'api', label: 'Dummy API Mini App', brief: <DummyApiApp />, solution: <DummyApiAppSolution /> }
];

export default function App() {
  const [active, setActive] = useState(tabs[0].id);
  const [view, setView] = useState<View>('brief');

  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">React Interview Challenges</p>
          <h1>Three tasks, one repo</h1>
          <p className="muted">
            Install deps (`npm install`), run `npm run dev`, and build each exercise. Toggle “View” to see a reference solution.
          </p>
        </div>
        <div className="meta">
          <div>Stack: React 18, Vite, TypeScript</div>
          <div>Scripts: npm run dev | build | preview</div>
        </div>
      </header>

      <div className="toolbar">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={active === tab.id ? 'tab active' : 'tab'}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="view-toggle">
          <label>
            <input
              type="radio"
              name="view"
              value="brief"
              checked={view === 'brief'}
              onChange={() => setView('brief')}
            />
            Brief
          </label>
          <label>
            <input
              type="radio"
              name="view"
              value="solution"
              checked={view === 'solution'}
              onChange={() => setView('solution')}
            />
            Solution
          </label>
        </div>
      </div>

      {tabs.map(tab => (
        <section key={tab.id} className={active === tab.id ? 'panel show' : 'panel'}>
          {view === 'brief' ? tab.brief : tab.solution}
        </section>
      ))}
    </main>
  );
}
