import React, { useState } from 'react';
import { useStore } from '../store.jsx';
import { Icon, Avatar, Badge, Status, Progress, Tabs, Card, Stat, Empty, FormModal, Modal, Donut, BarChart, SearchBox, Stars } from '../ui/index.jsx';
import { CHART } from '../data.js';

export function Dashboard() {
  const { data } = useStore();
  const pend = data.hrAppr.filter(a => a.status === 'Submitted').length;
  const missing = data.hrAppr.filter(a => !a.submitted).length;
  const pendingLeave = data.leaves.filter(l => l.hr === 'Pending').length;
  return (
    <div className="page">
      <section className="hero"><div><span className="eyebrow">People operations</span><h2>Good morning, Rohit</h2><p>{pend} appraisals await your review and {missing} self-appraisals are still missing for this cycle.</p></div>
        <div className="hero-stats"><div><b>{data.team.length}</b><span>People</span></div><div><b>{pend}</b><span>To review</span></div><div><b>{data.openings.reduce((a, o) => a + o.openings, 0)}</b><span>Open roles</span></div></div></section>
      <div className="grid g4">
        <Stat icon="award" tone="warn" label="Appraisals to review" value={pend} /><Stat icon="alert" tone="bad" label="Not submitted" value={missing} />
        <Stat icon="calendar" tone="info" label="Leave approvals" value={pendingLeave} /><Stat icon="briefcase" tone="ok" label="Active candidates" value={data.candidates.length} />
      </div>
      <div className="grid g2">
        <Card title="Monthly submission status" sub="Jun 2025"><div className="center"><Donut center={`${data.hrAppr.filter(a => a.cycle === 'Monthly' && a.submitted).length}/${data.hrAppr.filter(a => a.cycle === 'Monthly').length}`} sub="submitted" segs={[{ value: data.hrAppr.filter(a => a.cycle === 'Monthly' && a.submitted).length, color: 'var(--c2)' }, { value: data.hrAppr.filter(a => a.cycle === 'Monthly' && !a.submitted).length, color: 'var(--c4)' }]} /></div></Card>
        <Card title="Headcount by department"><BarChart labels={CHART.depts} max={30} series={[{ name: 'Headcount', data: [24, 9, 6, 14, 8] }]} /></Card>
      </div>
    </div>
  );
}

export function Employees() {
  const { data, add, del, notify } = useStore();
  const [q, setQ] = useState(''); const [open, setOpen] = useState(false);
  const list = data.team.filter(t => (t.name + t.title + t.dept).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="page">
      <div className="toolbar"><SearchBox value={q} onChange={setQ} placeholder="Search employees" /><span className="grow" /><button className="btn pri" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Onboard employee</button></div>
      <Card pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Employee</th><th>Department</th><th>Grade</th><th>Type</th><th>Status</th><th /></tr></thead>
        <tbody>{list.map(t => <tr key={t.id}><td><div className="who"><Avatar name={t.name} /><div><b>{t.name}</b><small>{t.email}</small></div></div></td><td>{t.dept}</td><td>{t.grade}</td><td>{t.type}</td><td><Status value={t.status} /></td>
          <td className="right"><button className="btn sm" onClick={() => { del('team', t.id); notify(t.name + ' removed'); }}><Icon name="trash" size={14} /></button></td></tr>)}</tbody></table>{!list.length && <Empty text="No matching employees." />}</div></Card>
      {open && <FormModal title="Onboard employee" submitLabel="Onboard" onClose={() => setOpen(false)}
        fields={[{ name: 'name', label: 'Full name', required: true }, { name: 'title', label: 'Title', required: true }, { name: 'dept', label: 'Department', type: 'select', options: ['Engineering', 'Design', 'People', 'Sales', 'Analytics'] }, { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'grade', label: 'Grade' }, { name: 'type', label: 'Type', type: 'select', options: ['Full-time', 'Contract'] }]}
        onSubmit={v => { add('team', { ...v, rating: 0, status: 'Active' }); notify('Employee onboarded'); }} />}
    </div>
  );
}

