import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { StoreContext } from '@/app/contexts/StoreContext'

export const Toolbar = observer(() => {
  const { toolbar } = useContext(StoreContext)

  return (
    <div className="bg-[#f6f8fa] border-b border-b-[#c7d0d9] draggable h-[56px]">

    </div>
  )
})
