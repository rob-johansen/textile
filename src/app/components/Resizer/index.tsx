import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

import { ResizerStore } from '@/app/components/Resizer/Store'

export const Resizer = observer(() => {
  const [store] = useState(() => new ResizerStore())

  useEffect(() => {
    return () => store.setDragging(false)
  }, [store])

  return (
    <div
      className="cursor-col-resize flex group justify-center h-[calc(100vh-56px)] w-[9px]"
      onMouseDown={(event) => {
        event.preventDefault()
        store.setDragging(true)
      }}
    >
      <div className={`border-l border-l-slate-300 group-hover:bg-[#1f71ff] h-full ml-[1px] mr-[2px] w-[3px] ${store.state.dragging && 'bg-[#1f71ff]'}`} />
    </div>
  )
})
