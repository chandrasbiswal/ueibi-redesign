import React, { useState, useEffect, useRef } from 'react';
import { Icon, Avatar } from './ui/index.jsx';
import { useShell } from './App.jsx';

/* Dropdown with role switcher, theme toggle and sign out. `children` is the clickable trigger. `pos` = CSS for the menu. */
export function AccountMenu({ children, pos = { right: 0, top: 'calc(100% + 8px)' }, className = '' }) {
  const [open, setOpen] = useState(false); const ref = useRef(null);
  const { role, roles, user, switchRole, logout, theme, toggleTheme } = useShell();
  useEffect(() => {
    const h = e => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div className={'acct ' + className} ref={ref} style={{ position: 'relative' }}>
      <button className="acct-trigger" onClick={() => setOpen(o => !o)} aria-haspopup="menu" aria-expanded={open}>{children}</button>
      {open && (
        <div className="menu" style={pos} role="menu">
          <div className="menu-t">Signed in as</div>
          <div className="who" style={{ padding: '4px 12px 8px' }}><Avatar name={user.name} /><div><b>{user.name}</b><small>{user.title}</small></div></div>
          <hr /><div className="menu-t">Switch portal (demo)</div>
          {roles.map(r => <button key={r.id} className={r.id === role ? 'on' : ''} onClick={() => { setOpen(false); switchRole(r.id); }}><Icon name={r.icon} size={16} />{r.label}{r.id === role && <Icon name="check" size={14} className="push" />}</button>)}
          <hr />
          <button onClick={toggleTheme}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />{theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
          <button onClick={() => { setOpen(false); logout(); }}><Icon name="logout" size={16} />Sign out</button>
        </div>
      )}
    </div>
  );
}
