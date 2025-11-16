import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { StoreContext } from '@/app/contexts/StoreContext'

export const Toolbar = observer(() => {
  const { toolbar } = useContext(StoreContext)

  return (
    <div id="toolbar"></div>
  )
})
