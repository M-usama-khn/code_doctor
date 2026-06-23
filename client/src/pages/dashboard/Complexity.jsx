export default function Complexity() {
  const items = [
    { score: 32, cls: 'cs-high', name: 'UserService.java · processUserData()', file: 'ecommerce_backend/src/UserService.java:84', width: '90%', color: 'var(--red)', tag: 'tag-red', label: 'Very High' },
    { score: 24, cls: 'cs-high', name: 'AppController.py · handle_request()', file: 'ecommerce_backend/AppController.py:12', width: '70%', color: 'var(--orange)', tag: 'tag-orange', label: 'High' },
    { score: 16, cls: 'cs-med', name: 'api.js · fetchAndProcess()', file: 'react-dashboard/src/api.js:22', width: '48%', color: 'var(--orange)', tag: 'tag-orange', label: 'Medium' },
    { score: 5, cls: 'cs-low', name: 'LibrarySystem.java · searchBook()', file: 'LibrarySystem/src/Library.java:101', width: '18%', color: 'var(--green)', tag: 'tag-green', label: 'Low' },
  ];

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>
        <div className="metric-card"><div className="mc-label"><i className="fas fa-wave-square" style={{ color: 'var(--blue)' }} /> Avg Cognitive Score</div><div className="mc-val">14.2</div><div className="mc-trend neutral">Moderate complexity</div></div>
        <div className="metric-card"><div className="mc-label"><i className="fas fa-layer-group" style={{ color: 'var(--purple)' }} /> Max Nesting Depth</div><div className="mc-val">7</div><div className="mc-trend up-bad">Exceeds threshold of 4</div></div>
        <div className="metric-card"><div className="mc-label"><i className="fas fa-chart-line" style={{ color: 'var(--green)' }} /> Files Analyzed</div><div className="mc-val">51</div><div className="mc-trend up-good">All projects covered</div></div>
      </div>
      {items.map(item => (
        <div key={item.name} className="complexity-item">
          <div className={`complexity-score ${item.cls}`}>{item.score}</div>
          <div className="ci-info"><div className="ci-name">{item.name}</div><div className="ci-file">{item.file}</div></div>
          <div className="ci-bar-wrap"><div className="ci-bar" style={{ width: item.width, background: item.color }} /></div>
          <span className={`tag ${item.tag}`}>{item.label}</span>
        </div>
      ))}
    </>
  );
}
