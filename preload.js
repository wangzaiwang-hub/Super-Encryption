const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  processFiles: (args) => ipcRenderer.invoke('process-files', args),
  openFile: (operation) => ipcRenderer.invoke('dialog:openFile', operation),
  selectDirectory: () => ipcRenderer.invoke('dialog:selectDirectory'),
  openExternal: (url) => ipcRenderer.send('shell:openExternal', url),
  
  // Window controls
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  maximizeWindow: () => ipcRenderer.send('window-maximize'),
  closeWindow: () => ipcRenderer.send('window-close'),
  onWindowStateChange: (callback) => ipcRenderer.on('window-state-changed', (event, isMaximized) => callback(isMaximized)),
}); 