/* This special store handles keyboard shortcut events (it begins listening at application startup). */

import { makeAutoObservable } from 'mobx'

import { Modifier } from '@/types/Shortcut'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

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
    for (const textile of this.textiles) {
      if (!textile.keyboard) continue

      const alt = event.altKey
      const ctrl = event.ctrlKey
      const meta = event.metaKey
      const shift = event.shiftKey

      let modCount = 0
      if (alt) modCount++
      if (ctrl) modCount++
      if (meta) modCount++
      if (shift) modCount++

      const firstMod1 = textile.keyboard.first.mod1
      const firstMod2 = textile.keyboard.first.mod2
      const firstKey = textile.keyboard.first.key

      const secondMod1 = textile.keyboard.second?.mod1
      const secondMod2 = textile.keyboard.second?.mod2
      const secondKey = textile.keyboard.second?.key

      if (
        alt && firstMod1 === Modifier.Alt ||
        ctrl && firstMod1 === Modifier.Control ||
        meta && firstMod1 === Modifier.Meta
      ) {
        // The first mod 1 is down
        if (firstMod2) {
          if (
            alt && firstMod2 === Modifier.Alt ||
            ctrl && firstMod2 === Modifier.Control ||
            meta && firstMod2 === Modifier.Meta ||
            shift && firstMod2 === Modifier.Shift
          ) {
            // The first mod 2 is down
            if (!textile.keyboard.second) {
              if (event.key.toUpperCase() === firstKey) {
                console.log(`Keyboard shortcut for ${textile.name}!`)
              }
            } else {
              // Start the timer...or?
            }
          }
        } else {
          if (modCount !== 1) continue

          // No other modifier is down
          if (!textile.keyboard.second) {
            if (event.key.toUpperCase() === firstKey) {
              console.log(`Keyboard shortcut for ${textile.name}!`)
            }
          } else {
            // Start the timer...or?
          }
        }
      }
    }
  }

  onKeyUp = (event: KeyboardEvent) => {
    // TODO: Stop the timer...
  }
}
