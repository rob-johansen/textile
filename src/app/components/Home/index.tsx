import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { Status } from '@/types/Status'
import { StoreContext } from '@/app/contexts/StoreContext'
import { TextileForm } from '@/app/components/TextileForm'
import { Toolbar } from '@/app/components/Toolbar'

export const Home = observer(() => {
  const { home: store } = useContext(StoreContext)

  return (
    <div>
      {store.state.status === Status.STARTING ? (
        <>Starting up...</>
      ) : (
        <>
          <Toolbar />
          {store.state.status === Status.CREATING && (
            <TextileForm />
          )}
        </>
      )}
    </div>
  )
})
