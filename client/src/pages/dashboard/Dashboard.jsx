export default function Dashboard() {
  return (
    <>
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="mc-label"><i className="fas fa-folder-open" style={{ color: 'var(--blue)' }} /> Projects Analyzed</div>
          <div className="mc-val">12</div>
          <div className="mc-trend up-good">↑ 3 this week</div>
        </div>
        <div className="metric-card">
          <div className="mc-label"><i className="fas fa-bug" style={{ color: 'var(--red)' }} /> Code Smells Found</div>
          <div className="mc-val">148</div>
          <div className="mc-trend up-bad">↑ 22 new smells</div>
        </div>
        <div className="metric-card">
          <div className="mc-label"><i className="fas fa-shield-halved" style={{ color: 'var(--orange)' }} /> Security Issues</div>
          <div className="mc-val">7</div>
          <div className="mc-trend neutral">2 high severity</div>
        </div>
        <div className="metric-card">
          <div className="mc-label"><i className="fas fa-brain" style={{ color: 'var(--purple)' }} /> AI Suggestions</div>
          <div className="mc-val">34</div>
          <div className="mc-trend up-good">↑ 12 applied</div>
        </div>
      </div>

      <div className="dash-row">
        <div className="panel">
          <div className="panel-hd">
            <span className="panel-title"><i className="fas fa-bug" style={{ color: 'var(--red)', marginRight: 6 }} />Smell Distribution</span>
            <span className="tag tag-red">9 types detected</span>
          </div>
          <div className="panel-body">
            {[
              ['Long Method', 'var(--red)', 72, 43],
              ['Deep Nesting', 'var(--purple)', 60, 37],
              ['God Class', 'var(--blue)', 48, 29],
              ['Dead Code', 'var(--orange)', 37, 22],
              ['Magic Numbers', 'var(--green)', 28, 17],
              ['Long Param List', '#e8912d', 20, 12],
              ['Duplicate Code', '#79c0ff', 15, 9],
            ].map(([name, color, width, count]) => (
              <div key={name} className="smell-row">
                <div className="smell-dot" style={{ background: color }} />
                <span className="smell-name">{name}</span>
                <div className="smell-bar"><div className="smell-fill" style={{ width: `${width}%`, background: color }} /></div>
                <span className="smell-ct">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="panel-hd">
            <span className="panel-title"><i className="fas fa-brain" style={{ color: 'var(--purple)', marginRight: 6 }} />AI Recommendations</span>
            <span className="tag tag-purple">Claude-powered</span>
          </div>
          <div className="panel-body">
            <div className="ai-rec">
              <div className="ai-rec-icon" style={{ background: 'var(--blue-bg)', color: 'var(--blue)' }}><i className="fas fa-scissors" /></div>
              <div>
                <div className="ai-rec-title">Extract Method <code style={{ fontSize: 10, color: 'var(--text2)' }}>UserService.java:84</code><span className="tag tag-red">High</span></div>
                <div className="ai-rec-desc">Method exceeds 120 lines. Split into validateUser() and processLogin() for better readability.</div>
              </div>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-icon" style={{ background: 'var(--orange-bg)', color: 'var(--orange)' }}><i className="fas fa-arrows-split-up-and-left" /></div>
              <div>
                <div className="ai-rec-title">Decompose God Class <code style={{ fontSize: 10, color: 'var(--text2)' }}>AppController.py</code><span className="tag tag-orange">Med</span></div>
                <div className="ai-rec-desc">Class has 47 methods. Move data access logic to a dedicated repository layer.</div>
              </div>
            </div>
            <div className="ai-rec">
              <div className="ai-rec-icon" style={{ background: 'var(--green-bg)', color: 'var(--green)' }}><i className="fas fa-rotate" /></div>
              <div>
                <div className="ai-rec-title">Replace Magic Numbers <code style={{ fontSize: 10, color: 'var(--text2)' }}>parser.js:22</code><span className="tag tag-green">Low</span></div>
                <div className="ai-rec-desc">Use named constants like MAX_RETRIES = 3 instead of hardcoded values.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-hd"><span className="panel-title"><i className="fas fa-clock-rotate-left" style={{ color: 'var(--blue)', marginRight: 6 }} />Recent Projects</span></div>
        <div className="panel-body">
          <div className="file-row"><i className="fas fa-folder" style={{ color: 'var(--blue)', fontSize: 15 }} /><span className="file-name">ecommerce_backend/</span><span className="tag tag-blue">Python</span><span className="file-meta">12 smells · 2 security issues</span><div className="status-dot" style={{ background: 'var(--red)' }} /></div>
          <div className="file-row"><i className="fas fa-folder" style={{ color: 'var(--orange)', fontSize: 15 }} /><span className="file-name">react-dashboard/</span><span className="tag tag-orange">JavaScript</span><span className="file-meta">8 smells · callback hell</span><div className="status-dot" style={{ background: 'var(--orange)' }} /></div>
          <div className="file-row"><i className="fas fa-folder" style={{ color: 'var(--green)', fontSize: 15 }} /><span className="file-name">LibrarySystem.java</span><span className="tag tag-green">Java</span><span className="file-meta">5 smells · PMD analyzed</span><div className="status-dot" style={{ background: 'var(--green)' }} /></div>
        </div>
      </div>
    </>
  );
}
