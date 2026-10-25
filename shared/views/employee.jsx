import React, { useState } from 'react';
import { useStore } from '../store.jsx';
import { Icon, Avatar, Badge, Status, Progress, Tabs, Card, Stat, Empty, FormModal, Modal, Ring, LineChart, Stars } from '../ui/index.jsx';
import { CHART } from '../data.js';

const PRI = { High: 'bad', Medium: 'warn', Low: 'mute' };

export function Dashboard() {
  const { data, user, patch } = useStore();
  const done = data.tasks.filter(t => t.col === 'done').length;
  const avgProg = Math.round(data.goals.filter(g => g.fy === 'FY 2025-26').reduce((a, g) => a + g.progress, 0) / 3);
  return (
    <div className="page">
      <section className="hero">
        <div>
          <span className="eyebrow">Good morning</span>
          <h2>Welcome back, {user.name.split(' ')[0]}</h2>
          <p>You are on track this quarter. Two reviews need your attention.</p>
        </div>
        <div className="hero-stats">
          <div><b>4.2</b><span>Q1 rating</span></div>
          <div><b>{avgProg}%</b><span>Goal sync</span></div>
          <div><b>{done}/{data.tasks.length}</b><span>Tasks done</span></div>
        </div>
      </section>
      <div className="grid g3">
        <Card title="Goal velocity" sub="Average progress, FY 2025-26"><div className="center"><Ring pct={avgProg} sub="on track" /></div></Card>
        <Card title="Up next" sub="Deadlines & reviews">
          <ul className="list">
            {data.appraisals.filter(a => a.status !== 'Completed').map(a => (
              <li key={a.id}><span className="li-ic"><Icon name="award" /></span><div><b>{a.cycle} review</b><small>{a.period}</small></div><Status value={a.status} /></li>
            ))}
            {data.policies.filter(p => p.status === 'Pending').slice(0, 1).map(p => (
              <li key={p.id}><span className="li-ic warn"><Icon name="shield" /></span><div><b>Sign: {p.title}</b><small>{p.version}</small></div><Status value="Pending" /></li>
            ))}
          </ul>
        </Card>
        <Card title="Recent recognition" sub="From your team">
          <div className="recog"><span className="recog-ic"><Icon name="award" size={26} /></span><div><b>Reliability Champion</b><p>Awarded by Priya Menon for zero-downtime billing cut-over.</p></div></div>
        </Card>
      </div>
      <div className="grid g2-1">
        <Card title="Performance trajectory" sub="Rating by month"><LineChart labels={CHART.months} series={[{ name: 'Rating', data: CHART.trajectory }]} min={3} max={5} /></Card>
        <Card title="Action items" sub="Needs you">
          <ul className="list">
            {data.tasks.filter(t => t.col !== 'done').slice(0, 4).map(t => (
              <li key={t.id}><span className={'dot ' + PRI[t.priority]} /><div><b>{t.title}</b><small>{t.due}</small></div><Badge tone={PRI[t.priority]}>{t.priority}</Badge></li>
            ))}
          </ul>
        </Card>
      </div>
      <Card title="My team & collaborators">
        <div className="people">{data.team.slice(0, 6).map(p => <div key={p.id} className="person"><Avatar name={p.name} size={40} /><div><b>{p.name}</b><small>{p.title}</small></div></div>)}</div>
      </Card>
    </div>
  );
}