export function LeaveApprovals() {
  const { data, patch, notify } = useStore();
  const pend = data.leaves.filter(l => l.hr === 'Pending');
  const act = (l, hr) => { patch('leaves', l.id, { hr, overall: hr === 'Approved' && l.manager === 'Approved' ? 'Approved' : hr === 'Rejected' ? 'Rejected' : l.overall }); notify('Leave ' + hr.toLowerCase()); };
  return (
    <div className="page"><div className="grid g3"><Stat icon="clock" tone="warn" label="Awaiting HR" value={pend.length} /><Stat icon="check" tone="ok" label="Approved" value={data.leaves.filter(l => l.hr === 'Approved').length} /><Stat icon="x" tone="bad" label="Rejected" value={data.leaves.filter(l => l.hr === 'Rejected').length} /></div>
      <Card title="Leave & WFH requests" pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Type</th><th>Dates</th><th>Days</th><th>Manager</th><th>HR</th><th /></tr></thead>
        <tbody>{data.leaves.map(l => <tr key={l.id}><td><b>{l.type}</b></td><td>{l.from} → {l.to}</td><td>{l.days}</td><td><Status value={l.manager} /></td><td><Status value={l.hr} /></td>
          <td className="right">{l.hr === 'Pending' && <span className="chips" style={{ justifyContent: 'flex-end' }}><button className="btn sm pri" onClick={() => act(l, 'Approved')}>Approve</button><button className="btn sm" onClick={() => act(l, 'Rejected')}>Reject</button></span>}</td></tr>)}</tbody></table></div></Card></div>
  );
}

export function Appraisals() {
  const { data, patch, notify } = useStore();
  const [cycle, setCycle] = useState('Monthly'); const [sel, setSel] = useState(null);
  const rows = data.hrAppr.filter(a => a.cycle === cycle);
  const live = sel && data.hrAppr.find(a => a.id === sel);
  const annual = cycle === 'Annual';
  return (
    <div className="page">
      <div className="grid g4">
        <Stat icon="users" label="Employees" value={rows.length} /><Stat icon="check" tone="ok" label="Submitted" value={rows.filter(r => r.submitted).length} />
        <Stat icon="alert" tone="bad" label="Not submitted" value={rows.filter(r => !r.submitted).length} /><Stat icon="award" tone="info" label="HR reviewed" value={rows.filter(r => r.hrRating > 0).length} />
      </div>
      <div className="toolbar"><Tabs tabs={['Monthly', 'Quarterly', 'Annual']} value={cycle} onChange={setCycle} />
        <span className="grow" /><Badge tone="info">{annual ? 'Final audit, hike and release' : 'Review & remarks only, no hike'}</Badge></div>
      <Card pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Employee</th><th>Period</th><th>Self</th><th>Manager</th><th>HR</th>{annual && <th>Hike</th>}<th>Status</th><th /></tr></thead>
        <tbody>{rows.map(r => <tr key={r.id}><td><div className="who"><Avatar name={r.emp} /><div><b>{r.emp}</b><small>{r.dept}</small></div></div></td><td>{r.period}</td>
          <td>{r.submitted ? <Stars value={r.self} /> : '—'}</td><td>{r.submitted ? <Stars value={r.manager} /> : '—'}</td><td>{r.hrRating ? <Stars value={r.hrRating} /> : '—'}</td>
          {annual && <td>{r.hike ? r.hike + '%' : '—'}</td>}<td><Status value={r.status} /></td>
          <td className="right">{r.submitted ? <button className="btn sm" onClick={() => setSel(r.id)}>{r.released ? 'View' : r.hrRating ? 'Edit review' : 'Review'}</button> : <button className="btn sm" onClick={() => notify('Reminder sent to ' + r.emp)}><Icon name="bell" size={14} />Remind</button>}</td></tr>)}</tbody></table></div></Card>
      {live && <Review a={live} onClose={() => setSel(null)} patch={patch} notify={notify} />}
    </div>
  );
}

