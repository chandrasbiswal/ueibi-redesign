import React, { useState } from 'react';
import { useStore } from '../store.jsx';
import { Icon, Badge, Status, Progress, Tabs, Card, Empty, FormModal, Stars, Modal } from '../ui/index.jsx';

export const PRI = { Critical: 'bad', High: 'bad', Medium: 'warn', Low: 'mute' };
export const FYS = ['FY 2026-27', 'FY 2025-26', 'FY 2024-25'];
export const CATS = ['Technical', 'People', 'Product', 'Culture', 'Operations', 'Learning', 'Leadership', 'Finance'];
export const COLS = [['assigned', 'Assigned (Dependent)', '#6366f1'], ['high', 'High Priority', '#ef4444'], ['week', 'Due Today / This Week', '#f59e0b'], ['hold', 'Pending on Others (Hold)', '#ec4899'], ['review', 'In Review', '#8b5cf6'], ['done', 'Archived / Done', '#10b981'], ['private', 'Private Task', '#64748b']];

export const goalProgress = (g, tasks) => {
  const ts = tasks.filter(t => t.goalId === g.id);
  return ts.length ? Math.round((ts.filter(t => t.col === 'done').length / ts.length) * 100) : g.progress;
};

/* Add-task modal. `assignees` lets managers pick a person; employees assign to themselves. */
export function TaskForm({ goals, goalId, assignees, onClose }) {
  const { add, notify, user } = useStore();
  const fields = [
    { name: 'title', label: 'Task title', required: true, full: true },
    { name: 'goalId', label: 'Linked goal', type: 'select', options: goals.map(g => ({ value: g.id, label: g.title })) },
    ...(assignees ? [{ name: 'assignee', label: 'Assign to', type: 'select', options: assignees }] : []),
    { name: 'priority', label: 'Priority', type: 'select', options: ['High', 'Medium', 'Low', 'Critical'] },
    { name: 'due', label: 'Due date', type: 'date' },
    { name: 'tags', label: 'Tags', placeholder: 'backend, api' },
    { name: 'private', label: 'Visibility', type: 'select', options: ['Team', 'Private'] },
  ];
  return <FormModal title="Add task" submitLabel="Add task" fields={fields} initial={{ goalId: goalId ?? goals[0]?.id }} onClose={onClose}
    onSubmit={v => {
      add('tasks', { title: v.title, goalId: Number(v.goalId), assignee: v.assignee || user.name, priority: v.priority, due: v.due || 'TBD', tags: v.tags, col: v.private === 'Private' ? 'private' : 'assigned', rating: 0 });
      notify('Task added');
    }} />;
}

export function GoalForm({ initial, onClose, mine = true, edit = false }) {
  const { add, patch, notify, user } = useStore();
  const fields = [
    { name: 'title', label: 'Goal title', required: true, full: true },
    { name: 'category', label: 'Category', type: 'select', options: CATS },
    { name: 'priority', label: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] },
    { name: 'weight', label: 'Weightage %', type: 'number' },
    { name: 'fy', label: 'Financial year', type: 'select', options: FYS },
    { name: 'target', label: 'Target date', type: 'date' },
    { name: 'visibility', label: 'Visibility', type: 'select', options: ['Public', 'Private'] },
  ];
  return <FormModal title={edit ? 'Edit goal' : 'Create new goal'} fields={fields} initial={initial || { weight: 10, fy: 'FY 2025-26' }} submitLabel={edit ? 'Save' : 'Create goal'} onClose={onClose}
    onSubmit={v => { if (edit) patch('goals', initial.id, v); else add('goals', { ...v, progress: 0, status: mine ? 'Draft' : 'Approved', rating: 0, assignedBy: mine ? 'Self Created' : user.name, target: v.target || '2026-12-31' }); notify(edit ? 'Goal updated' : 'Goal created'); }} />;
}

function RateModal({ task, onClose }) {
  const { patch, notify } = useStore();
  const [r, setR] = useState(4); const [c, setC] = useState('');
  return (
    <Modal title={'Approve & rate · ' + task.title} onClose={onClose}>
      <form className="form" onSubmit={e => { e.preventDefault(); patch('tasks', task.id, { col: 'done', rating: Number(r), remark: c }); notify('Task approved & rated'); onClose(); }}>
        <label className="field"><span>Rating (1–5)</span><input className="input" type="number" min="1" max="5" step="0.5" value={r} onChange={e => setR(e.target.value)} /></label>
        <label className="field full"><span>Comment</span><textarea className="input" rows={3} value={c} onChange={e => setC(e.target.value)} /></label>
        <div className="form-actions"><button type="button" className="btn ghost" onClick={onClose}>Cancel</button><button className="btn pri">Approve & rate</button></div>
      </form>
    </Modal>
  );
}