export function Goals() {
  const { data, add, patch, del, notify } = useStore();
  const [fy, setFy] = useState('All'); const [cat, setCat] = useState('All'); const [st, setSt] = useState('All');
  const [open, setOpen] = useState(false); const [edit, setEdit] = useState(null);
  const list = data.goals.filter(g => (fy === 'All' || g.fy === fy) && (cat === 'All' || g.category === cat) && (st === 'All' || g.status === st));
  const fields = [
    { name: 'title', label: 'Goal title', required: true, full: true },
    { name: 'category', label: 'Category', type: 'select', options: ['Technical', 'People', 'Product', 'Culture', 'Finance'] },
    { name: 'priority', label: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] },
    { name: 'weight', label: 'Weightage %', type: 'number' },
    { name: 'fy', label: 'Financial year', type: 'select', options: ['FY 2025-26', 'FY 2024-25'] },
  ];
  return (
    <div className="page">
      <div className="toolbar">
        <select className="input sm" value={fy} onChange={e => setFy(e.target.value)}>{['All', 'FY 2025-26', 'FY 2024-25'].map(x => <option key={x}>{x}</option>)}</select>
        <select className="input sm" value={cat} onChange={e => setCat(e.target.value)}>{['All', 'Technical', 'People', 'Product', 'Culture', 'Finance'].map(x => <option key={x}>{x}</option>)}</select>
        <select className="input sm" value={st} onChange={e => setSt(e.target.value)}>{['All', 'Draft', 'Approved', 'Completed', 'Archived'].map(x => <option key={x}>{x}</option>)}</select>
        <span className="grow" />
        <button className="btn pri" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Create new goal</button>
      </div>
      {list.length === 0 ? <Empty text="No goals match these filters." /> : (
        <div className="grid g3">
          {list.map(g => (
            <article key={g.id} className="card goal">
              <div className="goal-top"><Badge tone="pri">{g.category}</Badge><Status value={g.status} /></div>
              <h4>{g.title}</h4>
              <div className="meta"><span>{g.fy}</span><span>Weight {g.weight}%</span><Badge tone={PRI[g.priority]}>{g.priority}</Badge></div>
              <div className="prog-row"><Progress value={g.progress} tone={g.progress >= 100 ? 'ok' : ''} /><b>{g.progress}%</b></div>
              <div className="goal-foot">
                {g.rating ? <Stars value={g.rating} /> : <small className="muted">Not rated yet</small>}
                <span className="grow" />
                {g.status === 'Draft' && <button className="btn sm" onClick={() => { patch('goals', g.id, { status: 'Approved' }); notify('Goal submitted & approved'); }}>Submit</button>}
                {g.status === 'Approved' && g.progress < 100 && <button className="btn sm" onClick={() => patch('goals', g.id, { progress: Math.min(100, g.progress + 10) })}>+10%</button>}
                <button className="icon-btn" aria-label="Edit" onClick={() => setEdit(g)}><Icon name="edit" size={15} /></button>
                <button className="icon-btn" aria-label="Delete" onClick={() => del('goals', g.id)}><Icon name="trash" size={15} /></button>
              </div>
            </article>
          ))}
        </div>
      )}
      {open && <FormModal title="Create new goal" fields={fields} submitLabel="Create goal" onClose={() => setOpen(false)} onSubmit={v => { add('goals', { ...v, progress: 0, status: 'Draft', rating: 0 }); notify('Goal created'); }} />}
      {edit && <FormModal title="Edit goal" fields={fields} initial={edit} onClose={() => setEdit(null)} onSubmit={v => patch('goals', edit.id, v)} />}
    </div>
  );
}

