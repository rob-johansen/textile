import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { List } from '@/app/components/List'
import { Resizer } from '@/app/components/Resizer'
import { Status } from '@/types/Status'
import { StoreContext } from '@/app/contexts/StoreContext'
import { Textile } from '@/app/components/Textile'
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
            <div className="flex-[1_1_auto] min-w-[870px] overflow-y-scroll scrollbar-thin">
              {store.state.status === Status.CREATING && (
                <Textile/>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
})