/* Expandable goal list. `owner` mode (manager) shows rate/approve actions and assignee picker. */
export function GoalList({ owner = false, assignees }) {
  const { data, patch, del, notify, user } = useStore();
  const [fy, setFy] = useState('All'); const [cat, setCat] = useState('All'); const [pri, setPri] = useState('All'); const [st, setSt] = useState('All');
  const [openId, setOpenId] = useState(null); const [goalOpen, setGoalOpen] = useState(false); const [edit, setEdit] = useState(null); const [taskFor, setTaskFor] = useState(null); const [rate, setRate] = useState(null);
  const list = data.goals.filter(g => (fy === 'All' || g.fy === fy) && (cat === 'All' || g.category === cat) && (pri === 'All' || g.priority === pri) && (st === 'All' || g.status === st));
  const avg = list.length ? Math.round(list.reduce((a, g) => a + goalProgress(g, data.tasks), 0) / list.length) : 0;
  const sel = (label, v, set, opts) => <label className="fl"><span>{label}</span><select className="input sm" value={v} onChange={e => set(e.target.value)}>{opts.map(x => <option key={x}>{x}</option>)}</select></label>;
  return (
    <div className="page">
      <div className="toolbar"><span className="grow" /><button className="btn pri" onClick={() => setGoalOpen(true)}><Icon name="plus" size={16} />{owner ? 'Create goal' : 'Create new goal'}</button></div>
      <Card><div className="filters">
        {sel('Financial year', fy, setFy, ['All', ...FYS])}{sel('Category', cat, setCat, ['All', ...CATS])}{sel('Priority', pri, setPri, ['All', 'High', 'Medium', 'Low'])}{sel('Status', st, setSt, ['All', 'Draft', 'Approved', 'Completed', 'Archived'])}
        <span className="grow" /><div className="avg"><b>{avg}%</b><small>AVG PROGRESS (FILTERED)</small></div></div></Card>
      {!list.length && <Empty text="No goals match these filters." />}
      {list.map(g => {
        const ts = data.tasks.filter(t => t.goalId === g.id); const open = openId === g.id; const pr = goalProgress(g, data.tasks);
        return (
          <article key={g.id} className={'card gcard' + (open ? ' open' : '')}>
            <div className="g-head" onClick={() => setOpenId(open ? null : g.id)}>
              <Icon name="chevD" className="chev" />
              <span className="g-ic"><Icon name="target" size={20} /></span>
              <div className="g-main"><h4>{g.title}</h4>
                <div className="chips"><Badge>{g.category}</Badge><Badge tone={PRI[g.priority]}>{g.priority}</Badge><Badge tone="pri">{g.weight}% weightage</Badge><Badge tone={g.visibility === 'Private' ? 'warn' : 'ok'}>{g.visibility}</Badge></div>
                <small className="muted">Tasks & Milestones ({ts.length})</small></div>
              <div className="g-meta"><div><small>ASSIGNED BY</small><b>{g.assignedBy}</b></div><div><small>TARGET DATE</small><b>{g.target}</b></div><div><small>TASKS</small><b>{ts.length}</b></div>
                <div className="g-prog"><small>GOAL PROGRESS</small><div className="prog-row"><Progress value={pr} tone={pr >= 100 ? 'ok' : ''} /><b>{pr}%</b></div></div>
                {g.rating ? <div><small>GOAL RATING</small><Stars value={g.rating} /></div> : null}</div>
              <Status value={g.status} />
              <span className="g-act" onClick={e => e.stopPropagation()}>
                {g.status === 'Draft' && <button className="btn sm" onClick={() => { patch('goals', g.id, { status: 'Approved' }); notify('Goal submitted & approved'); }}>Submit</button>}
                {owner && g.status === 'Approved' && pr >= 100 && <button className="btn sm" onClick={() => { patch('goals', g.id, { status: 'Completed', rating: 4.5 }); notify('Goal completed'); }}>Complete</button>}
                <button className="icon-btn" aria-label="Edit goal" onClick={() => setEdit(g)}><Icon name="edit" size={15} /></button>
                <button className="icon-btn" aria-label="Delete goal" onClick={() => { del('goals', g.id); notify('Goal deleted'); }}><Icon name="trash" size={15} /></button>
              </span>
            </div>
            {open && (
              <div className="g-body">
                <div className="toolbar"><b>Tasks & milestones</b><span className="grow" /><button className="btn sm pri" onClick={() => setTaskFor(g.id)}><Icon name="plus" size={14} />Add task</button></div>
                {!ts.length ? <Empty text="No tasks yet. Add the first task for this goal." /> : (
                  <div className="table-wrap"><table className="tbl"><thead><tr><th>Task</th><th>Assignee</th><th>Priority</th><th>Due</th><th>Stage</th><th>Rating</th><th /></tr></thead>
                    <tbody>{ts.map(t => <tr key={t.id}><td><b>{t.title}</b>{t.tags && <small className="muted"> {t.tags}</small>}</td><td>{t.assignee}</td><td><Badge tone={PRI[t.priority]}>{t.priority}</Badge></td><td>{t.due}</td>
                      <td><select className="input sm" value={t.col} onChange={e => patch('tasks', t.id, { col: e.target.value })}>{COLS.map(c => <option key={c[0]} value={c[0]}>{c[1]}</option>)}</select></td>
                      <td>{t.rating ? <Stars value={t.rating} /> : '—'}</td>
                      <td className="right"><span className="chips" style={{ justifyContent: 'flex-end' }}>
                        {owner && t.col === 'review' && <button className="btn sm pri" onClick={() => setRate(t)}>Approve & rate</button>}
                        <button className="icon-btn" aria-label="Delete task" onClick={() => del('tasks', t.id)}><Icon name="trash" size={14} /></button></span></td></tr>)}</tbody></table></div>
                )}
              </div>
            )}
          </article>
        );
      })}
      {goalOpen && <GoalForm mine={!owner} onClose={() => setGoalOpen(false)} />}
      {edit && <GoalForm edit initial={edit} onClose={() => setEdit(null)} />}
      {taskFor && <TaskForm goals={data.goals} goalId={taskFor} assignees={owner ? assignees : undefined} onClose={() => setTaskFor(null)} />}
      {rate && <RateModal task={rate} onClose={() => setRate(null)} />}
    </div>
  );
}

