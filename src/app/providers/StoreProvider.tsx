import type { ReactNode } from 'react'

import { RootStore } from '@/app/RootStore'
import { StoreContext } from '@/app/contexts/StoreContext'

type StoreProps = {
  children: ReactNode
}

let store: RootStore | null = null

export const StoreProvider = ({ children }: StoreProps) => {
  if (store === null) {
    // eslint-disable-next-line react-hooks/globals
    store = new RootStore()
  }

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}
