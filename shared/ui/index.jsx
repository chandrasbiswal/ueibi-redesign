import React, { useState, useEffect } from 'react';
import logo from '../assets/karyam-logo.jpeg';

const P = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  kanban: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v10"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  shieldPlain: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
  message: '<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.8 0 4.5 1.8 4.5 4.5"/>',
  building: '<rect x="4" y="3" width="12" height="18" rx="1"/><path d="M16 9h4v12h-4M8 7h4M8 11h4M8 15h4"/>',
  grad: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  dollar: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6v1.5M12 16.5V18"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  bell: '<path d="M6 16V11a6 6 0 1112 0v5l2 2H4z"/><path d="M10 21h4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
  moon: '<path d="M20 14A8 8 0 019.5 4 8 8 0 1020 14z"/>',
  logout: '<path d="M9 4H5a1 1 0 00-1 1v14a1 1 0 001 1h4M16 8l4 4-4 4M20 12H9"/>',
  chevL: '<path d="M15 6l-6 6 6 6"/>',
  chevR: '<path d="M9 6l6 6-6 6"/>',
  chevD: '<path d="M6 9l6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M4 20h16"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  trendUp: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  file: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 13h18"/>',
  alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6"/>',
  zap: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  star: '<path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.3l1-6.2L3 9.7l6.2-.9z"/>',
  send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  book: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  id: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.5-2 2-2.5 3-2.5s2.5.5 3 2.5M14 10h4M14 14h3"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>',
  swap: '<path d="M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',
};

export function Icon({ name, size = 18, className = '' }) {
  return (
    <svg className={'ic ' + className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: P[name] || P.grid }} />
  );
}

/* Brand: crops the supplied Karyam logo (mark only, or mark + wordmark). */
export function Brand({ full = false, s = 0.1 }) {
  const style = full
    ? { '--s': s, width: 'calc(var(--s) * 1380px)', height: 'calc(var(--s) * 430px)', backgroundPosition: 'calc(var(--s) * -110px) calc(var(--s) * -180px)' }
    : { '--s': s, width: 'calc(var(--s) * 340px)', height: 'calc(var(--s) * 400px)', backgroundPosition: 'calc(var(--s) * -130px) calc(var(--s) * -195px)' };
  return <span className={'brand-img' + (full ? ' full' : '')} role="img" aria-label="Karyam"
    style={{ ...style, backgroundImage: `url(${logo})`, backgroundSize: 'calc(var(--s) * 1600px) auto' }} />;
}

export function Avatar({ name = '?', size = 32 }) {
  const ini = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360;
  return <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.38, '--h': h }}>{ini}</span>;
}

export const Badge = ({ tone = 'mute', children }) => <span className={'badge ' + tone}>{children}</span>;

const TONES = { approved: 'ok', completed: 'ok', active: 'ok', signed: 'ok', paid: 'ok', open: 'info', pending: 'warn', draft: 'mute', trial: 'warn', inactive: 'bad', rejected: 'bad', archived: 'mute', high: 'bad', medium: 'warn', low: 'mute', closed: 'mute', resolved: 'ok', submitted: 'info', escalated: 'bad', 'in review': 'info', 'on hold': 'warn', critical: 'bad', replied: 'ok', 'at risk': 'warn', 'on track': 'ok' };
export const Status = ({ value }) => <Badge tone={TONES[String(value).toLowerCase()] || 'mute'}>{value}</Badge>;

export function Progress({ value, tone }) {
  return <div className="progress"><i className={tone || ''} style={{ width: Math.min(100, value) + '%' }} /></div>;
}

export function Toggle({ on, onChange }) {
  return <button type="button" className={'toggle' + (on ? ' on' : '')} onClick={() => onChange(!on)} role="switch" aria-checked={on}><i /></button>;
}

export function Tabs({ tabs, value, onChange }) {
  return <div className="tabs">{tabs.map(t => {
    const v = typeof t === 'string' ? t : t.id, l = typeof t === 'string' ? t : t.label;
    return <button key={v} className={'tab' + (v === value ? ' active' : '')} onClick={() => onChange(v)}>{l}</button>;
  })}</div>;
}

