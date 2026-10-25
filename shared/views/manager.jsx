import React, { useState } from 'react';
import { useStore } from '../store.jsx';
import { Icon, Avatar, Badge, Status, Progress, Card, Stat, Empty, FormModal, Modal, Stars } from '../ui/index.jsx';

const REPORTS = ['Arjun Sharma', 'Meera Iyer', 'Sneha Joshi'];

export function Dashboard() {
  const { data } = useStore();
  const toRate = data.mGoals.flatMap(g => g.tasks).filter(t => t.state === 'Submitted').length;
  const apprPending = data.mAppr.filter(a => a.status === 'Pending').length;
  const leaves = data.teamLeaves.filter(l => l.status === 'Pending').length;
  return (
    <div className="page">
      <section className="hero"><div><span className="eyebrow">Manager workspace</span><h2>Good morning, Priya</h2><p>{toRate} tasks to rate, {apprPending} self-appraisals to rate and {leaves} leave requests to approve.</p></div>
        <div className="hero-stats"><div><b>{REPORTS.length}</b><span>Direct reports</span></div><div><b>{data.mGoals.length}</b><span>Goals</span></div><div><b>{toRate}</b><span>To rate</span></div></div></section>
      <div className="grid g3"><Stat icon="kanban" tone="warn" label="Tasks to rate" value={toRate} /><Stat icon="award" tone="info" label="Appraisals to rate" value={apprPending} /><Stat icon="calendar" tone="ok" label="Leave approvals" value={leaves} /></div>
      <Card title="Goal progress" pad={false}><ul className="list">{data.mGoals.map(g => <li key={g.id}><div><b>{g.title}</b><small>{g.tasks.length} tasks</small></div><span className="grow" /><div className="w120"><Progress value={g.progress} /></div><b>{g.progress}%</b></li>)}</ul></Card>
    </div>
  );
}

export function Team() {
  const { data } = useStore();
  const people = data.team.filter(t => REPORTS.includes(t.name));
  return (
    <div className="page"><Card title="My team" sub="Direct reports" pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Employee</th><th>Title</th><th>Grade</th><th>Rating</th><th>Status</th></tr></thead>
      <tbody>{people.map(t => <tr key={t.id}><td><div className="who"><Avatar name={t.name} /><div><b>{t.name}</b><small>{t.email}</small></div></div></td><td>{t.title}</td><td>{t.grade}</td><td><Stars value={t.rating} /></td><td><Status value={t.status} /></td></tr>)}</tbody></table></div></Card></div>
  );
}

export function Goals() {
  const { data, add, patch, notify } = useStore();
  const [goalOpen, setGoalOpen] = useState(false); const [taskFor, setTaskFor] = useState(null);
  const setTask = (g, tid, p) => patch('mGoals', g.id, { tasks: g.tasks.map(t => t.id === tid ? { ...t, ...p } : t) });
  return (
    <div className="page">
      <div className="toolbar"><span className="grow" /><button className="btn pri" onClick={() => setGoalOpen(true)}><Icon name="plus" size={16} />New goal</button></div>
      {data.mGoals.map(g => (
        <Card key={g.id} title={g.title} sub={`${g.tasks.length} tasks · ${g.progress}% complete`} action={<button className="btn sm" onClick={() => setTaskFor(g)}><Icon name="plus" size={14} />Add task</button>} pad={false}>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Task</th><th>Assignee</th><th>State</th><th>Rating</th><th /></tr></thead>
            <tbody>{g.tasks.map(t => <tr key={t.id}><td><b>{t.title}</b></td><td>{t.assignee}</td><td><Status value={t.state} /></td><td>{t.rating ? <Stars value={t.rating} /> : '—'}</td>
              <td className="right">{t.state === 'Submitted' && <span className="chips" style={{ justifyContent: 'flex-end' }}>{[3, 4, 5].map(r => <button key={r} className="btn sm" onClick={() => { setTask(g, t.id, { state: 'Rated', rating: r }); notify(`Approved & rated ${r}★`); }}>Rate {r}</button>)}</span>}
                {t.state === 'In progress' && <button className="btn sm" onClick={() => { setTask(g, t.id, { state: 'Submitted' }); notify('Marked as submitted by employee (demo)'); }}>Simulate submit</button>}</td></tr>)}</tbody></table>{!g.tasks.length && <Empty text="No tasks yet." />}</div>
        </Card>
      ))}
      {goalOpen && <FormModal title="New goal" submitLabel="Create" onClose={() => setGoalOpen(false)} fields={[{ name: 'title', label: 'Goal title', required: true, full: true }]}
        onSubmit={v => { add('mGoals', { title: v.title, owner: 'Priya Menon', progress: 0, tasks: [] }); notify('Goal created'); }} />}
      {taskFor && <FormModal title={'Add task · ' + taskFor.title} submitLabel="Assign" onClose={() => setTaskFor(null)}
        fields={[{ name: 'title', label: 'Task', required: true, full: true }, { name: 'assignee', label: 'Assign to', type: 'select', options: REPORTS }]}
        onSubmit={v => { patch('mGoals', taskFor.id, g => ({ tasks: [...g.tasks, { id: Date.now(), title: v.title, assignee: v.assignee, state: 'In progress', rating: 0 }] })); notify('Task assigned to ' + v.assignee); }} />}
    </div>
  );
}

