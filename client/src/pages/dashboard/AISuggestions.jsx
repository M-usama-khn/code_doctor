import { useToast } from '../../contexts/ToastContext';

export default function AISuggestions() {
  const { showToast } = useToast();

  return (
    <>
      <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, fontSize: 13, color: 'var(--text2)' }}>AI-powered refactoring suggestions based on static analysis</div>
        <button className="btn btn-blue" type="button" onClick={() => showToast('Regenerating AI suggestions…', 'blue')}><i className="fas fa-rotate" /> Refresh</button>
      </div>

      <div className="ai-page-card">
        <div className="ai-card-hd">
          <div className="ai-card-avatar" style={{ background: 'var(--blue-bg)', color: 'var(--blue)' }}><i className="fas fa-scissors" /></div>
          <div className="ai-card-meta">
            <div className="ai-card-name">Extract Method Refactoring <span className="tag tag-red">High Priority</span></div>
            <div className="ai-card-loc">UserService.java · processUserData() · 88 lines</div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>This method handles validation, email dispatch, and DB persistence in one block. Splitting into 3 focused methods will reduce cognitive load from 32 → 8.</p>
        <div className="diff-block">
          <div className="diff-hd">UserService.java</div>
          <div className="diff-line diff-del">- public void processUserData(User u, String t, int r) {'{ /* 88 lines */ }'}</div>
          <div className="diff-line diff-add">+ private void validateUser(User u) {'{ ... }'}</div>
          <div className="diff-line diff-add">+ public void processUserData(User u, String t, int r) {'{ validateUser(u); ... }'}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-blue" type="button" onClick={() => showToast('Refactoring applied!', 'green')}><i className="fas fa-check" /> Apply</button>
          <button className="btn" type="button" onClick={() => showToast('Dismissed', 'red')}><i className="fas fa-xmark" /> Dismiss</button>
        </div>
      </div>

      <div className="ai-page-card">
        <div className="ai-card-hd">
          <div className="ai-card-avatar" style={{ background: 'var(--orange-bg)', color: 'var(--orange)' }}><i className="fas fa-arrows-split-up-and-left" /></div>
          <div className="ai-card-meta">
            <div className="ai-card-name">Replace Magic Numbers <span className="tag tag-orange">Medium Priority</span></div>
            <div className="ai-card-loc">parser.js · Line 22, 47, 88</div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>3 hardcoded numeric values detected. Replacing with named constants improves readability.</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-blue" type="button" onClick={() => showToast('Constants applied!', 'green')}><i className="fas fa-check" /> Apply</button>
          <button className="btn" type="button" onClick={() => showToast('Dismissed', 'red')}><i className="fas fa-xmark" /> Dismiss</button>
        </div>
      </div>
    </>
  );
}
