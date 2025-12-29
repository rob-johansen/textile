import type { Textile } from '@/types/Textile'

export interface Main {
  loadTextiles: () => Promise<Textile[]>,
  writeTextile: (id: string, textile: string) => Promise<boolean>,
}

declare global {
  interface Window {
    main: Main
  }
}
