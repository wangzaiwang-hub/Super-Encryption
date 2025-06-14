const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    backgroundColor: '#000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('maximize', () => mainWindow.webContents.send('window-state-changed', true));
  mainWindow.on('unmaximize', () => mainWindow.webContents.send('window-state-changed', false));
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Window Controls
ipcMain.on('window-minimize', () => {
  BrowserWindow.getFocusedWindow()?.minimize();
});

ipcMain.on('window-maximize', () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window?.isMaximized()) {
    window.unmaximize();
  } else {
    window?.maximize();
  }
});

ipcMain.on('window-close', () => {
  BrowserWindow.getFocusedWindow()?.close();
});

const MASTER_EXTENSION = '.sCrypt';

// Handle file open dialog
ipcMain.handle('dialog:openFile', async (event, operation) => {
    const filters = (operation === 'decrypt') 
        ? [{ name: 'Encrypted Files', extensions: [MASTER_EXTENSION.substring(1)] }]
        : [];

    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: filters
    });
    if (canceled) {
        return [];
    } else {
        return filePaths;
    }
});

// Handle file processing
ipcMain.handle('process-files', async (event, { filePaths, destinationDir, operation }) => {
    const results = [];
    for (const filePath of filePaths) {
        try {
            const parsedPath = path.parse(filePath);
            let newPath;

            if (operation === 'decrypt') {
                if (!parsedPath.base.endsWith(MASTER_EXTENSION)) {
                    throw new Error('Not a valid encrypted file.');
                }
                const parts = parsedPath.name.split('.');
                if (parts.length < 2) throw new Error('Invalid encrypted filename format.');

                const encodedExt = parts.pop();
                const originalNameBase = parts.join('.');
                const originalExt = Buffer.from(encodedExt, 'base64').toString('utf-8');
                
                newPath = path.join(destinationDir, `${originalNameBase}.${originalExt}`);

            } else { // Encrypt
                const originalExt = parsedPath.ext.substring(1); // remove dot
                const encodedExt = Buffer.from(originalExt).toString('base64');
                newPath = path.join(destinationDir, `${parsedPath.name}.${encodedExt}${MASTER_EXTENSION}`);
            }

            fs.copyFileSync(filePath, newPath);
            results.push({ success: true, path: newPath });

        } catch (error) {
            results.push({ success: false, path: filePath, error: error.message });
        }
    }
    return results;
});

// Handle 'Select Directory' dialog for export
ipcMain.handle('dialog:selectDirectory', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        title: '选择导出文件夹',
        properties: ['openDirectory']
    });
    if (canceled || filePaths.length === 0) {
        return null;
    }
    return filePaths[0]; // Return the selected directory path
});

ipcMain.on('shell:openExternal', (event, url) => {
    shell.openExternal(url);
}); 