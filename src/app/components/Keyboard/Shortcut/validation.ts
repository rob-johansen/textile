import type { ShortcutStore } from '@/app/components/Keyboard/Shortcut/Store'

export const validateShortcut = (store: ShortcutStore): boolean => {
  let valid = true

  if (!store.state.first.mod1) {
    store.state.firstMod1Error = true
    valid = false
  }

  if (store.state.firstMod2Checked && !store.state.first.mod2) {
    store.state.firstMod2Error = true
    valid = false
  }

  if (!store.state.first.key) {
    if (valid) {
      document.getElementById('key1')?.focus() // Only focus the input if everything above it is valid.
    }

    store.state.key1Error = true
    valid = false
  }

  if (store.state.additional) {
    if (!store.state.second?.mod1) {
      store.state.secondMod1Error = true
      valid = false
    }

    if (store.state.secondMod2Checked && !store.state.second?.mod2) {
      store.state.secondMod2Error = true
      valid = false
    }

    if (!store.state.second?.key) {
      if (valid) {
        document.getElementById('key2')?.focus() // Only focus the input if everything above it is valid.
      }

      store.state.key2Error = true
      valid = false
    }
  }

  return valid
}
