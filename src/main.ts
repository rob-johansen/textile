import { app, BrowserWindow, ipcMain } from 'electron'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { updateElectronApp } from 'update-electron-app'
import started from 'electron-squirrel-startup'

import { copyFromClipboard, copyToClipboard } from '@/utils/main/clipboard'
import { loadTextiles } from '@/utils/main/startup'
import { runCommand, writeTextile } from '@/utils/main/textile'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

// Check for updates (https://github.com/electron/update.electronjs.org)
updateElectronApp()

const createWindow = () => {
  const icon = join(app.isPackaged ? process.resourcesPath : app.getAppPath(), 'src/images/icon.png')
  const mainWindow = new BrowserWindow({
    height: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
    width: 800,
    // The hidden `titleBarStyle` above hides the window controls (minimize, maximize, close)
    // on Windows and Linux. Setting `titleBarOverlay` to `true` adds those controls back.
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    ...(process.platform === 'linux' ? { icon } : {})
  })

  // Load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(
      join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    )
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: 'bottom' })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('copy-from-clipboard', copyFromClipboard)
  ipcMain.handle('copy-to-clipboard', copyToClipboard)
  ipcMain.handle('load-textiles', loadTextiles)
  ipcMain.handle('run-command', runCommand)
  ipcMain.handle('write-textile', writeTextile)
  createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