export function Card({ title, sub, action, children, className = '', pad = true }) {
  return (
    <section className={'card ' + className}>
      {(title || action) && <header className="card-h"><div><h3>{title}</h3>{sub && <p>{sub}</p>}</div>{action}</header>}
      <div className={pad ? 'card-b' : ''}>{children}</div>
    </section>
  );
}

export function Stat({ icon, label, value, delta, tone = 'pri', hero, children }) {
  return (
    <div className={'stat' + (hero ? ' hero-stat' : '')}>
      <div className="stat-top">
        {icon && <span className={'stat-ic ' + tone}><Icon name={icon} size={18} /></span>}
        {delta && <span className={'delta ' + (String(delta).startsWith('-') ? 'down' : 'up')}>{delta}</span>}
      </div>
      <div className="stat-v">{value}</div>
      <div className="stat-l">{label}</div>
      {children}
    </div>
  );
}

export const Empty = ({ text = 'Nothing here yet.' }) => <div className="empty">{text}</div>;

export function Modal({ title, onClose, children }) {
  useEffect(() => {
    const k = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div className="modal-back" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true">
        <header><h3>{title}</h3><button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="x" /></button></header>
        <div className="modal-b">{children}</div>
      </div>
    </div>
  );
}

/* fields: [{name,label,type?:'text'|'number'|'select'|'textarea'|'date',options?,required?,placeholder?,full?}] */
export function FormModal({ title, fields, initial = {}, submitLabel = 'Save', onSubmit, onClose }) {
  const [v, setV] = useState(() => {
    const o = { ...initial };
    fields.forEach(f => { if (o[f.name] == null) o[f.name] = f.type === 'select' ? (f.options[0].value ?? f.options[0]) : ''; });
    return o;
  });
  const set = (n, x) => setV(s => ({ ...s, [n]: x }));
  const submit = e => {
    e.preventDefault();
    const out = { ...v };
    fields.forEach(f => { if (f.type === 'number') out[f.name] = Number(out[f.name]) || 0; });
    onSubmit(out); onClose();
  };
  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={submit} className="form">
        {fields.map(f => (
          <label key={f.name} className={'field' + (f.full || f.type === 'textarea' ? ' full' : '')}>
            <span>{f.label}{f.required && ' *'}</span>
            {f.type === 'select' ? (
              <select className="input" value={v[f.name]} onChange={e => set(f.name, e.target.value)}>
                {f.options.map(o => { const val = o.value ?? o, lab = o.label ?? o; return <option key={val} value={val}>{lab}</option>; })}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea className="input" rows={4} required={f.required} placeholder={f.placeholder} value={v[f.name]} onChange={e => set(f.name, e.target.value)} />
            ) : (
              <input className="input" type={f.type || 'text'} required={f.required} placeholder={f.placeholder} value={v[f.name]} onChange={e => set(f.name, e.target.value)} />
            )}
          </label>
        ))}
        <div className="form-actions"><button type="button" className="btn ghost" onClick={onClose}>Cancel</button><button className="btn pri">{submitLabel}</button></div>
      </form>
    </Modal>
  );
}

export function SearchBox({ value, onChange, placeholder = 'Search…' }) {
  return <div className="search"><Icon name="search" size={16} /><input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} /></div>;
}

/* ---------- Charts (SVG, themed through CSS variables) ---------- */
const COL = ['var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)'];
function smooth(pts) {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}
let gidN = 0;

export function LineChart({ series, labels, h = 220, fmt = v => v, min, max }) {
  const [gid] = useState(() => 'g' + ++gidN);
  const W = 640, L = 44, R = 12, T = 12, B = 26;
  const all = series.flatMap(s => s.data);
  const lo = min != null ? min : Math.min(0, ...all), hi = max != null ? max : Math.max(...all);
  const x = i => L + (i * (W - L - R)) / Math.max(1, labels.length - 1);
  const y = v => T + (h - T - B) * (1 - (v - lo) / (hi - lo || 1));
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${h}`} role="img">
        {[0, 1, 2, 3, 4].map(i => { const v = lo + ((hi - lo) * i) / 4; return <g key={i}><line className="grid" x1={L} x2={W - R} y1={y(v)} y2={y(v)} /><text className="axis" x={L - 8} y={y(v) + 4} textAnchor="end">{fmt(Math.round(v * 10) / 10)}</text></g>; })}
        {labels.map((l, i) => <text key={i} className="axis" x={x(i)} y={h - 6} textAnchor="middle">{l}</text>)}
        {series.map((s, si) => {
          const pts = s.data.map((v, i) => [x(i), y(v)]), d = smooth(pts), col = COL[si % 4];
          return <g key={si}>
            {si === 0 && <><defs><linearGradient id={gid} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={col} stopOpacity=".28" /><stop offset="1" stopColor={col} stopOpacity="0" /></linearGradient></defs>
              <path d={`${d} L${x(s.data.length - 1)},${y(lo)} L${x(0)},${y(lo)} Z`} fill={`url(#${gid})`} /></>}
            <path d={d} fill="none" stroke={col} strokeWidth="2.4" strokeLinecap="round" strokeDasharray={s.dashed ? '5 5' : undefined} />
            {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3.2" className="dot" stroke={col} strokeWidth="2" />)}
          </g>;
        })}
      </svg>
      {series.length > 1 && <div className="legend">{series.map((s, i) => <span key={i}><i style={{ background: COL[i % 4] }} />{s.name}</span>)}</div>}
    </div>
  );
}

