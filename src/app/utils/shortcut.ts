import type { ShortcutStore } from '@/app/components/Keyboard/Shortcut/Store'
import type { Textile } from '@/types/Textile'

export const getDupe = (store: ShortcutStore, textiles: Textile[]): Textile | undefined => {
  /*
    TODO: You need to handle the case where the second sequence matches the first sequence of a shortcut that has no second sequence:
          Textile A: Meta + G
          Textile B: Meta + Shift + W  +  Meta + G
                                          ^^^^^^^^  This second sequence will fire off Textile A too.
   */

  const { key, mod1, mod2 } = store.state.first

  for (const textile of textiles) {
    if (!textile.keyboard) continue

    const { first } = textile.keyboard

    if (key === first.key && mod1 === first.mod1 && mod2 === first.mod2) {
      if (!store.state.second) {
        // The one being created doesn't have a second sequence. Even if `textile`
        // does, the one being created is a dupe because it would always run when
        // the first sequence of `textile` is pressed.
        return textile
      }

      if (!textile.keyboard.second) {
        // The one being created has a second sequence, but `textile` doesn't.
        // We have a dupe because `textile` would always run when the first
        // sequence of the one being created is pressed.
        return textile
      }

      const { key, mod1, mod2 } = store.state.second
      const { second } = textile.keyboard

      if (key === second.key && mod1 === second.mod1 && mod2 === second.mod2) {
        return textile
      }
    }
  }
}
