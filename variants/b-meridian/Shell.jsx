import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Brand, Avatar } from '../../shared/ui/index.jsx';
import { AccountMenu } from '../../shared/AccountMenu.jsx';
import { useShell } from '../../shared/App.jsx';
import './theme.css';

export default function Shell({ children }) {
  const { groups, page, user, role, roles, theme, toggleTheme } = useShell();
  return (
    <div className="b-shell">
      <header className="b-top">
        <div className="b-top-in">
          <Brand full s={0.085} />
          <span className="grow" />
          <label className="search"><Icon name="search" size={16} /><input placeholder="Search people, goals, reports…" /></label>
          <span className="role-chip">{roles.find(r => r.id === role).label}</span>
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme"><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
          <button className="icon-btn bell" aria-label="Notifications"><Icon name="bell" /><i /></button>
          <AccountMenu><span className="who"><Avatar name={user.name} size={34} /><span className="who-t"><b>{user.name}</b><small>{user.title}</small></span><Icon name="chevD" size={15} /></span></AccountMenu>
        </div>
        <nav className="b-nav">
          <div className="b-nav-in">
            {groups.map((g, gi) => (
              <React.Fragment key={g.group}>
                {gi > 0 && <span className="b-sep" aria-hidden="true" />}
                {g.items.map(n => <NavLink key={n.to} to={n.to} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}><Icon name={n.icon} size={16} />{n.label}</NavLink>)}
              </React.Fragment>
            ))}
          </div>
        </nav>
      </header>
      <main className="b-main">
        <div className="b-head"><span className="crumb">{roles.find(r => r.id === role).label} / {page.title}</span><h1>{page.title}</h1><p>{page.sub}</p></div>
        {children}
      </main>
    </div>
  );
}
