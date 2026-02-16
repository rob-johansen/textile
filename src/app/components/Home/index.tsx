import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { List } from '@/app/components/List'
import { Resizer } from '@/app/components/Resizer'
import { Status } from '@/types/Status'
import { StoreContext } from '@/app/contexts/StoreContext'
import { Textile } from '@/app/components/Textile'
import { TextileView } from '@/app/components/TextileView'
import { Toolbar } from '@/app/components/Toolbar'

export const Home = observer(() => {
  const { home: store } = useContext(StoreContext)

  return (
    <>
      {store.state.status === Status.STARTING ? (
        <>Starting up...</>
      ) : (
        <>
          <div className="bg-slate-100 sticky top-[0] z-10">
            <Toolbar />
          </div>
          <div className="flex h-[calc(100vh-56px)] select-none" id="content">
            <List />
            <Resizer />
            <div className="flex-[1_1_auto] overflow-y-scroll scrollbar-thin">
              {(store.state.status === Status.CREATING || store.state.status === Status.EDITING) && (
                <div className="min-w-[870px]">
                  <Textile />
                </div>
              )}
              {store.state.status === Status.VIEWING && (
                <TextileView />
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
})
