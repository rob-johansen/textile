import { makeAutoObservable } from 'mobx'

import { Modifier } from '@/types/Shortcut'
import type { Keyboard } from '@/types/Keyboard'
import type { TextileStore } from '@/app/components/Textile/Store'

type State = Keyboard & {
  keyError: string
  mod1Error: string
}

export class ShortcutStore {
  state: State
  textileStore: TextileStore

  constructor(textileStore: TextileStore) {
    this.state = {
      first: {
        key: '',
        mod1: ''
      },
      keyError: '',
      mod1Error: '',
    }
    this.textileStore = textileStore
    makeAutoObservable(this)
  }

  get metaFirstMod1(): boolean {
    return this.state.first.mod1 === Modifier.Meta
  }

  onChangeKey = (sequence: string, value: string) => {
    if (sequence === 'first') {
      this.state.first.key = value.charAt(0)
    } else {
      // TODO: Make sure `second` exists, then set its `key`
    }
  }

  onClickModifier = (sequence: string, mod: number, value: string) => {
    if (sequence === 'first') {
      if (mod === 1) {
        this.state.first.mod1 = value
      } else {
        // TODO: Make sure `second` exists, then set its `key`
      }
    } else {
      // TODO: Make sure `second` exists, then set its `key`
    }
  }

  onClickSave = () => {

  }

  onEscape = (open: boolean) => {
    if (!open) {
      this.textileStore.state.editingShortcut = false
    }
  }
}
