import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { StoreContext } from '@/app/contexts/StoreContext'
import { Toolbar } from '@/app/components/Toolbar'

export const Home = observer(() => {
  const { home } = useContext(StoreContext)

  return (
    <div>
      {home.state.starting ? (
        <>Starting up...</>
      ) : (
        <Toolbar />
      )}
    </div>
  )
})
