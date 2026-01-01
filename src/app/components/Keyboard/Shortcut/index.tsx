import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { Button } from '@/app/components/Button'
import { Icon, CommandKey, WindowsKey } from '@/app/components/Icon'
import { Modal } from '@/app/components/Modal'
import { Modifier } from '@/types/Shortcut'
import { ShortcutStore } from './Store'
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
        <span>
          Modifier 1:
        </span>
        <Button
          className="font-[JetBrains] pl-[8px] pr-[7px] text-[0.8125rem] w-[42px]"
          onClick={() => store.onClickModifier('first', 1, Modifier.Alt)}
          variant={`${store.state.first.mod1 === Modifier.Alt ? 'primary' : 'secondary'}`}
        >
          alt
        </Button>
        <Button
          className="font-[JetBrains] pl-[8px] pr-[6px] text-[0.8125rem] w-[50px]"
          onClick={() => store.onClickModifier('first', 1, Modifier.Control)}
          variant={`${store.state.first.mod1 === Modifier.Control ? 'primary' : 'secondary'}`}
        >
          ctrl
        </Button>
        {/* TODO: Don't show this button if the platform is not macOS or Windows... */}
        <Button
          className="px-[0] shrink-0 w-[36px]"
          onClick={() => store.onClickModifier('first', 1, Modifier.Meta)}
          variant={`${store.metaFirstMod1 ? 'primary' : 'secondary'}`}
        >
          <Icon primary={`${store.metaFirstMod1 ? '#ffffff' : '#3b82f6'}`} source={window.main.platform === 'darwin' ? CommandKey : WindowsKey} />
        </Button>
      </div>
      <div className="flex gap-x-[8px] items-center mt-[16px]">
        <span>
          Modifier 2 (optional):
        </span>
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
