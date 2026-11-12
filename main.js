const { app, BrowserWindow, Menu, shell, dialog, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
if (!app.requestSingleInstanceLock()) app.quit();
let win;
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
const ext = (u) => { if (/^https?:\/\//.test(u)) shell.openExternal(u); };
function createWindow() {
  win = new BrowserWindow({
    width: 1360, height: 860, minWidth: 980, minHeight: 640, title: 'Vantage ESS',
    backgroundColor: '#0a0d1f', autoHideMenuBar: true, icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true, devTools: !app.isPackaged }
  });
  win.loadFile('index.html');
  win.webContents.setWindowOpenHandler(({ url }) => { ext(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file://')) { e.preventDefault(); ext(url); } });
}
const checkUpdates = () => app.isPackaged ? autoUpdater.checkForUpdatesAndNotify().catch(() => {}) : dialog.showMessageBox({ message: 'Updates are checked in the installed app.' });
ipcMain.handle('http', async (_e, q) => {
  const u = new URL(q.url);
  if (!/^https?:$/.test(u.protocol)) throw new Error('Only http(s) URLs are allowed');
  const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), 30000);
  try {
    const r = await fetch(u, { method: /^(GET|POST)$/.test(q.method) ? q.method : 'GET', headers: q.headers || {}, body: q.body, signal: ctl.signal });
    return { status: r.status, ok: r.ok, text: (await r.text()).slice(0, 15e6) };
  } catch (e) { throw new Error(e.name === 'AbortError' ? 'Request timed out' : 'Network error: ' + (e.cause && e.cause.code || e.message)); }
  finally { clearTimeout(tm); }
});
app.whenReady().then(() => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'File', submenu: [{ role: 'quit' }] }, { role: 'editMenu' }, { role: 'viewMenu' }, { role: 'windowMenu' },
    { label: 'Help', submenu: [{ label: 'Check for updates', click: checkUpdates }] }]));
  createWindow();
  autoUpdater.on('error', () => {});
  if (app.isPackaged) checkUpdates();
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