export function BarChart({ series, labels, h = 220, max }) {
  const W = 640, L = 36, R = 8, T = 10, B = 26;
  const hi = max || Math.max(...series.flatMap(s => s.data)) * 1.1;
  const y = v => T + (h - T - B) * (1 - v / hi);
  const gw = (W - L - R) / labels.length, bw = Math.min(26, (gw * 0.7) / series.length);
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${h}`}>
        {[0, 1, 2, 3, 4].map(i => { const v = (hi * i) / 4; return <g key={i}><line className="grid" x1={L} x2={W - R} y1={y(v)} y2={y(v)} /><text className="axis" x={L - 6} y={y(v) + 4} textAnchor="end">{Math.round(v * 10) / 10}</text></g>; })}
        {labels.map((l, i) => {
          const cx = L + gw * i + gw / 2;
          return <g key={i}><text className="axis" x={cx} y={h - 6} textAnchor="middle">{l}</text>
            {series.map((s, si) => { const by = y(s.data[i]); return <rect key={si} x={cx - (bw * series.length) / 2 + si * bw + 1} y={by} width={bw - 2} height={Math.max(0, h - B - by)} rx="4" fill={s.color || COL[si % 4]} />; })}</g>;
        })}
      </svg>
      {series.length > 1 && <div className="legend">{series.map((s, i) => <span key={i}><i style={{ background: s.color || COL[i % 4] }} />{s.name}</span>)}</div>}
    </div>
  );
}

export function Donut({ segs, center, sub, stroke = 16, size = 160 }) {
  const r = 62, c = 2 * Math.PI * r, total = segs.reduce((a, s) => a + s.value, 0) || 1;
  let off = 0;
  return (
    <svg className="donut" width={size} height={size} viewBox="0 0 160 160">
      <circle cx="80" cy="80" r={r} fill="none" className="d-track" strokeWidth={stroke} />
      {segs.map((s, i) => { const len = (s.value / total) * c; const el = <circle key={i} cx="80" cy="80" r={r} fill="none" stroke={s.color || COL[i % 4]} strokeWidth={stroke} strokeDasharray={`${Math.max(0, len - 2)} ${c - len + 2}`} strokeDashoffset={-off} transform="rotate(-90 80 80)" />; off += len; return el; })}
      {center != null && <><text x="80" y="82" textAnchor="middle" className="d-val">{center}</text><text x="80" y="102" textAnchor="middle" className="d-sub">{sub}</text></>}
    </svg>
  );
}

export const Ring = ({ pct, sub, size = 150 }) => <Donut size={size} stroke={14} segs={[{ value: pct, color: 'var(--c1)' }, { value: 100 - pct, color: 'transparent' }]} center={pct + '%'} sub={sub} />;

export function Spark({ data, color = 'var(--c1)' }) {
  const W = 100, H = 30, mn = Math.min(...data), mx = Math.max(...data);
  const pts = data.map((v, i) => [(i * W) / (data.length - 1), H - 3 - ((v - mn) / (mx - mn || 1)) * (H - 6)]);
  return <svg className="spark" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"><path d={smooth(pts)} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" /></svg>;
}

export const Stars = ({ value }) => <span className="stars"><Icon name="star" size={14} />{Number(value).toFixed(1)}</span>;