const COLS = [['assigned', 'Assigned'], ['progress', 'In progress'], ['hold', 'Pending on others'], ['review', 'In review'], ['done', 'Done']];
export function Tasks() {
  const { data, add, patch, del } = useStore();
  const [view, setView] = useState('board'); const [open, setOpen] = useState(false); const [drag, setDrag] = useState(null);
  const fields = [
    { name: 'title', label: 'Task', required: true, full: true },
    { name: 'goal', label: 'Linked goal', type: 'select', options: data.goals.map(g => g.title) },
    { name: 'priority', label: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] },
    { name: 'due', label: 'Due', placeholder: 'e.g. Fri' },
  ];
  const move = (t, dir) => { const i = COLS.findIndex(c => c[0] === t.col) + dir; if (COLS[i]) patch('tasks', t.id, { col: COLS[i][0] }); };
  return (
    <div className="page">
      <div className="toolbar">
        <Tabs tabs={[{ id: 'board', label: 'Board' }, { id: 'list', label: 'List' }]} value={view} onChange={setView} />
        <span className="grow" />
        <button className="btn pri" onClick={() => setOpen(true)}><Icon name="plus" size={16} />New task</button>
      </div>
      {view === 'board' ? (
        <div className="kanban">
          {COLS.map(([id, label]) => {
            const items = data.tasks.filter(t => t.col === id);
            return (
              <div key={id} className="kcol" onDragOver={e => e.preventDefault()} onDrop={() => { if (drag) patch('tasks', drag, { col: id }); setDrag(null); }}>
                <header><b>{label}</b><span className="count">{items.length}</span></header>
                {items.map(t => (
                  <div key={t.id} className="kcard" draggable onDragStart={() => setDrag(t.id)}>
                    <div className="kc-top"><Badge tone={PRI[t.priority]}>{t.priority}</Badge><small>{t.due}</small></div>
                    <b>{t.title}</b><small className="muted">{t.goal}</small>
                    <div className="kc-actions">
                      <button className="icon-btn" disabled={id === COLS[0][0]} onClick={() => move(t, -1)} aria-label="Move back"><Icon name="chevL" size={14} /></button>
                      <button className="icon-btn" disabled={id === 'done'} onClick={() => move(t, 1)} aria-label="Move forward"><Icon name="chevR" size={14} /></button>
                      <button className="icon-btn" onClick={() => del('tasks', t.id)} aria-label="Delete"><Icon name="trash" size={14} /></button>
                    </div>
                  </div>
                ))}
                {!items.length && <div className="kempty">Drop tasks here</div>}
              </div>
            );
          })}
        </div>
      ) : (
        <Card pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Task</th><th>Goal</th><th>Priority</th><th>Due</th><th>Stage</th></tr></thead>
          <tbody>{data.tasks.map(t => <tr key={t.id}><td><b>{t.title}</b></td><td>{t.goal}</td><td><Badge tone={PRI[t.priority]}>{t.priority}</Badge></td><td>{t.due}</td>
            <td><select className="input sm" value={t.col} onChange={e => patch('tasks', t.id, { col: e.target.value })}>{COLS.map(c => <option key={c[0]} value={c[0]}>{c[1]}</option>)}</select></td></tr>)}</tbody></table></div></Card>
      )}
      {open && <FormModal title="New task" fields={fields} submitLabel="Add task" onClose={() => setOpen(false)} onSubmit={v => add('tasks', { ...v, col: 'assigned' })} />}
    </div>
  );
}

export function Leave() {
  const { data, add, notify } = useStore();
  const [open, setOpen] = useState(false);
  const fields = [
    { name: 'type', label: 'Type', type: 'select', options: ['Casual Leave', 'Sick Leave', 'Earned Leave', 'Work From Home'] },
    { name: 'from', label: 'From', type: 'date', required: true }, { name: 'to', label: 'To', type: 'date', required: true },
    { name: 'reason', label: 'Reason', type: 'textarea' },
  ];
  return (
    <div className="page">
      <div className="grid g4">
        {data.balances.map(b => (
          <div key={b.type} className="stat"><div className="stat-l">{b.type}</div><div className="stat-v">{b.left}<small> / {b.total}</small></div><Progress value={(b.left / b.total) * 100} /></div>
        ))}
      </div>
      <Card title="Request history" action={<button className="btn pri" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Apply</button>} pad={false}>
        <div className="table-wrap"><table className="tbl"><thead><tr><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Manager</th><th>HR</th><th>Overall</th></tr></thead>
          <tbody>{data.leaves.map(l => <tr key={l.id}><td><b>{l.type}</b></td><td>{l.from}</td><td>{l.to}</td><td>{l.days}</td><td><Status value={l.manager} /></td><td><Status value={l.hr} /></td><td><Status value={l.overall} /></td></tr>)}</tbody></table></div>
      </Card>
      {open && <FormModal title="Apply for leave / WFH" fields={fields} submitLabel="Submit request" onClose={() => setOpen(false)}
        onSubmit={v => { const d = Math.max(1, Math.round((new Date(v.to) - new Date(v.from)) / 864e5) + 1); add('leaves', { ...v, days: d, manager: 'Pending', hr: 'Pending', overall: 'Pending' }); notify('Request submitted'); }} />}
    </div>
  );
}

