import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { initialData, USERS, ROLES, flatNav } from './data.js';

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

export function StoreProvider({ children, defaultTheme = 'light' }) {
  const [data, setData] = useState(initialData);
  const [role, setRoleState] = useState(() => localStorage.getItem('kr-role') || '');
  const [theme, setTheme] = useState(() => localStorage.getItem('kr-theme') || defaultTheme);
  const [toast, setToast] = useState('');

  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('kr-theme', theme); }, [theme]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(''), 2400); return () => clearTimeout(t); } }, [toast]);

  const setRole = useCallback(r => { setRoleState(r); r ? localStorage.setItem('kr-role', r) : localStorage.removeItem('kr-role'); }, []);
  const nextId = list => list.reduce((m, x) => Math.max(m, typeof x.id === 'number' ? x.id : 0), 0) + 1;

  const api = useMemo(() => ({
    add: (key, item) => setData(d => ({ ...d, [key]: [{ ...item, id: item.id ?? nextId(d[key]) }, ...d[key]] })),
    patch: (key, id, p) => setData(d => ({ ...d, [key]: d[key].map(x => x.id === id ? { ...x, ...(typeof p === 'function' ? p(x) : p) } : x) })),
    del: (key, id) => setData(d => ({ ...d, [key]: d[key].filter(x => x.id !== id) })),
  }), []);

  const value = {
    data, ...api, role, setRole, theme, toggleTheme: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')),
    user: USERS[role] || null, roles: ROLES, nav: flatNav(role), toast, notify: setToast,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
