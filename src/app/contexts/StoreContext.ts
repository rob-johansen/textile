import { createContext } from 'react'

import type { RootStore } from '@/app/RootStore'

export const StoreContext = createContext<RootStore>({} as RootStore)
