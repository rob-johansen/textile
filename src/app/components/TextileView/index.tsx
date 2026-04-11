import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'

import { Button } from '@/app/components/Button'
import { Icon, Play } from '@/app/components/Icon'
import { Modal } from '@/app/components/Modal'
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
        <ShortcutText
          className="text-[0.875rem] text-slate-500"
          first={store.textile.keyboard.first}
          second={store.textile.keyboard.second}
        />
      )}
      <div className="flex gap-x-[16px] items-center mt-[16px]">
        <Button
          onClick={store.onClickEdit}
          variant="secondary"
        >
          Edit
        </Button>
        <Button
          className="px-[12px]"
          icon={{ element: () => <Icon className="size-[20px]" primary="#ffffff" source={Play} /> }}
          onClick={store.onClickRun}
        >
          Run
        </Button>
        <Button
          destructive
          onClick={store.onClickDelete}
          variant="secondary"
        >
          Delete
        </Button>
      </div>
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
      {store.confirmingDelete && (
        <Modal title="Please Confirm">
          <div>
            Are you sure you want to delete the <span className="font-bold">{store.textile.name}</span> textile?
          </div>
          <div className="flex gap-x-[16px] items-center justify-end mt-[24px]">
            <Button
              onClick={store.onCancelDelete}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              destructive
              onClick={store.onConfirmDelete}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
})
