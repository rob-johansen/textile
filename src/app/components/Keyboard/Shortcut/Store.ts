import { makeAutoObservable } from 'mobx'

import { Modifier } from '@/types/Shortcut'
import type { Keyboard } from '@/types/Keyboard'
import type { TextileStore } from '@/app/components/Textile/Store'

type State = Keyboard & {
  additional: boolean
  firstMod2Checked: boolean
  key1Error: boolean
  key2Error: boolean
  mod1Error: string
  secondMod2Checked: boolean
}

export class ShortcutStore {
  state: State
  textileStore: TextileStore

  constructor(textileStore: TextileStore) {
    this.state = {
      additional: false,
      first: {
        key: '',
        mod1: ''
      },
      firstMod2Checked: false,
      key1Error: false,
      key2Error: false,
      mod1Error: '',
      secondMod2Checked: false,
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
        if (this.state.first.mod2 === value) {
          this.state.first.mod2 = undefined
        }
      } else {
        this.state.first.mod2 = value
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
        if (this.state.second.mod2 === value) {
          this.state.second.mod2 = undefined
        }
      } else {
        this.state.second.mod2 = value
      }
    }
  }

  onClickSave = () => {
    // TODO and WYLO 0: Validate everything...
    // TODO and WYLO 1: Save the keyboard shortcut to the current textile.
    // TODO and WYLO 2: When the current textile has a shortcut, add support for showing it when this modal is opened.
    // TODO and WYLO 3: When the current textile is created, make sure it writes this shortcut to disk.
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
    }
  }

  toggleSecondMod2 = () => {
    this.state.secondMod2Checked = !this.state.secondMod2Checked

    if (!this.state.secondMod2Checked) {
      if (this.state.second) {
        this.state.second.mod2 = undefined
      }
    }
  }
}