function Review({ a, onClose, patch, notify }) {
  const [rating, setRating] = useState(a.hrRating || 4); const [remark, setRemark] = useState(a.hrRemark || ''); const [hike, setHike] = useState(a.hike || 0);
  const annual = a.cycle === 'Annual';
  const save = release => {
    patch('hrAppr', a.id, { hrRating: Number(rating), hrRemark: remark, ...(annual ? { hike: Number(hike), released: release, status: release ? 'Released' : 'Audited' } : { status: 'Reviewed' }) });
    notify(release ? 'Result released to employee' : 'Review saved'); onClose();
  };
  return (
    <Modal title={`${a.emp} · ${a.period}`} onClose={onClose}>
      <div className="grid g3"><Stat label="Self" value={a.self.toFixed(1)} /><Stat label="Manager" value={a.manager.toFixed(1)} /><Stat label="Suggested" value={((a.self + a.manager) / 2).toFixed(1)} /></div>
      <div className="form" style={{ marginTop: 16 }}>
        <label className="field"><span>HR rating (1–5)</span><input className="input" type="number" min="1" max="5" step="0.1" value={rating} disabled={a.released} onChange={e => setRating(e.target.value)} /></label>
        {annual && <label className="field"><span>Hike %</span><input className="input" type="number" min="0" max="50" value={hike} disabled={a.released} onChange={e => setHike(e.target.value)} /></label>}
        <label className="field full"><span>HR remark</span><textarea className="input" rows={4} value={remark} disabled={a.released} onChange={e => setRemark(e.target.value)} placeholder="Add your review remark" /></label>
        {!a.released && <div className="form-actions"><button className="btn ghost" onClick={onClose}>Cancel</button><button className="btn" onClick={() => save(false)}>Save review</button>{annual && <button className="btn pri" onClick={() => save(true)}>Release result</button>}</div>}
      </div>
    </Modal>
  );
}

export function Recruitment() {
  const { data, add, patch, notify } = useStore();
  const [open, setOpen] = useState(false);
  const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];
  const move = (c, d) => { const i = stages.indexOf(c.stage) + d; if (i >= 0 && i < stages.length) { patch('candidates', c.id, { stage: stages[i] }); notify(c.name + ' → ' + stages[i]); } };
  return (
    <div className="page">
      <div className="toolbar"><h3>Openings</h3><span className="grow" /><button className="btn pri" onClick={() => setOpen(true)}><Icon name="plus" size={16} />New opening</button></div>
      <Card pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Role</th><th>Department</th><th>Location</th><th>Positions</th><th>Status</th></tr></thead>
        <tbody>{data.openings.map(o => <tr key={o.id}><td><b>{o.role}</b></td><td>{o.dept}</td><td>{o.location}</td><td>{o.openings}</td><td><Status value={o.status} /></td></tr>)}</tbody></table></div></Card>
      <h3>Candidate pipeline</h3>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(5, minmax(0,1fr))' }}>{stages.map(s => <Card key={s} title={s} sub={data.candidates.filter(c => c.stage === s).length + ' candidates'}>
        <ul className="list">{data.candidates.filter(c => c.stage === s).map(c => <li key={c.id} className="col"><b>{c.name}</b><small>{c.role} · {c.exp}</small>
          <span className="chips"><button className="btn sm" disabled={s === stages[0]} onClick={() => move(c, -1)}><Icon name="chevL" size={14} /></button><button className="btn sm" disabled={s === 'Hired'} onClick={() => move(c, 1)}><Icon name="chevR" size={14} /></button></span></li>)}</ul></Card>)}</div>
      {open && <FormModal title="New opening" submitLabel="Create" onClose={() => setOpen(false)}
        fields={[{ name: 'role', label: 'Role', required: true }, { name: 'dept', label: 'Department', type: 'select', options: ['Engineering', 'Design', 'People', 'Sales', 'Analytics'] }, { name: 'location', label: 'Location' }, { name: 'openings', label: 'Positions', type: 'number' }]}
        onSubmit={v => { add('openings', { ...v, status: 'Open' }); notify('Opening created'); }} />}
    </div>
  );
}

export function Policies() {
  const { data, add, notify } = useStore(); const [open, setOpen] = useState(false);
  return (
    <div className="page"><div className="toolbar"><span className="grow" /><button className="btn pri" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Publish policy</button></div>
      <Card pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Policy</th><th>Version</th><th>Acknowledged</th><th /></tr></thead>
        <tbody>{data.policyAck.map(p => <tr key={p.id}><td><b>{p.title}</b></td><td>{p.version}</td><td><div className="prog-row"><Progress value={p.ack} tone={p.ack < 60 ? '' : 'ok'} /><b>{p.ack}%</b></div></td>
          <td className="right"><button className="btn sm" onClick={() => notify('Reminder sent to pending employees')}><Icon name="bell" size={14} />Remind</button></td></tr>)}</tbody></table></div></Card>
      {open && <FormModal title="Publish policy" submitLabel="Publish" onClose={() => setOpen(false)}
        fields={[{ name: 'title', label: 'Title', required: true }, { name: 'version', label: 'Version', placeholder: 'v1.0' }]}
        onSubmit={v => { add('policyAck', { ...v, ack: 0, status: 'Published' }); notify('Policy published'); }} />}
    </div>
  );
}
