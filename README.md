# Vantage ESS v1.2.0
Employee Self-Service Platform: Profile, Team, Calendar, Leave, Timesheet, Attendance, Delegation, Files, Cases.

## Contents
- `index.html`      The app (works standalone in any browser: just double-click it)
- `website/`        Landing page (its "Launch app" button opens ../index.html)
- `main.js`, `package.json`   Desktop (Electron) wrapper
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
