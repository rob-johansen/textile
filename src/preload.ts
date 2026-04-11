import { contextBridge, ipcRenderer } from 'electron'

import type { Step } from '@/types/Step'

contextBridge.exposeInMainWorld('main', {
  copyFromClipboard: () => ipcRenderer.invoke('copy-from-clipboard'),
  copyToClipboard: (text: string) => ipcRenderer.invoke('copy-to-clipboard', text),
  deleteTextile: (id: string) => ipcRenderer.invoke('delete-textile', id),
  loadTextiles: () => ipcRenderer.invoke('load-textiles'),
  runCommand: (step: Step) => ipcRenderer.invoke('run-command', step),
  platform: process.platform,
  writeTextile: (id: string, textile: string) => ipcRenderer.invoke('write-textile', id, textile),
});
