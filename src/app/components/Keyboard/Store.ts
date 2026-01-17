/* This special store handles keyboard shortcut events (it begins listening at application startup). */

import { makeAutoObservable } from 'mobx'

import { Modifier } from '@/types/Shortcut'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

let waitingMod1 = ''
let waitingMod2 = ''
let waitingKey = ''
let timer: NodeJS.Timeout | undefined

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
    const alt = event.altKey
    const ctrl = event.ctrlKey
    const meta = event.metaKey
    const shift = event.shiftKey
    const key = event.key.toUpperCase()

    let modCount = 0
    if (alt) modCount++
    if (ctrl) modCount++
    if (meta) modCount++
    if (shift) modCount++

    for (const textile of this.textiles) {
      if (!textile.keyboard) continue

      const firstMod1 = textile.keyboard.first.mod1
      const firstMod2 = textile.keyboard.first.mod2
      const firstKey = textile.keyboard.first.key

      const secondMod1 = textile.keyboard.second?.mod1
      const secondMod2 = textile.keyboard.second?.mod2
      const secondKey = textile.keyboard.second?.key

      if (
        textile.keyboard.second &&
        waitingMod1 === firstMod1 &&
        waitingMod2 === firstMod2 &&
        waitingKey === firstKey
      ) {
        console.log(`1 ${textile.name}`)
        console.log('waitingMod1:', waitingMod1)
        console.log('waitingMod2:', waitingMod2)
        console.log('waitingKey:', waitingKey)
        // This textile has a second sequence, and its first sequence was pressed within the time window.
        if (
          alt && secondMod1 === Modifier.Alt ||
          ctrl && secondMod1 === Modifier.Control ||
          meta && secondMod1 === Modifier.Meta
        ) {
          console.log(`2 ${textile.name}`)
          // The mod 1 of the second sequence is down.
          if (secondMod2) {
            console.log(`3 ${textile.name}`)
            // This textile's shortcut has a mod 2 in its second sequence.
            if (
              alt && secondMod2 === Modifier.Alt ||
              ctrl && secondMod2 === Modifier.Control ||
              meta && secondMod2 === Modifier.Meta ||
              shift && secondMod2 === Modifier.Shift
            ) {
              console.log(`4 ${textile.name}`)
              // The mod 2 of the second sequence is down.
              if (key === secondKey) {
                console.log(`5 ${textile.name}`)
                // We've matched the shortcut of a textile that has two sequences, and two modifiers in its second sequence.
                console.log(`Matched "${textile.name}"!`)
                this.reset()
              } else {
                console.log(`key: ${key}`)
                console.log(`secondKey: ${secondKey}`)
              }
            }
          } else {
            // The second sequence of this textile's shortcut does not have two modifiers.
            // If two or more modifiers are being pressed, we can immediately rule it out.
            if (modCount !== 1) continue

            if (key === secondKey) {
              // We've matched the shortcut of a textile that has two sequences, and one modifier in its second sequence.
              console.log(`Matched "${textile.name}"!`)
              this.reset()
            }
          }
        }
      } else {
        // This textile only has one sequence, or has two sequences but is not yet waiting for its second sequence.
        if (
          alt && firstMod1 === Modifier.Alt ||
          ctrl && firstMod1 === Modifier.Control ||
          meta && firstMod1 === Modifier.Meta
        ) {
          // The mod 1 of the first sequence is down.
          if (firstMod2) {
            // This textile's shortcut has a mod 2 in its first sequence.
            if (
              alt && firstMod2 === Modifier.Alt ||
              ctrl && firstMod2 === Modifier.Control ||
              meta && firstMod2 === Modifier.Meta ||
              shift && firstMod2 === Modifier.Shift
            ) {
              // The mod 2 of the first sequence is down.
              if (key === firstKey) {
                // The key of the first sequence is being pressed.
                if (textile.keyboard.second) {
                  // This textile's shortcut has a second sequence, so we wait for it.
                  this.wait(firstMod1, firstMod2, firstKey)
                } else {
                  // We've matched the shortcut of a textile that has one sequence, and two modifiers in that sequence.
                  console.log(`Matched "${textile.name}"!`)
                  this.reset()
                }
              }
            }
          } else {
            // The first sequence of this textile's shortcut does not have two modifiers.
            // If two or more modifiers are being pressed, we can immediately rule it out.
            if (modCount !== 1) continue

            if (key === firstKey) {
              // The key of the first sequence is down.
              if (textile.keyboard.second) {
                // This textile's shortcut has a second sequence, so we wait for it.
                this.wait(firstMod1, firstMod2, firstKey)
              } else {
                // We've matched the shortcut of a textile that has one sequence, and one modifier in that sequence.
                console.log(`Matched "${textile.name}"!`)
                this.reset()
              }
            }
          }
        }
      }
    }
  }

  onKeyUp = (event: KeyboardEvent) => {
    // TODO: What should actually happen here?
  }

  reset = () => {
    clearTimeout(timer)
    waitingMod1 = ''
    waitingMod2 = ''
    waitingKey = ''
  }

  wait = (firstMod1: string, firstMod2: string | undefined, firstKey: string) => {
    clearTimeout(timer)
    timer = setTimeout(this.reset, 2000)

    waitingMod1 = firstMod1
    waitingMod2 = firstMod2 ?? ''
    waitingKey = firstKey
  }
}
