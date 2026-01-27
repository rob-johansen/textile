import type { Step } from '@/types/Step'
import type { Textile } from '@/types/Textile'

export interface Main {
  copyFromClipboard: () => Promise<string>,
  copyToClipboard: (text: string) => Promise<void>,
  loadTextiles: () => Promise<Textile[]>,
  platform: 'darwin' | 'linux' | 'win32',
  runCommand: (step: Step) => Promise<string>,
  writeTextile: (id: string, textile: string) => Promise<boolean>,
}

declare global {
  interface Window {
    main: Main
  }
}