export function TaskBoard() {
  const { data, patch, del, user } = useStore();
  const [view, setView] = useState('board'); const [open, setOpen] = useState(false); const [drag, setDrag] = useState(null); const [fy, setFy] = useState('FY 2025-26');
  const goalOf = t => data.goals.find(g => g.id === t.goalId);
  const mine = data.tasks.filter(t => t.assignee === user.name && (!goalOf(t) || goalOf(t).fy === fy || t.col === 'private'));
  const goals = data.goals.filter(g => g.fy === fy);
  const move = (t, dir) => { const i = COLS.findIndex(c => c[0] === t.col) + dir; if (COLS[i]) patch('tasks', t.id, { col: COLS[i][0] }); };
  return (
    <div className="page">
      <div className="toolbar">
        <label className="fl row"><Icon name="calendar" size={16} /><span>Financial year:</span><select className="input sm" value={fy} onChange={e => setFy(e.target.value)}>{FYS.map(x => <option key={x}>{x}</option>)}</select></label>
        <span className="grow" />
        <Tabs tabs={[{ id: 'board', label: 'Kanban board' }, { id: 'list', label: 'List view' }]} value={view} onChange={setView} />
        <button className="btn pri" onClick={() => setOpen(true)} disabled={!goals.length && false}><Icon name="plus" size={16} />Add task</button>
      </div>
      {view === 'board' ? (
        <div className="kanban k7">
          {COLS.map(([id, label, color]) => {
            const items = mine.filter(t => t.col === id);
            return (
              <div key={id} className="kcol" onDragOver={e => e.preventDefault()} onDrop={() => { if (drag) patch('tasks', drag, { col: id }); setDrag(null); }}>
                <header><b><i className="kdot" style={{ background: color }} />{label}</b><span className="count">{items.length}</span></header>
                {items.map(t => (
                  <div key={t.id} className={'kcard p-' + t.priority.toLowerCase()} draggable onDragStart={() => setDrag(t.id)}>
                    <b>{t.title}</b>
                    {goalOf(t) && <span className="glink"><Icon name="target" size={12} />Goal: {goalOf(t).title}</span>}
                    {t.tags && <div className="chips">{t.tags.split(',').map(x => <Badge key={x}>{x.trim()}</Badge>)}</div>}
                    <div className="kc-top"><Badge tone={PRI[t.priority]}>{t.priority}</Badge><small>Due: {t.due}</small></div>
                    {t.rating ? <Stars value={t.rating} /> : null}
                    <div className="kc-actions">
                      <button className="icon-btn" disabled={id === COLS[0][0]} onClick={() => move(t, -1)} aria-label="Move back"><Icon name="chevL" size={14} /></button>
                      <button className="icon-btn" disabled={id === 'done'} onClick={() => move(t, 1)} aria-label="Move forward"><Icon name="chevR" size={14} /></button>
                      <button className="icon-btn" onClick={() => del('tasks', t.id)} aria-label="Delete"><Icon name="trash" size={14} /></button>
                    </div>
                  </div>
                ))}
                {!items.length && <div className="kempty">No tasks</div>}
              </div>
            );
          })}
        </div>
      ) : (
        <Card pad={false}><div className="table-wrap"><table className="tbl"><thead><tr><th>Task</th><th>Goal</th><th>Priority</th><th>Due</th><th>Stage</th></tr></thead>
          <tbody>{mine.map(t => <tr key={t.id}><td><b>{t.title}</b></td><td>{goalOf(t)?.title || '—'}</td><td><Badge tone={PRI[t.priority]}>{t.priority}</Badge></td><td>{t.due}</td>
            <td><select className="input sm" value={t.col} onChange={e => patch('tasks', t.id, { col: e.target.value })}>{COLS.map(c => <option key={c[0]} value={c[0]}>{c[1]}</option>)}</select></td></tr>)}</tbody></table>{!mine.length && <Empty text="No tasks for this year." />}</div></Card>
      )}
      {open && <TaskForm goals={goals.length ? goals : data.goals} onClose={() => setOpen(false)} />}
    </div>
  );
}
