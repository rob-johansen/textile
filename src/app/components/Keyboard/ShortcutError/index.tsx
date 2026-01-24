import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import type React from 'react'

import type { ShortcutStore } from '@/app/components/Keyboard/Shortcut/Store'

type Props = React.HTMLProps<HTMLDivElement> & {
  store: ShortcutStore
}

export const ShortcutError = observer(({ store }: Props) => {
  useEffect(() => {
    if (!store.state.firstMod1Error && !store.state.firstMod2Error && store.state.key1Error) {
      document.getElementById('key1')?.focus()
    } else if (!store.state.secondMod1Error && !store.state.secondMod2Error && store.state.key2Error) {
      document.getElementById('key2')?.focus()
    }
  }, [store.state.firstMod1Error, store.state.firstMod2Error, store.state.key1Error, store.state.secondMod1Error, store.state.secondMod2Error, store.state.key2Error, store.state.sequenceMatchError])

  let message = ''

  if (store.state.firstMod1Error) {
    message = 'Please choose a modifier'
  } else if (store.state.firstMod2Error) {
    message = 'Please choose a second modifier'
  } else if (store.state.key1Error) {
    message = 'Please press a key'
  } else if (store.state.secondMod1Error) {
    message = 'Please choose a modifier'
  } else if (store.state.secondMod2Error) {
    message = 'Please choose a second modifier'
  } else if (store.state.key2Error) {
    message = 'Please press a key'
  } else if (store.state.sequenceMatchError) {
    message = 'Please choose unique sequences'
  }

  return (
    <div className="text-[0.875rem] text-error">
      {message}
    </div>
  )
})
