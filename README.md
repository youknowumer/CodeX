# Vantage ESS v4.5.0
Employee Self-Service Platform: Dashboard, Profile, Team, Calendar, Leave, Timesheet, Attendance, Tasks, Expenses, Holidays, Delegation, Files, Cases, Reports.

## What is new in 4.5
- **Mobile navigation fixed**: iOS-style bottom tab bar (Home, Calendar, Leave, Attendance, More), compact icon-only top bar, sign out in the menu drawer, safe-area aware
- **Notification centre**: bell with unread badge for leave, tasks, events, holidays, training expiry, asset returns, unacknowledged policies, goals at risk and stale backups
- **Detailing pass**: richer fields, auto reference numbers, created/edited stamps, status history, sortable and filterable tables
- **New modules**: Goals, Learning, Payslips (printable), Assets, Policies (acknowledge), Recognition. Validation, CSV export and Ctrl+K search included

## Unreleased (next version)
- **Organization wizard**: first visit is now two steps. Step 1 captures industry, size, country and the ERP the company uses (Odoo, ERPNext, SAP, Dynamics 365, NetSuite, Zoho, Tally, QuickBooks, custom or none). Step 2 creates the administrator
- **Organization profile** card on the Users page (admin can edit it later)
- **Field map**: each person can have a work area (site name, coordinates, radius circle). Admin sees everyone and places people by clicking the map; managers see their department; employees see only themselves. Search, department filter, "use my current location". Map tiles need internet (Leaflet + OpenStreetMap)

## What is new in 4.4
- **Create account / sign-up**: the login page has a Create account tab. A new person requests access; the admin approves (or deletes) the request in Users. The admin can switch sign-up requests off in Settings > Organization

## What was new in 4.3
- **Personalised**: the admin sets the organization name and brand colour (Settings > Organization) and it becomes the default look for everyone; sign-in remembers the last user and greets them by name; Settings > Account shows role and last sign-in
- **Alignment pass**: uniform top-bar control heights, consistent sidebar icons (Users now has one), aligned colour swatches, tidy Users table

## What was new in 4.2
- **Organization setup**: the first visit to `login.html` asks for the organization name and creates its administrator (with a one-time recovery code). Public sign-up is closed
- **Admin creates users**: Administration > Users. Add users with role (admin / manager / employee) and department, auto-generated temporary password (forced change at first sign-in), edit, reset password, disable/enable, delete. At least one active admin is always kept
- **Roles**: admins see Users; employees get a focused menu without ERP connections
- **Cleaner portal**: menu groups collapse (state remembered) and can be filtered; on phones the menu is a slide-in drawer instead of a crowded tab bar
- Each user has a private workspace; the first admin keeps the data that existed before. Users get their profile pre-filled from the account

## What was new in 4.1
- **Flow**: `index.html` (landing) → `login.html` (sign in / create account / reset) → `app.html` (portal). Opening `app.html` directly without a session redirects to login
- **Accounts**: PBKDF2-SHA256 password hashes, one-time recovery code, lockout after 5 wrong attempts, keep-me-signed-in (30 days) or session-only, sign out in the top bar, change password in Settings > Account
- **Per-account data**: the first account adopts your existing portal data; later accounts get their own workspace
- Desktop app opens at the login screen
- Note: accounts live in this browser/device. This protects the UI on a shared computer; it is not server-side security

## What was new in 4.0
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
- `index.html`      Landing page (start here)
- `login.html`      Sign in, create account, reset password
- `app.html`        The portal (needs a signed-in session)
- `auth.js`         Accounts and session logic
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
