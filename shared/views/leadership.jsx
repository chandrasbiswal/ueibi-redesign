import React, { useState } from 'react';
import { useStore } from '../store.jsx';
import { Icon, Avatar, Badge, Status, Progress, Tabs, Card, Stat, Empty, FormModal, Ring, LineChart, BarChart, Donut, SearchBox, Toggle, Stars } from '../ui/index.jsx';
import { CHART } from '../data.js';

export function Overview() {
  const { data } = useStore();
  const risk = data.team.filter(t => t.rating < 3.8 || t.status !== 'Active');
  return (
    <div className="page">
      <section className="hero">
        <div><span className="eyebrow">Executive overview</span><h2>Organisation health is strong</h2><p>Performance is up 0.4 points year on year; two departments need attention.</p>
          <div className="hero-actions"><button className="btn light" onClick={() => window.print()}><Icon name="download" size={16} />Board report</button></div></div>
        <div className="hero-stats"><div><b>4.1</b><span>Org avg rating</span></div><div><b>{data.team.length * 20 + 2}</b><span>Headcount</span></div><div><b>85%</b><span>Goal alignment</span></div></div>
      </section>
      <div className="grid g2-1">
        <Card title="Performance trajectory" sub="Organisation average rating"><LineChart labels={CHART.months} series={[{ name: 'Org average', data: CHART.trajectory.map(v => +(v - 0.1).toFixed(1)) }]} min={3} max={5} /></Card>
        <Card title="Rating distribution" sub="Share of employees"><div className="center"><Donut center="4.1" sub="avg" segs={[{ value: 18, color: 'var(--c1)' }, { value: 46, color: 'var(--c2)' }, { value: 27, color: 'var(--c3)' }, { value: 9, color: 'var(--c4)' }]} /></div>
          <div className="legend col">{['Outstanding 18%', 'Exceeds 46%', 'Meets 27%', 'Needs work 9%'].map((l, i) => <span key={l}><i style={{ background: `var(--c${i + 1})` }} />{l}</span>)}</div></Card>
      </div>
      <div className="grid g2">
        <Card title="Performance by department" sub="This FY vs last FY"><BarChart labels={CHART.depts} max={5} series={[{ name: 'This FY', data: CHART.deptAvg }, { name: 'Last FY', data: CHART.deptPrev }]} /></Card>
        <Card title="Organisational risk" sub="Flight risk and low performers" pad={false}>
          <ul className="list">{risk.map(r => <li key={r.id}><Avatar name={r.name} /><div><b>{r.name}</b><small>{r.dept} · {r.title}</small></div><Stars value={r.rating} /><Status value={r.status === 'Active' ? 'At risk' : r.status} /></li>)}</ul></Card>
      </div>
      <Card title="Department scorecard" pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Department</th><th>Avg rating</th><th>Goal completion</th><th>Review completion</th></tr></thead>
        <tbody>{CHART.depts.map((d, i) => <tr key={d}><td><b>{d}</b></td><td><Stars value={CHART.deptAvg[i]} /></td><td><div className="prog-row"><Progress value={60 + i * 7} /><b>{60 + i * 7}%</b></div></td><td><div className="prog-row"><Progress value={95 - i * 6} tone="ok" /><b>{95 - i * 6}%</b></div></td></tr>)}</tbody></table></div></Card>
    </div>
  );
}

