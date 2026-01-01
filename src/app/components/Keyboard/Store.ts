/* This special store handles keyboard shortcut events (it begins listening at application startup). */

import { makeAutoObservable } from 'mobx'

import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

/* Modifiers */
let ALT = false
let CTRL = false
let META = false
let SHIFT = false

export class KeyboardStore {
  root: RootStore

  constructor(root: RootStore) {
    this.root = root

    window.addEventListener('keydown', this.onKeyDown, true)
    window.addEventListener('keyup', this.onKeyUp, true)

    makeAutoObservable(this)
  }

  get textiles(): Textile[] {
    return this.root.home.state.textiles
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Alt') ALT = true
    if (event.key === 'Control') CTRL = true
    if (event.key === 'Meta') META = true
    if (event.key === 'Shift') SHIFT = true

    if (META && SHIFT && event.key !== 'Meta' && event.key !== 'Shift') {
      console.log(`⌘+⇧+${event.key}`)
    }
  }

  onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Alt') ALT = false
    if (event.key === 'Control') CTRL = false
    if (event.key === 'Meta') META = false
    if (event.key === 'Shift') SHIFT = false
  }
}