export function Policies() {
  const { data, patch, notify } = useStore();
  const [sel, setSel] = useState(data.policies[0].id);
  const p = data.policies.find(x => x.id === sel) || data.policies[0];
  return (
    <div className="page"><div className="grid split">
      <Card title="Policies" sub={`${data.policies.filter(x => x.status === 'Signed').length} of ${data.policies.length} signed`} pad={false}>
        <ul className="list sel">{data.policies.map(x => <li key={x.id} className={x.id === sel ? 'active' : ''} onClick={() => setSel(x.id)}><span className="li-ic"><Icon name="file" /></span><div><b>{x.title}</b><small>{x.version} · {x.updated}</small></div><Status value={x.status} /></li>)}</ul>
      </Card>
      <Card title={p.title} sub={`${p.version} · Updated ${p.updated}`} action={<Status value={p.status} />}>
        <p className="prose">{p.body}</p><p className="prose muted">By acknowledging, you confirm that you have read and understood this policy.</p>
        <button className="btn pri" disabled={p.status === 'Signed'} onClick={() => { patch('policies', p.id, { status: 'Signed' }); notify('Policy acknowledged'); }}>{p.status === 'Signed' ? 'Already signed' : 'I acknowledge'}</button>
      </Card>
    </div></div>
  );
}

export function Appraisal() {
  const { data, patch, notify } = useStore();
  const [openId, setOpenId] = useState(1);
  const [form, setForm] = useState({ self: 4, note: '' });
  return (
    <div className="page">
      {data.appraisals.map(a => {
        const open = openId === a.id; const editable = a.status !== 'Completed' && a.status !== 'Submitted';
        return (
          <section key={a.id} className={'card acc' + (open ? ' open' : '')}>
            <button className="acc-h" onClick={() => setOpenId(open ? 0 : a.id)}>
              <span className="li-ic"><Icon name="award" /></span>
              <div><b>{a.cycle} appraisal</b><small>{a.period}</small></div><span className="grow" /><Status value={a.status} /><Icon name="chevD" className="chev" />
            </button>
            {open && <div className="acc-b">
              <div className="grid g2">
                <div><h5>Self review</h5>{editable ? (<>
                  <label className="field"><span>Self rating: {form.self}</span><input type="range" min="1" max="5" step="0.5" value={form.self} onChange={e => setForm({ ...form, self: +e.target.value })} /></label>
                  <label className="field"><span>Summary of your work</span><textarea className="input" rows={4} value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} placeholder="Highlights, impact and learnings…" /></label>
                  <button className="btn pri" onClick={() => { patch('appraisals', a.id, { status: 'Submitted', self: form.self, note: form.note || 'Submitted.' }); notify('Self appraisal submitted to HR'); }}>Submit to HR</button></>) : (<><Stars value={a.self} /><p className="prose">{a.note}</p></>)}</div>
                <div><h5>Manager review</h5>{a.manager ? <><Stars value={a.manager} /><p className="prose">{a.mNote}</p></> : <p className="muted">Waiting for your manager's rating.</p>}</div>
              </div>
            </div>}
          </section>
        );
      })}
    </div>
  );
}

export function Feedback() {
  const { data, patch, add, notify } = useStore();
  const [tab, setTab] = useState('received'); const [open, setOpen] = useState(false);
  return (
    <div className="page">
      <div className="toolbar"><Tabs tabs={[{ id: 'received', label: 'Received' }, { id: 'requests', label: `Requests (${data.feedbackReq.filter(r => !r.done).length})` }]} value={tab} onChange={setTab} /><span className="grow" />
        <button className="btn pri" onClick={() => setOpen(true)}><Icon name="plus" size={16} />Request feedback</button></div>
      {tab === 'received' ? (
        <div className="grid g3">{data.feedback.map(f => (
          <article key={f.id} className="card goal"><div className="goal-top"><div className="who"><Avatar name={f.from} /><div><b>{f.from}</b><small>{f.role}</small></div></div><Stars value={f.rating} /></div>
            <p className="prose">“{f.text}”</p><div className="chips"><Badge tone="ok">+ {f.strengths}</Badge><Badge tone="warn">↗ {f.growth}</Badge></div></article>
        ))}</div>
      ) : (
        <Card pad={false}><ul className="list">{data.feedbackReq.map(r => (
          <li key={r.id}><Avatar name={r.from} /><div><b>{r.from}</b><small>{r.role} · due {r.due}</small></div>
            {r.done ? <Status value="Completed" /> : <button className="btn sm pri" onClick={() => { patch('feedbackReq', r.id, { done: true }); notify('Feedback sent'); }}>Give feedback</button>}</li>
        ))}</ul></Card>
      )}
      {open && <FormModal title="Request feedback" submitLabel="Send request" onClose={() => setOpen(false)}
        fields={[{ name: 'to', label: 'Ask', type: 'select', options: data.team.map(t => t.name) }, { name: 'note', label: 'Message', type: 'textarea' }]}
        onSubmit={() => notify('Request sent')} />}
    </div>
  );
}

