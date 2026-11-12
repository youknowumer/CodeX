const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('vantage', { desktop: true, http: (q) => ipcRenderer.invoke('http', q) });
