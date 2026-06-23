import { useNavigate } from 'react-router-dom';

export default function Analysis() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>
        {[
          { emoji: '🐛', title: 'Smell Analysis', desc: '148 smells across 12 projects', tag: 'tag-red', path: '/smells' },
          { emoji: '🛡️', title: 'Security Analysis', desc: '7 vulnerabilities found', tag: 'tag-orange', path: '/security' },
          { emoji: '📊', title: 'Complexity Analysis', desc: 'Avg cognitive score: 14.2', tag: 'tag-blue', path: '/complexity' },
        ].map(item => (
          <div key={item.path} className="panel" style={{ cursor: 'pointer' }} onClick={() => navigate(item.path)}>
            <div className="panel-body" style={{ textAlign: 'center', padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.emoji}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)' }}>{item.desc}</div>
              <span className={`tag ${item.tag}`} style={{ marginTop: 8, display: 'inline-flex' }}>View Report →</span>
            </div>
          </div>
        ))}
      </div>
      <div className="panel">
        <div className="panel-hd"><span className="panel-title">Analyzed Projects</span></div>
        <div style={{ overflow: 'auto' }}>
          <table className="admin-table">
            <thead><tr><th>Project Name</th><th>Language</th><th>Files</th><th>Smells</th><th>Security</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              <tr><td>ecommerce_backend</td><td><span className="tag tag-blue">Python</span></td><td>24</td><td>43</td><td>2</td><td><span className="tag tag-red">Issues</span></td><td>2026-05-10</td></tr>
              <tr><td>react-dashboard</td><td><span className="tag tag-orange">JavaScript</span></td><td>18</td><td>31</td><td>3</td><td><span className="tag tag-orange">Review</span></td><td>2026-05-08</td></tr>
              <tr><td>LibrarySystem</td><td><span className="tag tag-green">Java</span></td><td>9</td><td>18</td><td>1</td><td><span className="tag tag-green">Clean</span></td><td>2026-05-06</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
