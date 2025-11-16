import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('main', {
  loadTextiles: () => ipcRenderer.invoke('load-textiles')
});