export function Hub() {
  const { data, user, add, notify } = useStore();
  const [tab, setTab] = useState('team'); const [q, setQ] = useState('');
  const [prof, setProf] = useState({ phone: '+91 98765 43210', bio: 'Backend engineer focused on reliability.' });
  return (
    <div className="page">
      <Tabs tabs={[{ id: 'team', label: 'Know your team' }, { id: 'news', label: 'News & events' }, { id: 'gallery', label: 'Gallery' }, { id: 'profile', label: 'My profile' }]} value={tab} onChange={setTab} />
      {tab === 'team' && <><input className="input" placeholder="Search people…" value={q} onChange={e => setQ(e.target.value)} />
        <div className="grid g4">{data.team.filter(p => (p.name + p.title + p.dept).toLowerCase().includes(q.toLowerCase())).map(p => <div key={p.id} className="card pcard"><Avatar name={p.name} size={56} /><b>{p.name}</b><small>{p.title}</small><Badge tone="pri">{p.dept}</Badge></div>)}</div></>}
      {tab === 'news' && <div className="grid g3">{data.news.map(n => <article key={n.id} className="card goal"><Badge tone="info">{n.tag}</Badge><h4>{n.title}</h4><p className="prose">{n.text}</p></article>)}</div>}
      {tab === 'gallery' && <div className="grid g3">{data.gallery.map((g, i) => <div key={g} className="photo" style={{ '--i': i }}><Icon name="image" size={28} /><b>{g}</b></div>)}</div>}
      {tab === 'profile' && <Card title="My profile"><div className="who big"><Avatar name={user.name} size={64} /><div><b>{user.name}</b><small>{user.title} · {user.dept}</small></div></div>
        <div className="form"><label className="field"><span>Phone</span><input className="input" value={prof.phone} onChange={e => setProf({ ...prof, phone: e.target.value })} /></label>
          <label className="field full"><span>About me</span><textarea className="input" rows={3} value={prof.bio} onChange={e => setProf({ ...prof, bio: e.target.value })} /></label>
          <div className="form-actions"><button className="btn pri" onClick={() => notify('Profile saved')}>Save profile</button></div></div></Card>}
    </div>
  );
}

export function Cxo() {
  const { data, add, notify } = useStore();
  return (
    <div className="page"><div className="grid split">
      <Card title="Send a message" sub="To Kavitha Rao, Chief People Officer">
        <CxoForm onSend={v => { add('cxo', { to: 'Kavitha Rao', ...v, status: 'Open', reply: '' }); notify('Message sent to leadership'); }} />
      </Card>
      <Card title="My messages" pad={false}><ul className="list">{data.cxo.map(m => (
        <li key={m.id} className="col"><div className="row"><b>{m.subject}</b><span className="grow" /><Status value={m.status} /></div><small>{m.text}</small>
          {m.reply && <div className="reply"><Icon name="message" size={14} /> {m.reply}</div>}</li>))}</ul></Card>
    </div></div>
  );
}
function CxoForm({ onSend }) {
  const [v, setV] = useState({ subject: '', text: '' });
  return <form className="form" onSubmit={e => { e.preventDefault(); onSend(v); setV({ subject: '', text: '' }); }}>
    <label className="field full"><span>Subject</span><input className="input" required value={v.subject} onChange={e => setV({ ...v, subject: e.target.value })} /></label>
    <label className="field full"><span>Message</span><textarea className="input" rows={5} required value={v.text} onChange={e => setV({ ...v, text: e.target.value })} /></label>
    <div className="form-actions"><button className="btn pri"><Icon name="send" size={15} />Send</button></div></form>;
}
