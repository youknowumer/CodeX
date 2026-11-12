# Vantage ESS v2.0.0
Employee Self-Service Platform: Dashboard, Profile, Team, Calendar, Leave, Timesheet, Attendance, Tasks, Expenses, Holidays, Delegation, Files, Cases, Reports.

## What is new in 2.0
- Dashboard with KPIs, 7-day hours chart, leave usage and a Needs-attention list
- Tasks board, Expense claims, Company holidays, Reports (CSV export, print/PDF, activity log)
- Working-day leave maths (weekends and holidays skipped), overlap and balance checks
- Ctrl+K global search, per-table filters, input validation, audit trail
- Optional PIN screen lock with auto-lock (screen lock only, data is not encrypted)
- Hardened Electron shell (sandbox, single instance, external links in browser) and installable PWA


## Contents
- `index.html`      The app (works standalone in any browser: just double-click it)
- `website/`        Landing page (its "Launch app" button opens ../index.html)
- `main.js`, `package.json`   Desktop (Electron) wrapper
- `manifest.webmanifest`, `sw.js`   Offline install (PWA) when hosted over https
- `version.json`    Sample update-manifest for the in-app Update centre
- `build/icon.png`  App icon used by the installer

## Run in a browser
Open `index.html`. Data is saved in that browser on this device.

## Run as a desktop app
1. Install Node.js (LTS).
2. `npm install`
3. `npm start`

## Build an installer
`npm run dist` creates .exe (Windows), .dmg (macOS) or AppImage (Linux) in `dist/`.
Build each OS installer on that OS.

## Updates
- The Update centre (sidebar > Updates) shows the version, release notes and a permanent update history.
- To publish a new version: change `VERSION`/`RELEASES` in `index.html`, bump `version` in `package.json`, rebuild.
- Online check: host `version.json` somewhere and paste its URL in Updates > Update server URL.
- Desktop auto-update: set your GitHub `owner` and `repo` under `build.publish` in `package.json`, then publish each build as a GitHub release.

## Your data
Stored only on your device. Use Settings > Export JSON before updating or changing computers.
