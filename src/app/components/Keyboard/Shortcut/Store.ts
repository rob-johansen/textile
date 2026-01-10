import { makeAutoObservable } from 'mobx'

import { Modifier } from '@/types/Shortcut'
import { validateShortcut } from '@/app/components/Keyboard/Shortcut/validation'
import type { Keyboard } from '@/types/Keyboard'
import type { TextileStore } from '@/app/components/Textile/Store'

type State = Keyboard & {
  additional: boolean
  firstMod1Error: boolean
  firstMod2Checked: boolean
  firstMod2Error: boolean
  key1Error: boolean
  key2Error: boolean
  secondMod1Error: boolean
  secondMod2Checked: boolean
  secondMod2Error: boolean
}

export class ShortcutStore {
  state: State
  textileStore: TextileStore

  constructor(textileStore: TextileStore) {
    const shortcut = textileStore.state.textile.keyboard
    this.state = {
      additional: Boolean(shortcut?.second),
      first: {
        key: shortcut?.first.key ?? '',
        mod1: shortcut?.first.mod1 ?? '',
        mod2: shortcut?.first.mod2 ?? '',
      },
      firstMod2Checked: false,
      key1Error: false,
      key2Error: false,
      firstMod1Error: false,
      firstMod2Error: false,
      secondMod1Error: false,
      secondMod2Checked: false,
      secondMod2Error: false,
      ...(shortcut?.second ? {
        second: {
          key: shortcut.second.key ?? '',
          mod1: shortcut.second.mod1 ?? '',
          mod2: shortcut.second.mod2 ?? '',
        }
      } : {}),
    }
    this.textileStore = textileStore
    makeAutoObservable(this)
  }

  get firstMod1Meta(): boolean {
    return this.state.first.mod1 === Modifier.Meta
  }

  get firstMod2AltDisabled(): boolean {
    return !this.state.firstMod2Checked || this.state.first.mod1 === Modifier.Alt
  }

  get firstMod2CtrlDisabled(): boolean {
    return !this.state.firstMod2Checked || this.state.first.mod1 === Modifier.Control
  }

  get firstMod2Meta(): boolean {
    return this.state.first.mod2 === Modifier.Meta
  }

  get firstMod2MetaDisabled(): boolean {
    return !this.state.firstMod2Checked || this.state.first.mod1 === Modifier.Meta
  }

  get secondMod1Meta(): boolean {
    return this.state.second?.mod1 === Modifier.Meta
  }

  get secondMod2AltDisabled(): boolean {
    return !this.state.secondMod2Checked || this.state.second?.mod1 === Modifier.Alt
  }

  get secondMod2CtrlDisabled(): boolean {
    return !this.state.secondMod2Checked || this.state.second?.mod1 === Modifier.Control
  }

  get secondMod2Meta(): boolean {
    return this.state.second?.mod2 === Modifier.Meta
  }

  get secondMod2MetaDisabled(): boolean {
    return !this.state.secondMod2Checked || this.state.second?.mod1 === Modifier.Meta
  }

  get showError(): boolean {
    return this.state.firstMod1Error ||
      this.state.firstMod2Error ||
      this.state.key1Error ||
      this.state.secondMod1Error ||
      this.state.secondMod2Error ||
      this.state.key2Error
  }

  onChangeKey = (sequence: string, value: string) => {
    if (value !== '' && !/^[A-Z0-9]$/.test(value)) {
      if (sequence === 'first') {
        this.state.key1Error = true
      } else {
        this.state.key2Error = true
      }
      return
    }

    if (sequence === 'first') {
      this.state.first.key = value
      this.state.key1Error = false
    } else {
      if (!this.state.second) {
        this.state.second = {
          key: '',
          mod1: '',
        }
      }

      this.state.second.key = value
      this.state.key2Error = false
    }
  }

  onClickModifier = (sequence: string, mod: number, value: string) => {
    if (sequence === 'first') {
      if (mod === 1) {
        this.state.first.mod1 = value
        this.state.firstMod1Error = false

        if (this.state.first.mod2 === value) {
          this.state.first.mod2 = undefined
        }
      } else {
        this.state.first.mod2 = value
        this.state.firstMod2Error = false
      }
    } else {
      if (!this.state.second) {
        this.state.second = {
          key: '',
          mod1: '',
        }
      }

      if (mod === 1) {
        this.state.second.mod1 = value
        this.state.secondMod1Error = false

        if (this.state.second.mod2 === value) {
          this.state.second.mod2 = undefined
        }
      } else {
        this.state.second.mod2 = value
        this.state.secondMod2Error = false
      }
    }
  }

  onClickSave = () => {
    if (!validateShortcut(this)) return

    this.textileStore.state.textile.keyboard = {
      first: this.state.first,
      second: this.state.second,
    }

    this.onEscape(false)
  }

  onEscape = (open: boolean) => {
    if (!open) {
      this.textileStore.state.editingShortcut = false
    }
  }

  toggleAdditional = () => {
    this.state.additional = !this.state.additional

    if (!this.state.additional) {
      this.state.second = undefined
      this.state.secondMod2Checked = false
    }
  }

  toggleFirstMod2 = () => {
    this.state.firstMod2Checked = !this.state.firstMod2Checked

    if (!this.state.firstMod2Checked) {
      this.state.first.mod2 = undefined
      this.state.firstMod2Error = false
    }
  }

  toggleSecondMod2 = () => {
    this.state.secondMod2Checked = !this.state.secondMod2Checked

    if (!this.state.secondMod2Checked) {
      if (this.state.second) {
        this.state.second.mod2 = undefined
      }
      this.state.secondMod2Error = false
    }
  }
}
