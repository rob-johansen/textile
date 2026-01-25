import { contextBridge, ipcRenderer } from 'electron'

import type { Step } from '@/types/Step'

contextBridge.exposeInMainWorld('main', {
  loadTextiles: () => ipcRenderer.invoke('load-textiles'),
  runCommand: (step: Step) => ipcRenderer.invoke('run-command', step),
  platform: process.platform,
  writeTextile: (id: string, textile: string) => ipcRenderer.invoke('write-textile', id, textile),
});
