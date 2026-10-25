import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { StoreProvider, useStore } from './store.jsx';
import { flatNav, navFor } from './data.js';
import { Icon, Brand } from './ui/index.jsx';
import * as E from './views/employee.jsx';
import * as L from './views/leadership.jsx';
import * as A from './views/admin.jsx';
import './base.css';

/* Hook used by every variant's Shell: gives nav groups, current page meta, role switching, theme. */
export function useShell() {
  const s = useStore(); const nav = useNavigate(); const loc = useLocation();
  const groups = navFor(s.role);
  const page = flatNav(s.role).find(n => loc.pathname.startsWith(n.to)) || { title: '', sub: '' };
  return {
    ...s, groups, page, pathname: loc.pathname,
    switchRole: id => { s.setRole(id); nav(s.roles.find(r => r.id === id).home); },
    logout: () => { s.setRole(''); nav('/login'); },
  };
}

function Login() {
  const { roles, setRole, theme, toggleTheme } = useStore(); const nav = useNavigate();
  return (
    <div className="login">
      <button className="icon-btn login-theme" onClick={toggleTheme} aria-label="Toggle theme"><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
      <div className="login-card">
        <Brand full s={0.12} />
        <h1>Sign in to your workspace</h1>
        <p>Choose a portal to explore this interactive prototype. Data you add stays in memory until you reload.</p>
        <div className="role-grid">
          {roles.map(r => (
            <button key={r.id} className="role-card" onClick={() => { setRole(r.id); nav(r.home); }}>
              <span className="role-ic"><Icon name={r.icon} size={22} /></span>
              <b>{r.label}</b><small>{r.desc}</small><Icon name="chevR" className="role-go" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Guard({ Shell }) {
  const { role, toast } = useStore(); const loc = useLocation();
  if (!role) return <Navigate to="/login" replace />;
  const ok = role === 'admin' ? loc.pathname.startsWith('/admin') : role === 'leadership' ? /^\/(uer|lead)\//.test(loc.pathname) : loc.pathname.startsWith('/uer/');
  if (!ok) return <Navigate to="/" replace />;
  return <><Shell><Outlet /></Shell>{toast && <div className="toast"><Icon name="check" size={16} />{toast}</div>}</>;
}

function Home() {
  const { role, roles } = useStore();
  return <Navigate to={role ? roles.find(r => r.id === role).home : '/login'} replace />;
}

const ROUTES = [
  ['uer/dashboard', E.Dashboard], ['uer/goals', E.Goals], ['uer/tasks', E.Tasks], ['uer/leave', E.Leave], ['uer/policies', E.Policies],
  ['uer/appraisal', E.Appraisal], ['uer/feedback', E.Feedback], ['uer/hub', E.Hub], ['uer/cxo', E.Cxo],
  ['lead/overview', L.Overview], ['lead/team', L.Team], ['lead/reports', L.Reports], ['lead/registry', L.Registry], ['lead/records', L.Records], ['lead/disputes', L.Disputes], ['lead/sublogins', L.Sublogins],
  ['admin/dashboard', A.Dashboard], ['admin/companies', A.Companies], ['admin/colleges', A.Colleges], ['admin/users', A.Users], ['admin/verification', A.Verification], ['admin/analytics', A.Analytics], ['admin/revenue', A.Revenue], ['admin/settings', A.Settings],
];

export default function App({ Shell, defaultTheme }) {
  return (
    <StoreProvider defaultTheme={defaultTheme}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Guard Shell={Shell} />}>{ROUTES.map(([p, C]) => <Route key={p} path={p} element={<C />} />)}</Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
}
