import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'

import { Button } from '@/app/components/Button'
import { Icon, Close, Pencil, Plus } from '@/app/components/Icon'
import { Modal } from '@/app/components/Modal'
import { Shortcut } from '@/app/components/Keyboard/Shortcut'
import { ShortcutDupe } from '@/app/components/Keyboard/ShortcuteDupe'
import { ShortcutText } from '@/app/components/Keyboard/ShortcutText'
import { Step } from '@/app/components/Step'
import { StoreContext } from '@/app/contexts/StoreContext'
import { TextField } from '@/app/components/TextField'
import { TextileStore } from './Store'

export const Textile = observer(() => {
  const root = useContext(StoreContext)
  const [store] = useState(() => new TextileStore(root))

  return (
    <div className="min-w-[756px] mt-[20px] pb-[56px] w-fit">
      <h1 className="ml-[120px] text-[1.5rem] tracking-[0.25px]">
        {store.title}
      </h1>
      <div className="flex gap-x-[8px] items-start ml-[120px] mt-[20px]">
        <label className="relative top-[5px]" htmlFor="name">
          Name:
        </label>
        <TextField
          autoFocus
          error={store.state.nameError}
          id="name"
          onChange={(event) => store.onChangeName(event.target.value)}
          outerClassName="w-full"
          value={store.textile.name}
        />
      </div>
      <div className="flex gap-x-[8px] items-center ml-[120px]">
        <label>
          <span>Keyboard shortcut</span>{store.textile.keyboard && (<span className="mr-[2px]">:</span>)}
        </label>
        {!store.textile.keyboard && (
          <Button
            className="px-[0] shrink-0 w-[36px]"
            onClick={store.onEditShortcut}
            title="Add"
            variant="secondary"
          >
            <Icon className="size-[20px]" primary="#3b82f6" source={Plus} />
          </Button>
        )}
        {store.textile.keyboard && (
          <>
            <ShortcutText
              first={store.textile.keyboard.first}
              second={store.textile.keyboard.second}
            />
            <Button
              className="px-[0] shrink-0 w-[36px]"
              onClick={store.onEditShortcut}
              title="Edit"
              variant="secondary"
            >
              <Icon className="size-[22px]" primary="#3b82f6" source={Pencil} />
            </Button>
            <Button
              className="px-[0] w-[36px]"
              destructive
              onClick={store.onDeleteShortcut}
              title="Delete"
              variant="secondary"
            >
              <Icon className="size-[22px]" primary="#d72b0d" source={Close} />
            </Button>
          </>
        )}
      </div>
      <hr className="border-t border-t-slate-400/[0.625] mb-[32px] ml-[120px] mt-[24px]" />
      <div className="mt-[8px]">
        {store.textile.steps.map((step, index) => {
          return (
            <Step
              index={index}
              key={step.id}
              step={step}
            />
          )
        })}
      </div>
      <div className="flex justify-between ml-[120px] mt-[16px]">
        <Button
          icon={{ element: () => <Icon className="size-[20px]" primary="#3b82f6" source={Plus} /> }}
          onClick={store.onClickAddStep}
          variant="secondary"
        >
          Add Step
        </Button>
        <div className="flex gap-x-[16px] items-center">
          <Button
            onClick={store.onClickCancel}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={store.onClickSave}
          >
            Save
          </Button>
        </div>
      </div>
      {store.state.canceling && (
        <Modal title="Please Confirm">
          Are you sure you want to cancel?
          <div className="flex gap-x-[16px] items-center justify-end mt-[24px]">
            <Button onClick={store.onCancelNo} variant="secondary">
              No
            </Button>
            <Button onClick={store.onCancelYes}>
              Yes
            </Button>
          </div>
        </Modal>
      )}
      {store.state.editingShortcut && (
        <Shortcut textileStore={store} />
      )}
      {store.state.shortcutDupe && (
        <ShortcutDupe
          onCancel={store.onCancelShortcutDupe}
          onRemove={store.onRemoveShortcut}
          textile={store.state.shortcutDupe}
        />
      )}
      {store.state.showLastStepError && (
        <Modal
          onEscape={store.onEscapeLastStepError}
          title="Last Step"
        >
          Your textile isn’t finished! Make sure the last step either shows the result, or copies the result to your clipboard.
          <div className="flex justify-end mt-[16px]">
            <Button onClick={store.onCloseLastStepError}>
              OK
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
})
