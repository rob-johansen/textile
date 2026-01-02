import { makeAutoObservable } from 'mobx'

import { Modifier } from '@/types/Shortcut'
import type { Keyboard } from '@/types/Keyboard'
import type { TextileStore } from '@/app/components/Textile/Store'

type State = Keyboard & {
  additional: boolean
  firstMod2Checked: boolean
  key1Error: string
  mod1Error: string
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
      key1Error: '',
      mod1Error: '',
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

  onChangeKey = (sequence: string, value: string) => {
    // TODO: Limit the value to (A-Z or 0-9) and add text about it in the UI.

    if (sequence === 'first') {
      this.state.first.key = value.toUpperCase()
    } else {
      // TODO: Make sure `second` exists, then set its `key`
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
      // TODO: Make sure `second` exists, then set the appropriate mod
    }
  }

  onClickSave = () => {

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
    }
  }

  toggleFirstMod2 = () => {
    this.state.firstMod2Checked = !this.state.firstMod2Checked

    if (!this.state.firstMod2Checked) {
      this.state.first.mod2 = undefined
    }
  }
}
