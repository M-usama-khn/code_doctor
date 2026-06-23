import { useToast } from '../../contexts/ToastContext';

export default function Security() {
  const { showToast } = useToast();

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>
        <div className="metric-card"><div className="mc-label"><i className="fas fa-triangle-exclamation" style={{ color: 'var(--red)' }} /> High Risk</div><div className="mc-val" style={{ color: 'var(--red)' }}>2</div></div>
        <div className="metric-card"><div className="mc-label"><i className="fas fa-circle-exclamation" style={{ color: 'var(--orange)' }} /> Medium Risk</div><div className="mc-val" style={{ color: 'var(--orange)' }}>3</div></div>
        <div className="metric-card"><div className="mc-label"><i className="fas fa-circle-info" style={{ color: 'var(--green)' }} /> Low Risk</div><div className="mc-val" style={{ color: 'var(--green)' }}>2</div></div>
      </div>

      <div className="sec-item">
        <div className="sec-hd">
          <div className="sec-icon" style={{ background: 'var(--red-bg)', color: 'var(--red)' }}><i className="fas fa-triangle-exclamation" /></div>
          <div><div className="sec-title">Empty Except Block Detected <span className="tag tag-red">High</span></div><div className="sec-file">ecommerce_backend/auth.py · Line 47</div></div>
        </div>
        <div className="sec-desc">An except block with no body silently ignores exceptions, hiding runtime errors and making debugging very difficult.</div>
        <div className="code-block">
          <div className="code-line"><span className="line-no">47</span><span className="line-bad">except:</span></div>
          <div className="code-line"><span className="line-no">48</span><span className="line-bad">    pass  # ← empty block!</span></div>
        </div>
        <div className="sec-actions">
          <button className="btn btn-red" type="button" onClick={() => showToast('Issue flagged for review', 'red')}><i className="fas fa-flag" /> Flag</button>
          <button className="btn btn-blue" type="button" onClick={() => showToast('Fix applied!', 'green')}><i className="fas fa-wrench" /> Auto-Fix</button>
        </div>
      </div>

      <div className="sec-item">
        <div className="sec-hd">
          <div className="sec-icon" style={{ background: 'var(--orange-bg)', color: 'var(--orange)' }}><i className="fas fa-xmark-circle" /></div>
          <div><div className="sec-title">Exception Swallowing <span className="tag tag-orange">Medium</span></div><div className="sec-file">react-dashboard/api.js · Line 112</div></div>
        </div>
        <div className="sec-desc">Exception is caught but not handled or logged, hiding failures from the system.</div>
        <div className="sec-actions">
          <button className="btn btn-red" type="button" onClick={() => showToast('Issue flagged', 'red')}><i className="fas fa-flag" /> Flag</button>
          <button className="btn btn-blue" type="button" onClick={() => showToast('Fix applied!', 'green')}><i className="fas fa-wrench" /> Auto-Fix</button>
        </div>
      </div>
    </>
  );
}
