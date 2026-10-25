import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Brand, Avatar } from '../../shared/ui/index.jsx';
import { AccountMenu } from '../../shared/AccountMenu.jsx';
import { useShell } from '../../shared/App.jsx';
import './theme.css';

export default function Shell({ children }) {
  const { groups, page, user, role, roles, theme, toggleTheme } = useShell();
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sb-brand"><Brand s={0.1} /><div><b>Karyam</b><small>{roles.find(r => r.id === role).label} portal</small></div></div>
        <nav>
          {groups.map(g => (
            <div key={g.group} className="sb-group">
              <div className="sb-title">{g.group}</div>
              {g.items.map(n => <NavLink key={n.to} to={n.to} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}><Icon name={n.icon} size={18} />{n.label}</NavLink>)}
            </div>
          ))}
        </nav>
        <div className="sb-foot">
          <AccountMenu pos={{ left: 0, bottom: 'calc(100% + 8px)' }} className="block">
            <span className="who"><Avatar name={user.name} size={36} /><span><b>{user.name}</b><small>{user.title}</small></span><Icon name="chevD" size={16} className="push" /></span>
          </AccountMenu>
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <div><h1>{page.title}</h1><p>{page.sub}</p></div>
          <div className="tb-right">
            <label className="search"><Icon name="search" size={16} /><input placeholder="Search…" /></label>
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme"><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
            <button className="icon-btn bell" aria-label="Notifications"><Icon name="bell" /><i /></button>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
