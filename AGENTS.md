# AGENTS.md

## Scope
- Primary app code is in `my-app/src`; root `package.json` is not the frontend runtime.
- Existing AI guidance source: `my-app/README.md` (standard CRA defaults only).

## Current Runtime Shape (Important)
- The codebase is in a **CRA/Vite transition state**:
  - CRA entry still exists in `my-app/src/index.js` and scripts in `my-app/package.json` use `react-scripts`.
  - Vite-style entry exists in `my-app/src/main.jsx` with `BrowserRouter`, `AuthProvider`, and `ThemeProvider`.
  - Vite config exists in `my-app/vite.config.js`; Tailwind config exists in `my-app/tailwind.config.js`.
- Before feature work, decide which entrypoint is authoritative (`index.js` vs `main.jsx`).

## Architecture Map
- Routing shell: `my-app/src/App.jsx`.
  - Routes: `/`, `/login`, `/architecture`, `/admin`, wildcard redirect to `/`.
  - `/admin` is wrapped with `ProtectedRoute requiredRole="admin"`.
- Global state via Context:
  - `my-app/src/context/AuthContext.jsx` handles user session + role checks.
  - `my-app/src/context/ThemeContext.js` handles dark mode flag and toggling.
- Reusable UI primitives in `my-app/src/components`:
  - `Button.jsx`, `Card.jsx`, `Navbar.jsx`, `PageLayout.jsx`.
- Feature modules currently present: only `my-app/src/features/home/pages/HomePage.jsx`.

## Data and Cross-Component Flow
- Auth flow:
  - `AuthContext` exposes `user`, `isAdmin`, `login`, `logout`.
  - `ProtectedRoute` redirects unauthenticated users to `/login` and checks admin role.
  - `Navbar` consumes auth state to show Login/Logout and admin nav item.
- Theme flow:
  - `ThemeContext` toggles `dark` class on `document.documentElement`.
  - Components rely on Tailwind `dark:` utility classes.

## Styling and Conventions
- Utility-first styling is used directly in JSX class strings (Tailwind-style classes).
- `my-app/src/index.css` contains `@tailwind base/components/utilities`; preserve this order.
- Prefer adding reusable UI in `my-app/src/components` and route/page logic under `my-app/src/features/<feature>/pages`.

## Known Breakpoints to Address First
- `my-app/src/App.jsx` imports pages that do not exist yet:
  - `features/auth/pages/LoginPage`
  - `features/admin/pages/AdminPage`
  - `features/architecture/pages/ArchitecturePage`
- `my-app/src/hooks/useLocalStorage.js` currently contains app bootstrap code, not a hook implementation.
- `my-app/src/App.js` and `my-app/src/index.js` are legacy CRA files and may conflict with `App.jsx` + `main.jsx` flow.

## Developer Commands (from files)
- From `my-app/`:
  - `npm start`
  - `npm test`
  - `npm run build`
- Tests are wired through Jest + RTL (`my-app/src/setupTests.js`).

