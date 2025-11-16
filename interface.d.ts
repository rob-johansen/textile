import type { Textile } from '@/types/Textile'

export interface Main {
  loadTextiles: () => Promise<Textile[]>,
}

declare global {
  interface Window {
    main: Main
  }
}
