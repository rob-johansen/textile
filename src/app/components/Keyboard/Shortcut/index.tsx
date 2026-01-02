import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { Button } from '@/app/components/Button'
import { Checkbox } from '@/app/components/Checkbox'
import { Icon, CommandKey, WindowsKey } from '@/app/components/Icon'
import { Modal } from '@/app/components/Modal'
import { Modifier } from '@/types/Shortcut'
import { ShortcutStore } from './Store'
import { ShortcutText } from '@/app/components/Keyboard/ShortcutText'
import { TextField } from '@/app/components/TextField'
import type { TextileStore } from '@/app/components/Textile/Store'

type Props = {
  textileStore: TextileStore
}

export const Shortcut = observer(({ textileStore }: Props) => {
  const [store] = useState(() => new ShortcutStore(textileStore))

  return (
    <Modal
      onEscape={store.onEscape}
      title="Keyboard Shortcut"
    >
      <div className="flex gap-x-[8px] items-center">
        <div className="ml-[32px] mr-[3px] text-[0.875rem] text-neutral-900 tracking-[0.25px]">
          Modifier 1:
        </div>
        <Button
          className="font-[JetBrains] h-[32px] pl-[6px] pr-[5px] text-[0.75rem] w-[40px]"
          onClick={() => store.onClickModifier('first', 1, Modifier.Alt)}
          variant={`${store.state.first.mod1 === Modifier.Alt ? 'primary' : 'secondary'}`}
        >
          alt
        </Button>
        <Button
          className="font-[JetBrains] h-[32px] pl-[6px] pr-[5px] text-[0.75rem] w-[48px]"
          onClick={() => store.onClickModifier('first', 1, Modifier.Control)}
          variant={`${store.state.first.mod1 === Modifier.Control ? 'primary' : 'secondary'}`}
        >
          ctrl
        </Button>
        {window.main.platform !== 'linux' && (
          <Button
            className="px-[0] shrink-0 size-[32px]"
            onClick={() => store.onClickModifier('first', 1, Modifier.Meta)}
            variant={`${store.firstMod1Meta ? 'primary' : 'secondary'}`}
          >
            <Icon
              primary={`${store.firstMod1Meta ? '#ffffff' : '#3b82f6'}`}
              source={window.main.platform === 'darwin' ? CommandKey : WindowsKey}
            />
          </Button>
        )}
      </div>
      <div className="flex gap-x-[8px] items-center mt-[20px]">
        <Checkbox
          checked={store.state.firstMod2Checked}
          label="Modifier 2:"
          onChange={store.toggleFirstMod2}
        />
        <Button
          className="font-[JetBrains] h-[32px] pl-[6px] pr-[5px] relavite text-[0.75rem] top-[-2px] w-[40px]"
          disabled={store.firstMod2AltDisabled}
          onClick={() => store.onClickModifier('first', 2, Modifier.Alt)}
          variant={`${store.state.first.mod2 === Modifier.Alt ? 'primary' : 'secondary'}`}
        >
          alt
        </Button>
        <Button
          className="font-[JetBrains] h-[32px] pl-[6px] pr-[5px] relavite text-[0.75rem] top-[-2px] w-[48px]"
          disabled={store.firstMod2CtrlDisabled}
          onClick={() => store.onClickModifier('first', 2, Modifier.Control)}
          variant={`${store.state.first.mod2 === Modifier.Control ? 'primary' : 'secondary'}`}
        >
          ctrl
        </Button>
        {window.main.platform !== 'linux' && (
          <Button
            className="px-[0] relavite shrink-0 size-[32px] top-[-2px]"
            disabled={store.firstMod2MetaDisabled}
            onClick={() => store.onClickModifier('first', 2, Modifier.Meta)}
            variant={`${store.firstMod2Meta ? 'primary' : 'secondary'}`}
          >
            <Icon
              primary={`${store.firstMod2MetaDisabled ? '#3b82f660' : store.firstMod2Meta ? '#ffffff' : '#3b82f6'}`}
              source={window.main.platform === 'darwin' ? CommandKey : WindowsKey}
            />
          </Button>
        )}
        <Button
          className="font-[JetBrains] h-[32px] pl-[6px] pr-[5px] relavite text-[0.75rem] top-[-2px] w-[48px]"
          disabled={!store.state.firstMod2Checked}
          onClick={() => store.onClickModifier('first', 2, Modifier.Shift)}
          variant={`${store.state.first.mod2 === Modifier.Shift ? 'primary' : 'secondary'}`}
        >
          shift
        </Button>
      </div>
      <div className="flex gap-x-[8px] items-start ml-[76px] mt-[20px]">
        <label className="relative text-[0.875rem] text-neutral-900 tracking-[0.25px] top-[7px]" htmlFor="key1">
          Key:
        </label>
        <TextField
          className="font-[JetBrains]"
          error={store.state.key1Error}
          hideError
          id="key1"
          maxLength={1}
          onChange={(event) => store.onChangeKey('first', event.target.value)}
          outerClassName="w-[44px]"
          value={store.state.first.key}
        />
      </div>
      <div className="mt-[28px]">
        <Checkbox
          checked={store.state.additional}
          className="mb-0"
          label="Additional Sequence"
          onChange={store.toggleAdditional}
        />
      </div>
      <div className="border-b border-b-slate-400 border-t border-t-slate-400 flex h-[40px] items-center justify-center mt-[36px]">
        <ShortcutText
          first={store.state.first}
          second={store.state.second}
        />
      </div>
      <div className="flex gap-x-[16px] items-center justify-end mt-[24px]">
        <Button
          onClick={() => store.onEscape(false)}
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
    </Modal>
  )
})
