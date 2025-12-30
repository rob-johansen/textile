import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { Icon, Textile } from '@/app/components/Icon'
import { StoreContext } from '@/app/contexts/StoreContext'

export const List = observer(() => {
  const { list: store } = useContext(StoreContext)

  return (
    <div className="min-w-[250px] overflow-y-scroll scrollbar-thin" id="textiles">
      {store.textiles.length === 0 ? (
        <div className="flex flex-col gap-y-[16px] items-center h-full justify-center w-full">
          <span className="text-[1.0625rem] text-slate-500">
            No textiles yet
          </span>
          <Icon className="size-[40px]" primary="#3b82f680" source={Textile} />
        </div>
      ) : (
        <>
          {store.textiles.map((textile) => {
            return (
              <div
                key={textile.id}
              >
                <div>
                  {textile.name}
                </div>
                <div>
                  {/* TODO: Show the textile's keyboard shortcut... */}
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
})
