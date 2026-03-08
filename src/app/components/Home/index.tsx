import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { Button } from '@/app/components/Button'
import { List } from '@/app/components/List'
import { Modal } from '@/app/components/Modal'
import { Nothing } from '@/app/components/Nothing'
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
              {store.state.status === Status.NOTHING && (
                <Nothing hasTextiles={store.state.textiles.length > 0} />
              )}
              {store.state.status === Status.VIEWING && (
                <TextileView />
              )}
            </div>
          </div>
          {store.state.confirmNew && (
            <Modal title="Please Confirm">
              Are you sure you want to start a new textile? Changes to the current textile will be lost.
              <div className="flex gap-x-[16px] items-center justify-end mt-[24px]">
                <Button onClick={store.onClickNewNo} variant="secondary">
                  No
                </Button>
                <Button onClick={store.onClickNewYes}>
                  Yes
                </Button>
              </div>
            </Modal>
          )}
        </>
      )}
    </>
  )
})
