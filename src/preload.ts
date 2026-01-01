import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('main', {
  loadTextiles: () => ipcRenderer.invoke('load-textiles'),
  platform: process.platform,
  writeTextile: (id: string, textile: string) => ipcRenderer.invoke('write-textile', id, textile),
});
