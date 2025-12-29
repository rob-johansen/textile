import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('main', {
  loadTextiles: () => ipcRenderer.invoke('load-textiles'),
  writeTextile: (id: string, textile: string) => ipcRenderer.invoke('write-textile', id, textile),
});
