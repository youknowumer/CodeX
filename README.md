# Vantage ESS v4.0.0
Employee Self-Service Platform: Dashboard, Profile, Team, Calendar, Leave, Timesheet, Attendance, Tasks, Expenses, Holidays, Delegation, Files, Cases, Reports.

## What is new in 4.0
- **iOS design**: frosted sidebar, large titles, sheet dialogs, iOS switches and system colours (light and dark), spring motion, count-up numbers, reduced-motion support
- **Connections**: Odoo 19+ (JSON-2), Odoo JSON-RPC, ERPNext, SAP OData, Dynamics 365, Shopify, Airtable, Supabase, Google Sheets CSV and any REST API. Automatic paging, retry with backoff, same-origin paging links, scheduled auto-sync, health panel
- **Outgoing webhook**: signed (HMAC-SHA256) events for every create/update/delete and check-in/out, with an offline retry queue
- **Business records** module, calendar .ics export, offline indicator

## What was new in 3.0
- **ERP connections**: ERPNext, Odoo, SAP OData, Dynamics 365, any REST/JSON API, plus CSV/JSON import. Read-only sync with field-mapping JSON; records upsert by ERP id
- **Home widgets**: add, move, resize, remove; custom KPI, chart, list and note widgets from any data (including synced ERP data)
- **Report builder**: data, group, measure, date range; save, pin to Home, CSV, print/PDF
- **Theme gallery** with corner style and font
- Desktop app proxies ERP calls through the main process (no CORS); secrets are excluded from backups

## What was new in 2.0
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

## Connecting an ERP
Connections > Add connection. Pick the system, enter URL and credentials (Odoo also needs the database name). Edit the mapping JSON if your fields differ, then Test and Sync now. Sync is pull-only. In a browser, ERPs that do not send CORS headers will be blocked; use the desktop app. OAuth login flows are not built in: paste a bearer/API token.
