import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Brand, Avatar } from '../../shared/ui/index.jsx';
import { AccountMenu } from '../../shared/AccountMenu.jsx';
import { useShell } from '../../shared/App.jsx';
import './theme.css';

export default function Shell({ children }) {
  const { groups, page, user, role, roles, theme, toggleTheme } = useShell();
  return (
    <div className="c-shell">
      <aside className="rail">
        <div className="rail-brand"><Brand s={0.09} /></div>
        <nav>
          {groups.map((g, gi) => (
            <div key={g.group} className="rail-group">
              {gi > 0 && <hr />}
              {g.items.map(n => <NavLink key={n.to} to={n.to} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} title={n.label}><Icon name={n.icon} size={20} /><span>{n.label}</span></NavLink>)}
            </div>
          ))}
        </nav>
        <div className="rail-foot">
          <button className="nav-link" onClick={toggleTheme} title="Toggle theme"><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} /><span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span></button>
          <AccountMenu pos={{ left: 0, bottom: 'calc(100% + 8px)' }}><span className="nav-link"><Avatar name={user.name} size={30} /><span>{user.name}</span></span></AccountMenu>
        </div>
      </aside>
      <div className="c-main">
        <header className="c-top">
          <div className="c-title"><h1>{page.title}</h1><span className="c-sep">/</span><p>{page.sub}</p></div>
          <div className="c-right">
            <label className="search"><Icon name="search" size={16} /><input placeholder="Search…" /><kbd>/</kbd></label>
            <span className="live"><i />{roles.find(r => r.id === role).label}</span>
            <button className="icon-btn bell" aria-label="Notifications"><Icon name="bell" /><i /></button>
          </div>
        </header>
        <main className="c-content">{children}</main>
      </div>
    </div>
  );
}
