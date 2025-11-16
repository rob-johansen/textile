import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { StoreContext } from '@/app/contexts/StoreContext'

export const Home = observer(() => {
  const { home } = useContext(StoreContext)

  return (
    <div>
      {home.state.starting ? (
        <>Starting up...</>
      ) : (
        <>Hello, React!</>
      )}
    </div>
  )
})
