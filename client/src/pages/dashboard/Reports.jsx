import { useToast } from '../../contexts/ToastContext';

export default function Reports() {
  const { showToast } = useToast();
  const reports = [
    { name: 'ecommerce_backend — Full Analysis', meta: 'Generated May 10, 2026 · 43 smells · 2 security issues', color: 'var(--red)', bg: 'var(--red-bg)' },
    { name: 'react-dashboard — Full Analysis', meta: 'Generated May 8, 2026 · 31 smells · 3 security issues', color: 'var(--orange)', bg: 'var(--orange-bg)' },
    { name: 'LibrarySystem — Full Analysis', meta: 'Generated May 6, 2026 · 18 smells · 1 security issue', color: 'var(--green)', bg: 'var(--green-bg)' },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button className="btn btn-blue" type="button" onClick={() => showToast('Generating PDF report…', 'blue')}><i className="fas fa-file-pdf" /> Generate PDF</button>
        <button className="btn" type="button" onClick={() => showToast('Analysis summary exported', 'green')}><i className="fas fa-table" /> Export CSV</button>
      </div>
      {reports.map(r => (
        <div key={r.name} className="report-card">
          <div className="report-icon" style={{ background: r.bg, color: r.color }}><i className="fas fa-file-pdf" /></div>
          <div><div className="report-name">{r.name}</div><div className="report-meta">{r.meta}</div></div>
          <div className="report-actions">
            <button className="btn btn-blue" type="button" onClick={() => showToast('Downloading PDF…', 'blue')}><i className="fas fa-download" /> Download</button>
            <button className="btn" type="button" onClick={() => showToast('Report shared', 'green')}><i className="fas fa-share" /></button>
          </div>
        </div>
      ))}
    </>
  );
}
