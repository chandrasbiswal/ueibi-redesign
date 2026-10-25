import React, { useState } from 'react';
import { useStore } from '../store.jsx';
import { Icon, Avatar, Badge, Status, Tabs, Modal, Stars, Empty, Progress } from '../ui/index.jsx';
import { PRI, COLS } from './goals.jsx';

/* Employee profile dialog, shared by Leadership, Manager and HR. */
export function Profile({ person, onClose }) {
  const { data, patch, notify } = useStore();
  const [tab, setTab] = useState('Overview'); const [note, setNote] = useState('');
  const p = data.team.find(t => t.id === person.id) || person;
  const tasks = data.tasks.filter(t => t.assignee === p.name);
  const appr = data.hrAppr.filter(a => a.emp === p.name);
  const done = tasks.filter(t => t.col === 'done').length;
  const rows = [['Email', p.email], ['Department', p.dept], ['Grade / band', p.grade], ['Employee type', p.type], ['Joined', p.joined], ['Reports to', p.manager], ['Location', p.location]];
  return (
    <Modal title="Employee profile" onClose={onClose}>
      <div className="who big"><Avatar name={p.name} size={64} /><div><b>{p.name}</b><small>{p.title} · {p.dept}</small>
        <div className="chips" style={{ marginTop: 6 }}><Status value={p.status} /><Stars value={p.rating} /><Badge>{p.type}</Badge></div></div></div>
      <div style={{ margin: '16px 0' }}><Tabs tabs={['Overview', 'Tasks', 'Appraisals', 'Skills']} value={tab} onChange={setTab} /></div>
      {tab === 'Overview' && <>
        <ul className="list kv">{rows.map(([k, v]) => <li key={k}><span className="muted">{k}</span><b>{v}</b></li>)}</ul>
        <label className="field full" style={{ marginTop: 12 }}><span>Add a private note</span><textarea className="input" rows={2} value={note} onChange={e => setNote(e.target.value)} placeholder="Visible to leadership only" /></label>
        <div className="form-actions"><button className="btn pri" disabled={!note.trim()} onClick={() => { patch('team', p.id, { note }); setNote(''); notify('Note saved'); }}>Save note</button></div>
        {p.note && <p className="muted">Saved note: {p.note}</p>}
      </>}
      {tab === 'Tasks' && (tasks.length ? <><div className="prog-row" style={{ marginBottom: 10 }}><Progress value={Math.round((done / tasks.length) * 100)} tone="ok" /><b>{done}/{tasks.length} done</b></div>
        <ul className="list">{tasks.map(t => <li key={t.id}><div><b>{t.title}</b><small>Due {t.due}</small></div><span className="grow" /><Badge tone={PRI[t.priority]}>{t.priority}</Badge><Badge>{COLS.find(c => c[0] === t.col)?.[1]}</Badge></li>)}</ul></> : <Empty text="No tasks assigned." />)}
      {tab === 'Appraisals' && (appr.length ? <ul className="list">{appr.map(a => <li key={a.id}><div><b>{a.cycle} · {a.period}</b><small>Self {a.self || '—'} · Manager {a.manager || '—'} · HR {a.hrRating || '—'}</small></div><span className="grow" />{a.cycle === 'Annual' && a.released && a.hike ? <Badge tone="ok">{a.hike}% hike</Badge> : null}<Status value={a.status} /></li>)}</ul> : <Empty text="No appraisal records yet." />)}
      {tab === 'Skills' && <div className="chips">{(p.skills || '').split(',').filter(Boolean).map(s => <Badge key={s} tone="pri">{s.trim()}</Badge>)}</div>}
    </Modal>
  );
}
