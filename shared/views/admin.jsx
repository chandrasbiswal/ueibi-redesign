import React, { useState } from 'react';
import { useStore } from '../store.jsx';
import { Icon, Avatar, Badge, Status, Progress, Tabs, Card, Stat, Empty, FormModal, LineChart, BarChart, Donut, SearchBox, Toggle, Spark } from '../ui/index.jsx';
import { CHART } from '../data.js';

const money = n => '$' + n.toLocaleString();

export function Dashboard() {
  const { data } = useStore();
  const pending = data.verifications.filter(v => v.status === 'Pending').length;
  return (
    <div className="page">
      <section className="hero">
        <div><span className="eyebrow">Platform overview</span><h2>All three products are online</h2>
          <div className="chips">{['UER', 'UHR', 'USKEP'].map(p => <span key={p} className="pill-live"><i />{p} online</span>)}</div></div>
        <div className="hero-stats"><div><b>87,420</b><span>Users</span></div><div><b>{data.companies.length * 18 + 1}</b><span>Companies</span></div><div><b>$71.5K</b><span>MRR</span></div><div><b>62</b><span>NPS</span></div></div>
      </section>
      <div className="grid g4">
        <Stat hero icon="dollar" label="Monthly revenue" value="$71,542" delta="+10.8%"><Spark data={CHART.mrr} color="#fff" /></Stat>
        <Stat icon="building" tone="info" label="Companies onboarded" value={data.companies.length} delta="+2" />
        <Stat icon="grad" tone="ok" label="Colleges" value={data.colleges.length} delta="+1" />
        <Stat icon="shield" tone="warn" label="Pending verifications" value={pending} />
      </div>
      <div className="grid g2-1">
        <Card title="User growth by product" sub="Thousands of users"><LineChart labels={CHART.months} series={[{ name: 'USKEP', data: CHART.growth.USKEP }, { name: 'UHR', data: CHART.growth.UHR }, { name: 'UER', data: CHART.growth.UER }]} /></Card>
        <Card title="Open tickets" pad={false}><ul className="list">{data.tickets.map(t => <li key={t.id}><span className={'dot ' + t.sev} /><div><b>#{t.id} {t.title}</b><small>{t.org} · {t.ago}</small></div></li>)}</ul></Card>
      </div>
      <div className="grid g2">
        <Card title="Top companies" pad={false}><ul className="list">{[...data.companies].sort((a, b) => b.mrr - a.mrr).slice(0, 4).map(c => <li key={c.id}><span className="li-ic"><Icon name="building" /></span><div><b>{c.name}</b><small>{c.employees.toLocaleString()} employees</small></div><b>{money(c.mrr)}</b></li>)}</ul></Card>
        <Card title="Verification requests" pad={false}><ul className="list">{data.verifications.filter(v => v.status === 'Pending').map(v => <li key={v.id}><Avatar name={v.name} /><div><b>{v.name}</b><small>{v.tick} tick · {v.role}</small></div><Status value="Pending" /></li>)}{!pending && <Empty text="All caught up." />}</ul></Card>
      </div>
    </div>
  );
}

export function Companies() {
  const { data, add, del } = useStore();
  const [q, setQ] = useState(''); const [f, setF] = useState('All'); const [open, setOpen] = useState(false);
  const list = data.companies.filter(c => (f === 'All' || c.status === f || c.plan === f) && c.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="page">
      <div className="grid g4"><Stat icon="building" label="Companies" value={data.companies.length} /><Stat icon="users" tone="info" label="Employees" value={data.companies.reduce((a, c) => a + c.employees, 0).toLocaleString()} /><Stat icon="dollar" tone="ok" label="Total MRR" value={money(data.companies.reduce((a, c) => a + c.mrr, 0))} /><Stat icon="clock" tone="warn" label="In trial" value={data.companies.filter(c => c.status === 'Trial').length} /></div>
      <div className="toolbar"><SearchBox value={q} onChange={setQ} placeholder="Search companies…" />
        <Tabs tabs={['All', 'Active', 'Trial', 'Enterprise', 'Professional']} value={f} onChange={setF} /><span className="grow" /><button className="btn pri" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Add company</button></div>
      <Card pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Company</th><th>Plan</th><th>Employees</th><th>MRR</th><th>Growth</th><th>Status</th><th /></tr></thead>
        <tbody>{list.map(c => <tr key={c.id}><td><div className="who"><Avatar name={c.name} /><b>{c.name}</b></div></td><td><Badge tone="pri">{c.plan}</Badge></td><td>{c.employees.toLocaleString()}</td><td>{c.mrr ? money(c.mrr) : 'Trial'}</td><td className={c.growth ? 'up' : ''}>{c.growth ? '+' + c.growth + '%' : '-'}</td><td><Status value={c.status} /></td>
          <td className="right"><button className="icon-btn" aria-label="Remove" onClick={() => del('companies', c.id)}><Icon name="trash" size={15} /></button></td></tr>)}</tbody></table>{!list.length && <Empty text="No companies found." />}</div></Card>
      {open && <FormModal title="Add company" submitLabel="Add company" onClose={() => setOpen(false)} fields={[{ name: 'name', label: 'Company name', required: true, full: true }, { name: 'plan', label: 'Plan', type: 'select', options: ['Starter', 'Professional', 'Enterprise'] }, { name: 'employees', label: 'Employees', type: 'number' }, { name: 'mrr', label: 'MRR ($)', type: 'number' }]} onSubmit={v => add('companies', { ...v, growth: 0, status: v.mrr ? 'Active' : 'Trial' })} />}
    </div>
  );
}

export function Colleges() {
  const { data, add, del } = useStore();
  const [q, setQ] = useState(''); const [open, setOpen] = useState(false);
  const list = data.colleges.filter(c => c.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="page">
      <div className="grid g4"><Stat icon="grad" tone="ok" label="Colleges" value={data.colleges.length} /><Stat icon="users" label="Students" value={data.colleges.reduce((a, c) => a + c.students, 0).toLocaleString()} /><Stat icon="trendUp" tone="info" label="Avg placement" value={Math.round(data.colleges.reduce((a, c) => a + c.placement, 0) / data.colleges.length) + '%'} /><Stat icon="award" tone="warn" label="Premium plan" value={data.colleges.filter(c => c.plan === 'Premium').length} /></div>
      <div className="toolbar"><SearchBox value={q} onChange={setQ} placeholder="Search colleges…" /><span className="grow" /><button className="btn pri" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Add college</button></div>
      <Card pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>College</th><th>Location</th><th>Plan</th><th>Students</th><th>Depts</th><th>Placement</th><th>Avg CTC</th><th>Revenue</th><th>Status</th><th /></tr></thead>
        <tbody>{list.map(c => <tr key={c.id}><td><div className="who"><Avatar name={c.name} /><b>{c.name}</b></div></td><td>{c.loc}</td><td><Badge tone="pri">{c.plan}</Badge></td><td>{c.students.toLocaleString()}</td><td>{c.depts}</td>
          <td><div className="prog-row"><Progress value={c.placement} tone={c.placement < 80 ? 'warn' : 'ok'} /><b>{c.placement}%</b></div></td><td>{c.ctc} LPA</td><td>{c.revenue}</td><td><Status value={c.status} /></td>
          <td className="right"><button className="icon-btn" aria-label="Remove" onClick={() => del('colleges', c.id)}><Icon name="trash" size={15} /></button></td></tr>)}</tbody></table></div></Card>
      {open && <FormModal title="Add college" onClose={() => setOpen(false)} fields={[{ name: 'name', label: 'College name', required: true, full: true }, { name: 'loc', label: 'Location' }, { name: 'plan', label: 'Plan', type: 'select', options: ['Basic', 'Standard', 'Premium'] }, { name: 'students', label: 'Students', type: 'number' }, { name: 'depts', label: 'Departments', type: 'number' }]} onSubmit={v => add('colleges', { ...v, placement: 0, ctc: 0, revenue: 'Trial', status: 'Trial' })} />}
    </div>
  );
}

export function Users() {
  const { data, add } = useStore(); const [q, setQ] = useState(''); const [open, setOpen] = useState(false);
  const list = data.users.filter(u => (u.name + u.email).toLowerCase().includes(q.toLowerCase()));
  const tick = { Blue: 'info', Green: 'ok', Grey: 'mute' };
  return (
    <div className="page">
      <div className="grid g4"><Stat label="Total users" value={data.users.length} /><Stat label="Active" tone="ok" value={data.users.filter(u => u.status === 'Active').length} /><Stat label="Verified" tone="info" value={data.users.filter(u => u.verified).length} /><Stat label="Inactive" tone="bad" value={data.users.filter(u => u.status !== 'Active').length} /></div>
      <div className="toolbar"><SearchBox value={q} onChange={setQ} placeholder="Search users by name or email…" /><span className="grow" /><button className="btn pri" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Invite user</button></div>
      <Card pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>User</th><th>Email</th><th>Role</th><th>Product</th><th>Company</th><th>Verified</th><th>Last login</th><th>Status</th></tr></thead>
        <tbody>{list.map(u => <tr key={u.id}><td><div className="who"><Avatar name={u.name} /><b>{u.name}</b></div></td><td className="muted">{u.email}</td><td><Badge>{u.role}</Badge></td><td><Badge tone="pri">{u.product}</Badge></td><td>{u.company}</td><td>{u.verified ? <Badge tone={tick[u.verified]}>{u.verified} tick</Badge> : '-'}</td><td className="muted">{u.last}</td><td><Status value={u.status} /></td></tr>)}</tbody></table></div></Card>
      {open && <FormModal title="Invite user" submitLabel="Send invite" onClose={() => setOpen(false)} fields={[{ name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'role', label: 'Role', type: 'select', options: ['employee', 'manager', 'hr', 'leadership', 'student', 'mentor'] }, { name: 'product', label: 'Product', type: 'select', options: ['UER', 'UHR', 'USKEP'] }]} onSubmit={v => add('users', { ...v, company: '-', verified: '', last: 'Never', status: 'Active' })} />}
    </div>
  );
}

export function Verification() {
  const { data, patch, notify } = useStore();
  const c = s => data.verifications.filter(v => v.status === s).length;
  const tick = { Blue: 'info', Green: 'ok', Grey: 'mute' };
  return (
    <div className="page">
      <div className="grid g3"><Stat label="Pending" tone="warn" value={c('Pending')} /><Stat label="Approved" tone="ok" value={c('Approved')} /><Stat label="Rejected" tone="bad" value={c('Rejected')} /></div>
      {data.verifications.map(v => (
        <article key={v.id} className={'card vrow ' + v.status.toLowerCase()}>
          <Avatar name={v.name} size={48} />
          <div className="grow"><div className="row"><b>{v.name}</b><Badge tone={tick[v.tick]}>{v.tick} tick</Badge></div><div>{v.role}</div><small className="muted">Evidence: {v.evidence} · Submitted {v.date}</small></div>
          {v.status === 'Pending' ? <div className="row"><button className="btn pri" onClick={() => { patch('verifications', v.id, { status: 'Approved' }); notify(v.name + ' approved'); }}><Icon name="check" size={15} />Approve</button><button className="btn danger" onClick={() => patch('verifications', v.id, { status: 'Rejected' })}><Icon name="x" size={15} />Reject</button></div> : <Status value={v.status} />}
        </article>
      ))}
    </div>
  );
}

export function Analytics() {
  const [cyc, setCyc] = useState('Monthly');
  return (
    <div className="page">
      <div className="grid g4"><Stat icon="users" label="UER users" value="6,200" delta="+29%" /><Stat icon="briefcase" tone="info" label="UHR members" value="11,800" delta="+30%" /><Stat icon="grad" tone="ok" label="USKEP students" value="52,340" delta="+54%" /><Stat icon="message" tone="warn" label="Total posts" value="1,980" delta="+27%" /></div>
      <div className="grid g2">
        <Card title="Review completion rate (%)" action={<Tabs tabs={['Monthly', 'Quarterly', 'Annual']} value={cyc} onChange={setCyc} />}><BarChart labels={CHART.months} max={100} series={[{ name: cyc, data: CHART.reviewCompletion[cyc] }]} /></Card>
        <Card title="User growth (cumulative)"><LineChart labels={CHART.months} series={[{ name: 'USKEP', data: CHART.growth.USKEP }, { name: 'UHR', data: CHART.growth.UHR }, { name: 'UER', data: CHART.growth.UER }]} /></Card>
      </div>
      <Card title="UHR social engagement"><LineChart labels={CHART.months} series={[{ name: 'Posts', data: [210, 260, 310, 340, 380, 480] }, { name: 'Comments', data: [420, 480, 600, 640, 720, 910], dashed: true }]} /></Card>
    </div>
  );
}

export function Revenue() {
  const [range, setRange] = useState('6M'); const { notify } = useStore();
  const n = { '1M': 2, '3M': 3, '6M': 6, '1Y': 6 }[range];
  const sl = a => a.slice(-n);
  const rows = [['Gross MRR', '$71,542'], ['Churn MRR', '-$2,240', 'bad'], ['Expansion MRR', '+$4,100', 'ok'], ['Net MRR', '$73,402', 'pri'], ['ARR (annualised)', '$859K'], ['Avg revenue / customer', '$1,233'], ['LTV (est.)', '$31,200', 'ok'], ['CAC', '$1,840'], ['LTV:CAC ratio', '16.9×', 'ok']];
  const plans = [{ name: 'Starter', value: 5, n: 12, rev: '$3,588' }, { name: 'Professional', value: 49, n: 35, rev: '$34,965' }, { name: 'Enterprise', value: 46, n: 11, rev: '$32,989' }];
  return (
    <div className="page">
      <div className="grid g4"><Stat hero icon="dollar" label="Monthly recurring revenue" value="$71,542" delta="+10.8%" /><Stat icon="trendUp" tone="info" label="Annual recurring revenue" value="$859K" delta="+10.8%" /><Stat icon="users" tone="ok" label="Paying customers" value="58" delta="+8.2%" /><Stat icon="alert" tone="bad" label="Churn rate" value="3.2%" delta="-0.8%" /></div>
      <Card title="Revenue growth" sub="Monthly revenue trend" action={<div className="row"><Tabs tabs={['1M', '3M', '6M', '1Y']} value={range} onChange={setRange} /><button className="btn sm" onClick={() => notify('Export started')}><Icon name="download" size={14} />Export</button></div>}>
        <LineChart labels={sl(CHART.months)} fmt={v => '$' + v + 'K'} series={[{ name: 'Total revenue', data: sl(CHART.revenue) }, { name: 'MRR', data: sl(CHART.mrr), dashed: true }]} /></Card>
      <div className="grid g2">
        <Card title="Customer movement" sub="New sign-ups vs churn"><BarChart labels={CHART.months} series={[{ name: 'New', data: CHART.newC, color: 'var(--ok)' }, { name: 'Churned', data: CHART.churn, color: 'var(--bad)' }]} /></Card>
        <Card title="Plan distribution"><div className="plans"><Donut segs={plans.map((p, i) => ({ value: p.value, color: `var(--c${i + 1})` }))} />
          <ul className="list grow">{plans.map((p, i) => <li key={p.name} className="col"><div className="row"><i className="sw" style={{ background: `var(--c${i + 1})` }} /><b>{p.name}</b><span className="grow" /><b>{p.value}%</b></div><Progress value={p.value} /><div className="row"><small>{p.n} customers</small><span className="grow" /><small>{p.rev}/mo</small></div></li>)}</ul></div></Card>
      </div>
      <div className="grid g2">
        <Card title="Cohort retention" sub="% retained after 6 months"><ul className="list">{[['Jan 2024', 94], ['Feb 2024', 91], ['Mar 2024', 96], ['Apr 2024', 88], ['May 2024', 93], ['Jun 2024', 97]].map(([m, v]) => <li key={m}><span className="w80">{m}</span><div className="grow"><Progress value={v} tone={v < 90 ? 'warn' : ''} /></div><b>{v}%</b></li>)}</ul></Card>
        <Card title="Revenue summary" pad={false}><ul className="list kv">{rows.map(r => <li key={r[0]}><span>{r[0]}</span><b className={r[2] || ''}>{r[1]}</b></li>)}</ul></Card>
      </div>
    </div>
  );
}

export function Settings() {
  const { data, patch, notify } = useStore();
  const rules = ['Send review reminder 7 days before due date', 'Flag if rating drops below 3.5 for 2 quarters', 'Welcome email 24h after company onboarding', 'Auto-archive posts with >5 reports'];
  const [on, setOn] = useState([true, true, true, false]);
  return (
    <div className="page"><div className="grid g2">
      <Card title="Feature flags" pad={false}><ul className="list">{data.flags.map(f => <li key={f.id}><div className="grow"><div className="row"><b>{f.name}</b><Badge tone="pri">{f.product}</Badge></div><small>{f.desc}</small></div><Toggle on={f.on} onChange={v => { patch('flags', f.id, { on: v }); notify(f.name + (v ? ' enabled' : ' disabled')); }} /></li>)}</ul></Card>
      <div className="stack">
        <Card title="Automation rules" pad={false}><ul className="list">{rules.map((r, i) => <li key={r}><div className="grow">{r}</div><Toggle on={on[i]} onChange={v => setOn(on.map((x, j) => j === i ? v : x))} /></li>)}</ul></Card>
        <Card title="Recent support tickets" pad={false}><ul className="list">{data.tickets.map(t => <li key={t.id}><span className={'dot ' + t.sev} /><div className="grow"><b>#{t.id} {t.title}</b><small>{t.org} · {t.ago}</small></div>
          {t.assignee ? <Badge tone="ok">{t.assignee}</Badge> : <button className="btn sm" onClick={() => { patch('tickets', t.id, { assignee: 'Platform Admin' }); notify('Ticket assigned'); }}>Assign</button>}</li>)}</ul></Card>
      </div>
    </div></div>
  );
}
