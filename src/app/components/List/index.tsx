import { observer } from 'mobx-react-lite'
import { twMerge } from 'tailwind-merge'
import { useContext, useEffect } from 'react'

import { Button } from '@/app/components/Button'
import { Icon, Textile } from '@/app/components/Icon'
import { ShortcutText } from '@/app/components/Keyboard/ShortcutText'
import { StoreContext } from '@/app/contexts/StoreContext'
import { Modal } from '@/app/components/Modal'

export const List = observer(() => {
  const { list: store } = useContext(StoreContext)

  useEffect(() => {
    // Adding a percentage-based width to the `textiles` element helps it
    // retain its size when you search and there are no matching textiles.
    const content = document.getElementById('content')
    const textiles = document.getElementById('textiles')
    if (!content || !textiles) return

    const cRect = content.getBoundingClientRect()
    const tRect = textiles.getBoundingClientRect()
    const width = ((tRect.width - cRect.left) / cRect.width) * 100
    const clamped = Math.max(10, Math.min(90, width));
    textiles.style.width = `${clamped}%`
  }, [])

  return (
    <div className="min-w-[250px] overflow-y-scroll scrollbar-thin" id="textiles">
      {store.textiles.length === 0 ? (
        <div className="flex flex-col gap-y-[16px] h-full items-center justify-center w-full">
          <span className="text-[1.0625rem] text-slate-500">
            {store.emptyText}
          </span>
          <Icon className="size-[40px]" primary="#3b82f680" source={Textile} />
        </div>
      ) : (
        <div className="flex flex-col gap-y-[2px] pb-[56px]">
          {store.textiles.map((textile) => {
            return (
              <button
                className={twMerge('flex flex-col focus:bg-blue-500 group hover:bg-blue-500/[0.1] justify-center min-h-[52px] ml-[4px] outline-none px-[12px] py-[4px] rounded-[8px] text-left w-[calc(100%-4px)]', store.isSelected(textile) && 'bg-blue-500/[0.1]')}
                key={textile.id}
                onClick={() => store.onClickTextile(textile)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') store.onArrowDown()
                  if (event.key === 'ArrowUp') store.onArrowUp()
                }}
              >
                <div className="font-bold group-focus:text-white overflow-hidden text-ellipsis text-neutral-900 whitespace-nowrap">
                  {textile.name}
                </div>
                {textile.keyboard && (
                  <div>
                    <ShortcutText
                      className="group-focus:[&>span]:text-slate-50 text-[0.75rem] overflow-hidden text-ellipsis text-slate-500 whitespace-nowrap"
                      first={textile.keyboard.first}
                      second={textile.keyboard.second}
                    />
                  </div>
                )}
              </button>
            )
          })}
          {store.switchTextile.id && (
            <Modal title="Please Confirm">
              Are you sure you want to leave this textile? Unsaved changes will be lost.
              <div className="flex gap-x-[16px] items-center justify-end mt-[24px]">
                <Button onClick={store.onConfirmSwitchNo} variant="secondary">
                  No
                </Button>
                <Button onClick={store.onConfirmSwitchYes}>
                Yes
                </Button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  )
})