export function Team() {
  const { data, add } = useStore();
  const [q, setQ] = useState(''); const [dept, setDept] = useState('All'); const [open, setOpen] = useState(false);
  const depts = ['All', ...new Set(data.team.map(t => t.dept))];
  const list = data.team.filter(t => (dept === 'All' || t.dept === dept) && (t.name + t.title + t.email).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="page">
      <div className="grid g4">
        <Stat icon="users" label="Total people" value={data.team.length} /><Stat icon="star" tone="ok" label="Avg rating" value={(data.team.reduce((a, t) => a + t.rating, 0) / data.team.length).toFixed(1)} />
        <Stat icon="briefcase" tone="info" label="Contractors" value={data.team.filter(t => t.type === 'Contract').length} /><Stat icon="alert" tone="warn" label="On notice" value={data.team.filter(t => t.status === 'On notice').length} />
      </div>
      <div className="toolbar"><SearchBox value={q} onChange={setQ} placeholder="Search name, title or email" /><select className="input sm" value={dept} onChange={e => setDept(e.target.value)}>{depts.map(d => <option key={d}>{d}</option>)}</select><span className="grow" />
        <button className="btn pri" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Add member</button></div>
      <Card pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Employee</th><th>Department</th><th>Grade</th><th>Type</th><th>Rating</th><th>Status</th></tr></thead>
        <tbody>{list.map(t => <tr key={t.id}><td><div className="who"><Avatar name={t.name} /><div><b>{t.name}</b><small>{t.title}</small></div></div></td><td>{t.dept}</td><td>{t.grade}</td><td>{t.type}</td><td><Stars value={t.rating} /></td><td><Status value={t.status} /></td></tr>)}</tbody></table>{!list.length && <Empty text="No matching people." />}</div></Card>
      {open && <FormModal title="Add team member" submitLabel="Add" onClose={() => setOpen(false)}
        fields={[{ name: 'name', label: 'Full name', required: true }, { name: 'title', label: 'Title', required: true }, { name: 'dept', label: 'Department', type: 'select', options: ['Engineering', 'Design', 'People', 'Sales', 'Analytics'] }, { name: 'email', label: 'Email', type: 'email' }, { name: 'grade', label: 'Grade' }, { name: 'type', label: 'Type', type: 'select', options: ['Full-time', 'Contract'] }]}
        onSubmit={v => add('team', { ...v, rating: 0, status: 'Active' })} />}
    </div>
  );
}

export function Reports() {
  const { notify } = useStore();
  const rows = [['Annual performance summary', 'FY 2025-26', 'PDF'], ['Goal alignment report', 'Q1 FY 2025-26', 'XLSX'], ['Appraisal completion tracker', 'Jun 2025', 'XLSX'], ['Attrition & risk analysis', 'FY 2025-26', 'PDF'], ['Leave utilisation', 'Jun 2025', 'CSV']];
  return (
    <div className="page">
      <div className="grid g2-1">
        <Card title="Rating trend" sub="Organisation, last 6 months"><LineChart labels={CHART.months} series={[{ name: 'Rating', data: CHART.trajectory }]} min={3} max={5} /></Card>
        <Card title="Department averages"><ul className="list">{CHART.depts.map((d, i) => <li key={d}><b>{d}</b><span className="grow" /><div className="w120"><Progress value={(CHART.deptAvg[i] / 5) * 100} /></div><Stars value={CHART.deptAvg[i]} /></li>)}</ul></Card>
      </div>
      <Card title="Standard reports" pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Report</th><th>Period</th><th>Format</th><th /></tr></thead>
        <tbody>{rows.map(r => <tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td><Badge>{r[2]}</Badge></td><td className="right"><button className="btn sm" onClick={() => notify('Preparing ' + r[0] + '…')}><Icon name="download" size={14} />Download</button></td></tr>)}</tbody></table></div></Card>
    </div>
  );
}

export function Registry() {
  const { data } = useStore();
  const [q, setQ] = useState(''); const [hit, setHit] = useState(null); const [sl, setSl] = useState({ attendance: 80, behaviour: 85, performance: 78 });
  const search = e => { e.preventDefault(); setHit(data.records.find(r => [r.name, r.email, r.pan].some(x => x.toLowerCase().includes(q.trim().toLowerCase()))) || 'none'); };
  return (
    <div className="page"><Card title="Search the registry" sub="Verify a candidate's employment history">
      <form className="toolbar" onSubmit={search}><SearchBox value={q} onChange={setQ} placeholder="Email, PAN or name" /><button className="btn pri">Search</button></form>
      {hit === 'none' && <Empty text="No registry record found." />}
      {hit && hit !== 'none' && <div className="grid g2"><div className="card inner"><div className="who big"><Avatar name={hit.name} size={56} /><div><b>{hit.name}</b><small>{hit.email} · PAN {hit.pan}</small></div></div>
        <div className="chips"><Status value={hit.kind === 'Active' ? 'Active' : 'Archived'} /><Badge>{hit.kind}</Badge><Badge tone={hit.conduct === 'Good' ? 'ok' : 'bad'}>Conduct: {hit.conduct}</Badge><Badge>Tenure {hit.tenure}</Badge></div></div>
        <div className="card inner"><h5>Conduct assessment</h5>{Object.keys(sl).map(k => <label key={k} className="field"><span className="cap">{k}: {sl[k]}</span><input type="range" min="0" max="100" value={sl[k]} onChange={e => setSl({ ...sl, [k]: +e.target.value })} /></label>)}</div></div>}
    </Card></div>
  );
}

