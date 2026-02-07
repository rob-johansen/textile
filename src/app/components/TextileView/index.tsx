import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'

import { ShortcutText } from '@/app/components/Keyboard/ShortcutText'
import { StepView } from '@/app/components/StepView'
import { StoreContext } from '@/app/contexts/StoreContext'
import { TextileViewStore } from '@/app/components/TextileView/Store'

export const TextileView = observer(() => {
  const root = useContext(StoreContext)
  const [store] = useState(() => new TextileViewStore(root))

  return (
    <div className="mx-[20px] mt-[20px] pb-[56px] w-[calc(100%-40px)]">
      <h1 className="text-[1.5rem] tracking-[0.25px]">
        {store.textile.name}
      </h1>
      {store.textile.keyboard && (
        <div>
          <ShortcutText
            className="text-[0.75rem] overflow-hidden text-ellipsis text-slate-500 whitespace-nowrap"
            first={store.textile.keyboard.first}
            second={store.textile.keyboard.second}
          />
        </div>
      )}
      <hr className="border-t border-t-slate-400/[0.625] my-[24px]" />
      <div className="flex flex-col gap-y-[16px]">
        {store.textile.steps.map((step, index) => {
          return (
            <StepView
              index={index}
              key={step.id}
              step={step}
            />
          )
        })}
      </div>
    </div>
  )
})
