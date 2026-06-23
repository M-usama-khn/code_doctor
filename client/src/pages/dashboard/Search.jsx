import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';

const RESULTS = [
  { title: 'ecommerce_backend/', meta: 'Python · Analyzed May 10, 2026 · 43 smells found', tags: [['Long Method ×12', 'tag-red'], ['Dead Code ×8', 'tag-orange'], ['God Class ×5', 'tag-blue']] },
  { title: 'react-dashboard/', meta: 'JavaScript · Analyzed May 8, 2026 · 31 smells found', tags: [['Callback Hell ×4', 'tag-purple'], ['Broken Promise ×3', 'tag-orange']] },
  { title: 'LibrarySystem.java', meta: 'Java · Analyzed May 6, 2026 · 18 smells found', tags: [['Magic Numbers ×6', 'tag-green'], ['Deep Nesting ×4', 'tag-blue']] },
];

export default function Search() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const { showToast } = useToast();

  const filtered = RESULTS.filter(r => {
    const matchQuery = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.meta.toLowerCase().includes(query.toLowerCase());
    const matchFilter = filter === 'all' || r.meta.toLowerCase().includes(filter);
    return matchQuery && matchFilter;
  });

  return (
    <>
      <input className="search-big" placeholder="Search projects, smell types, file names…" value={query} onChange={e => setQuery(e.target.value)} />
      <div className="filter-row">
        {['all', 'python', 'javascript', 'java', 'security', 'smell'].map(f => (
          <button key={f} type="button" className={`filter-btn${filter === f ? ' active' : ''}`} onClick={() => { setFilter(f); showToast('Filtering by: ' + f, 'blue'); }}>
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div>
        {filtered.map(r => (
          <div key={r.title} className="search-result" onClick={() => showToast('Opening ' + r.title + ' analysis…', 'blue')}>
            <div className="sr-title">{r.title}</div>
            <div className="sr-meta">{r.meta}</div>
            <div className="sr-tags">{r.tags.map(([label, cls]) => <span key={label} className={`tag ${cls}`}>{label}</span>)}</div>
          </div>
        ))}
      </div>
    </>
  );
}
