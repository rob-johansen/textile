import { observer } from 'mobx-react-lite'
import type React from 'react'

import type { ShortcutStore } from '@/app/components/Keyboard/Shortcut/Store'

type Props = React.HTMLProps<HTMLDivElement> & {
  store: ShortcutStore
}

export const ShortcutError = observer(({ store }: Props) => {
  let message = ''

  if (store.state.firstMod1Error) {
    message = 'Please choose a modifier'
  } else if (store.state.firstMod2Error) {
    message = 'Please choose a second modifier'
  } else if (store.state.key1Error) {
    message = 'Please press a key'
  }

  return (
    <div className="text-[0.875rem] text-error">
      {message}
    </div>
  )
})
