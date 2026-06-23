import { useToast } from '../../contexts/ToastContext';

export default function Admin() {
  const { showToast } = useToast();

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>
        <div className="metric-card"><div className="mc-label"><i className="fas fa-users" style={{ color: 'var(--blue)' }} /> Total Users</div><div className="mc-val">24</div></div>
        <div className="metric-card"><div className="mc-label"><i className="fas fa-chart-bar" style={{ color: 'var(--orange)' }} /> Total Reports</div><div className="mc-val">67</div></div>
        <div className="metric-card"><div className="mc-label"><i className="fas fa-server" style={{ color: 'var(--green)' }} /> System Status</div><div className="mc-val" style={{ fontSize: 14, color: 'var(--green)' }}>Operational</div></div>
      </div>
      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="panel-hd">
          <span className="panel-title"><i className="fas fa-users" style={{ color: 'var(--blue)', marginRight: 6 }} />User Management</span>
          <button className="btn btn-blue" type="button" onClick={() => showToast('Add user form opened', 'blue')}><i className="fas fa-plus" /> Add User</button>
        </div>
        <div style={{ overflow: 'auto' }}>
          <table className="admin-table">
            <thead><tr><th>Name</th><th>SAP ID</th><th>Email</th><th>Role</th><th>Projects</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              <tr><td>Hassan Tahir</td><td><code>45427</code></td><td>hassan@riphah.edu.pk</td><td><span className="tag tag-blue">Developer</span></td><td>3</td><td><span className="tag tag-green">Active</span></td><td><button className="btn" style={{ padding: '3px 8px', fontSize: 11 }} type="button" onClick={() => showToast('Editing Hassan Tahir', 'blue')}><i className="fas fa-edit" /></button></td></tr>
              <tr><td>Ch Abdulrehman</td><td><code>47848</code></td><td>abdulrehman@riphah.edu.pk</td><td><span className="tag tag-blue">Developer</span></td><td>5</td><td><span className="tag tag-green">Active</span></td><td><button className="btn" style={{ padding: '3px 8px', fontSize: 11 }} type="button" onClick={() => showToast('Editing Abdulrehman', 'blue')}><i className="fas fa-edit" /></button></td></tr>
              <tr><td>Ch Umar Abbas</td><td><code>47074</code></td><td>umar@riphah.edu.pk</td><td><span className="tag tag-blue">Developer</span></td><td>4</td><td><span className="tag tag-green">Active</span></td><td><button className="btn" style={{ padding: '3px 8px', fontSize: 11 }} type="button" onClick={() => showToast('Editing Umar Abbas', 'blue')}><i className="fas fa-edit" /></button></td></tr>
              <tr><td>Dr Muhammad Fawad</td><td><code>SUP01</code></td><td>fawad@riphah.edu.pk</td><td><span className="tag tag-purple">Supervisor</span></td><td>—</td><td><span className="tag tag-green">Active</span></td><td><button className="btn" style={{ padding: '3px 8px', fontSize: 11 }} type="button" onClick={() => showToast('Editing Dr Fawad', 'blue')}><i className="fas fa-edit" /></button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
