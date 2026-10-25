# UEIBI / Karyam UI Redesign

Three corporate redesigns of the full workable UI (Employee, Leadership, Super Admin portals), built with React 19 + Vite. All data is mock and in-memory: you can add, edit and delete items, and everything resets on reload. The chosen role and theme persist in localStorage.

| Variant | Folder | Look | Dev port |
|---|---|---|---|
| A · Horizon | `variants/a-horizon` | Light, left sidebar, Karyam blue and green | 5171 |
| B · Meridian | `variants/b-meridian` | Warm neutral, two-tier top nav, serif headings | 5172 |
| C · Nocturne | `variants/c-nocturne` | Dark-first, compact icon rail, glass top bar | 5173 |

All variants support light and dark mode.

## Run

Requires Node 20 (Node 22 + npm 10.8 had install issues on our machines).

```bash
npm install
npm run dev:a   # or dev:b / dev:c
npm run build   # outputs dist/a-horizon, dist/b-meridian, dist/c-nocturne
```

`dist/*` uses hash routing and relative paths, so each folder can be deployed to any static host.

## Structure

- `shared/`: components (`ui/`), screens (`views/`), mock data, store, routes and the base styles. They are driven by CSS variables.
- `variants/<x>/`: only a `Shell.jsx` (layout), `theme.css` (tokens and overrides) and `main.jsx`.
- Roles: Employee (`/uer/*`), Leadership (`/lead/*`), Super Admin (`/admin/*`). Switch roles from the account menu.
