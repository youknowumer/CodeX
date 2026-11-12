const { app, BrowserWindow } = require('electron');
app.whenReady().then(() => {
  const w = new BrowserWindow({ width: 1360, height: 860, minWidth: 980, minHeight: 640, title: 'ESS Portal', backgroundColor: '#0c0f1d', autoHideMenuBar: true });
  w.loadFile('index.html');
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
