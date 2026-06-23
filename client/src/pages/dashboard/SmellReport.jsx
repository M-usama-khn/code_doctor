import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';

const SMELLS = [
  { id: 'long-method', name: 'Long Method', icon: 'fa-expand-arrows-alt', color: 'var(--red)', count: '43 occurrences · High severity', sev: 'High Severity', sevClass: 'tag-red', desc: 'A method is considered "long" when it exceeds a reasonable line count (typically 20–30 lines). Long methods are harder to understand, test, and maintain.' },
  { id: 'god-class', name: 'God Class', icon: 'fa-crown', color: 'var(--orange)', count: '29 occurrences · Medium severity', sev: 'Medium Severity', sevClass: 'tag-orange', desc: 'A class that knows too much or does too much. It centralizes too many responsibilities violating the Single Responsibility Principle.' },
  { id: 'dead-code', name: 'Dead Code', icon: 'fa-ghost', color: 'var(--text3)', count: '22 occurrences · Low severity', sev: 'Low Severity', sevClass: 'tag-green', desc: 'Code that is never reached or executed. It increases file size, causes confusion, and may hide bugs.' },
  { id: 'deep-nest', name: 'Deep Nesting', icon: 'fa-layer-group', color: 'var(--purple)', count: '37 occurrences · High severity', sev: 'High Severity', sevClass: 'tag-red', desc: 'Excessive nesting (>4 levels) makes code difficult to read and often indicates complex logic that should be decomposed.' },
  { id: 'magic-num', name: 'Magic Numbers', icon: 'fa-hashtag', color: 'var(--green)', count: '17 occurrences · Low severity', sev: 'Low Severity', sevClass: 'tag-green', desc: 'Hardcoded numeric literals with no explanation. Use named constants to make intent clear and changes safe.' },
  { id: 'dup-code', name: 'Duplicate Code', icon: 'fa-copy', color: 'var(--blue)', count: '9 occurrences · Medium severity', sev: 'Medium Severity', sevClass: 'tag-orange', desc: 'Identical or near-identical code blocks appearing in multiple places. Violates DRY principle.' },
  { id: 'long-param', name: 'Long Param List', icon: 'fa-ellipsis-h', color: 'var(--orange)', count: '12 occurrences · Medium severity', sev: 'Medium Severity', sevClass: 'tag-orange', desc: 'Methods with more than 3-4 parameters are hard to call and understand. Use parameter objects instead.' },
  { id: 'switch-smell', name: 'Switch Smell', icon: 'fa-code-branch', color: 'var(--teal)', count: '8 occurrences · Low severity', sev: 'Low Severity', sevClass: 'tag-green', desc: 'Large switch statements spread across the codebase. Often replaced by polymorphism.' },
  { id: 'complex-cond', name: 'Complex Conditionals', icon: 'fa-sitemap', color: 'var(--red)', count: '11 occurrences · High severity', sev: 'High Severity', sevClass: 'tag-red', desc: 'Overly complex if/else conditions. Extract into named boolean methods for readability.' },
];

export default function SmellReport() {
  const [active, setActive] = useState(SMELLS[0]);
  const { showToast } = useToast();

  return (
    <div className="report-grid">
      <div className="smell-list-panel">
        <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Smell Types</div>
        {SMELLS.map(s => (
          <div key={s.id} className={`smell-list-item${active.id === s.id ? ' active' : ''}`} onClick={() => setActive(s)}>
            <div className="sli-name"><i className={`fas ${s.icon}`} style={{ color: s.color, marginRight: 6, fontSize: 11 }} />{s.name}</div>
            <div className="sli-count">{s.count}</div>
          </div>
        ))}
      </div>
      <div className="smell-detail">
        <div className="panel-hd">
          <span className="panel-title"><i className={`fas ${active.icon}`} style={{ color: active.color, marginRight: 6 }} />{active.name}</span>
          <span className={`tag ${active.sevClass}`}>{active.sev}</span>
        </div>
        <div style={{ padding: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 14 }}>{active.desc}</p>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Example — <span style={{ fontFamily: 'var(--mono)', color: 'var(--text2)' }}>UserService.java:84</span></div>
          <div className="code-block">
            <div className="code-line"><span className="line-no">84</span><span className="line-bad">public void processUserData(User user, String token, int retries) {'{'}</span></div>
            <div className="code-line"><span className="line-no">85</span><span>{'    // validate email'}</span></div>
            <div className="code-line"><span className="line-no">91</span><span className="line-comment">{'    // ... 80 more lines ...'}</span></div>
            <div className="code-line"><span className="line-no">172</span><span>{'}'}</span></div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button className="btn btn-blue" type="button" onClick={() => showToast('Applied fix suggestion!', 'green')}><i className="fas fa-check" /> Apply Fix</button>
            <button className="btn" type="button" onClick={() => showToast('Explanation copied', 'blue')}><i className="fas fa-book" /> Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