export function Approvals() {
  const { data, patch, notify } = useStore();
  return (
    <div className="page"><Card title="Team leave & WFH requests" pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Employee</th><th>Type</th><th>Dates</th><th>Days</th><th>Status</th><th /></tr></thead>
      <tbody>{data.teamLeaves.map(l => <tr key={l.id}><td><b>{l.emp}</b></td><td>{l.type}</td><td>{l.from} → {l.to}</td><td>{l.days}</td><td><Status value={l.status} /></td>
        <td className="right">{l.status === 'Pending' && <span className="chips" style={{ justifyContent: 'flex-end' }}><button className="btn sm pri" onClick={() => { patch('teamLeaves', l.id, { status: 'Approved' }); notify('Approved'); }}>Approve</button><button className="btn sm" onClick={() => { patch('teamLeaves', l.id, { status: 'Rejected' }); notify('Rejected'); }}>Reject</button></span>}</td></tr>)}</tbody></table></div></Card></div>
  );
}

export function Appraisals() {
  const { data, patch, notify } = useStore(); const [sel, setSel] = useState(null);
  const live = sel && data.mAppr.find(a => a.id === sel);
  return (
    <div className="page"><Card title="Team self-appraisals" sub="Rate after the employee submits" pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Employee</th><th>Period</th><th>Self</th><th>My rating</th><th>Status</th><th /></tr></thead>
      <tbody>{data.mAppr.map(a => <tr key={a.id}><td><b>{a.emp}</b></td><td>{a.period}</td><td><Stars value={a.self} /></td><td>{a.rating ? <Stars value={a.rating} /> : '—'}</td><td><Status value={a.status} /></td><td className="right"><button className="btn sm" onClick={() => setSel(a.id)}>{a.status === 'Rated' ? 'Edit' : 'Rate'}</button></td></tr>)}</tbody></table></div></Card>
      {live && <RateModal a={live} onClose={() => setSel(null)} onSave={p => { patch('mAppr', live.id, { ...p, status: 'Rated' }); notify('Rating submitted to HR'); }} />}
    </div>
  );
}

function RateModal({ a, onClose, onSave }) {
  const [rating, setRating] = useState(a.rating || 4); const [remark, setRemark] = useState(a.remark);
  return (
    <Modal title={`${a.emp} · ${a.period}`} onClose={onClose}>
      <p><b>Self note:</b> {a.note}</p>
      <form className="form" onSubmit={e => { e.preventDefault(); onSave({ rating: Number(rating), remark }); onClose(); }}>
        <label className="field"><span>Manager rating (1–5)</span><input className="input" type="number" min="1" max="5" step="0.1" value={rating} onChange={e => setRating(e.target.value)} /></label>
        <label className="field full"><span>Remark</span><textarea className="input" rows={4} value={remark} onChange={e => setRemark(e.target.value)} /></label>
        <div className="form-actions"><button type="button" className="btn ghost" onClick={onClose}>Cancel</button><button className="btn pri">Submit rating</button></div>
      </form>
    </Modal>
  );
}
