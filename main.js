const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
app.whenReady().then(() => {
  const w = new BrowserWindow({ width: 1360, height: 860, minWidth: 980, minHeight: 640, title: 'Vantage ESS', backgroundColor: '#0a0d1f', autoHideMenuBar: true });
  w.loadFile('index.html');
  if (app.isPackaged) autoUpdater.checkForUpdatesAndNotify(); // needs "publish" set in package.json
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