export function Records() {
  const { data, add } = useStore();
  const [tab, setTab] = useState('Active'); const [open, setOpen] = useState(false);
  const list = data.records.filter(r => r.kind === tab);
  return (
    <div className="page">
      <div className="toolbar"><Tabs tabs={['Active', 'Ex-Employee', 'Non-Joiner']} value={tab} onChange={setTab} /><span className="grow" />
        <button className="btn" onClick={() => alert('Bulk import (demo): choose a CSV file')}><Icon name="download" size={16} />Bulk import</button>
        <button className="btn pri" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Add record</button></div>
      <Card pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Name</th><th>Email</th><th>PAN</th><th>Tenure</th><th>Conduct</th></tr></thead>
        <tbody>{list.map(r => <tr key={r.id}><td><div className="who"><Avatar name={r.name} /><b>{r.name}</b></div></td><td>{r.email}</td><td>{r.pan}</td><td>{r.tenure}</td><td><Badge tone={r.conduct === 'Good' ? 'ok' : 'bad'}>{r.conduct}</Badge></td></tr>)}</tbody></table>{!list.length && <Empty text="No records in this category." />}</div></Card>
      {open && <FormModal title="Add record" onClose={() => setOpen(false)} fields={[{ name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'pan', label: 'PAN' }, { name: 'kind', label: 'Category', type: 'select', options: ['Active', 'Ex-Employee', 'Non-Joiner'] }, { name: 'tenure', label: 'Tenure' }, { name: 'conduct', label: 'Conduct', type: 'select', options: ['Good', 'Flagged'] }]} onSubmit={v => add('records', v)} />}
    </div>
  );
}

export function Disputes() {
  const { data, patch, notify } = useStore();
  return (
    <div className="page"><div className="grid g3"><Stat icon="alert" tone="bad" label="Open" value={data.disputes.filter(d => d.status === 'Open').length} /><Stat icon="clock" tone="warn" label="In review" value={data.disputes.filter(d => d.status === 'In review').length} /><Stat icon="check" tone="ok" label="Resolved" value={data.disputes.filter(d => d.status === 'Resolved').length} /></div>
      <Card pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Ticket</th><th>Employee</th><th>Subject</th><th>Raised</th><th>Priority</th><th>Status</th><th /></tr></thead>
        <tbody>{data.disputes.map(d => <tr key={d.id}><td><b>{d.id}</b></td><td>{d.employee}</td><td>{d.subject}</td><td>{d.raised}</td><td><Status value={d.priority} /></td><td><Status value={d.status} /></td>
          <td className="right">{d.status !== 'Resolved' && <button className="btn sm" onClick={() => { patch('disputes', d.id, { status: d.status === 'Open' ? 'In review' : 'Resolved' }); notify('Dispute updated'); }}>{d.status === 'Open' ? 'Start review' : 'Resolve'}</button>}</td></tr>)}</tbody></table></div></Card></div>
  );
}

export function Sublogins() {
  const { data, add, patch, del } = useStore();
  const [open, setOpen] = useState(false);
  const all = ['Reports', 'Team', 'Records', 'Disputes'];
  return (
    <div className="page">
      <div className="toolbar"><Badge tone="info">{data.sublogins.filter(s => s.active).length} of 5 seats used</Badge><span className="grow" /><button className="btn pri" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Add sub-login</button></div>
      <Card pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Delegate</th><th>Permissions</th><th>Active</th><th /></tr></thead>
        <tbody>{data.sublogins.map(s => <tr key={s.id}><td><div className="who"><Avatar name={s.name} /><div><b>{s.name}</b><small>{s.email}</small></div></div></td>
          <td><div className="chips">{all.map(p => { const on = s.perms.includes(p); return <button key={p} className={'chip' + (on ? ' on' : '')} onClick={() => patch('sublogins', s.id, { perms: on ? s.perms.filter(x => x !== p) : [...s.perms, p] })}>{p}</button>; })}</div></td>
          <td><Toggle on={s.active} onChange={v => patch('sublogins', s.id, { active: v })} /></td><td className="right"><button className="icon-btn" aria-label="Remove" onClick={() => del('sublogins', s.id)}><Icon name="trash" size={15} /></button></td></tr>)}</tbody></table></div></Card>
      {open && <FormModal title="Add sub-login" onClose={() => setOpen(false)} fields={[{ name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email', type: 'email', required: true }]} onSubmit={v => add('sublogins', { ...v, perms: ['Reports'], active: true })} />}
    </div>
  );
}
