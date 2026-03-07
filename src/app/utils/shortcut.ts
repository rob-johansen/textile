import type { Textile } from '@/types/Textile'

export const getDupe = (candidate: Textile, textiles: Textile[]): Textile | undefined => {
  if (!candidate.keyboard) return

  const { key, mod1, mod2 } = candidate.keyboard.first

  for (const textile of textiles) {
    if (textile.id === candidate.id) continue
    if (!textile.keyboard) continue

    const { first } = textile.keyboard

    if (key === first.key && mod1 === first.mod1 && mod2 === first.mod2) {
      if (!candidate.keyboard.second) {
        // The one being created doesn't have a second sequence. Even if `textile`
        // does, the one being created is a dupe because it would always run when
        // the first sequence of `textile` is pressed.
        return textile
      }

      if (!textile.keyboard.second) {
        // The one being created has a second sequence, but `textile` doesn't.
        // This is a dupe because `textile` would always run when the first
        // sequence of the one being created is pressed.
        return textile
      }

      const { key, mod1, mod2 } = candidate.keyboard.second
      const { second } = textile.keyboard

      if (key === second.key && mod1 === second.mod1 && mod2 === second.mod2) {
        return textile
      }
    }

    if (!candidate.keyboard.second && textile.keyboard.second) {
      const { second } = textile.keyboard

      if (key === second.key && mod1 === second.mod1 && ((mod2 === second.mod2) || (mod2 === '' && typeof second.mod2 === 'undefined'))) {
        /*
          Textile A: Meta + G
          Textile B: Meta + Shift + W  +  Meta + G
                                          ^^^^^^^^  This second sequence would fire off Textile A too.
         */
        return textile
      }
    }

    if (candidate.keyboard.second && !textile.keyboard.second) {
      const { second } = candidate.keyboard

      if (
        second.key === first.key &&
        second.mod1 === first.mod1 &&
        ((second.mod2 === first.mod2) || (second.mod2 === '' && typeof first.mod2 === 'undefined') || (typeof second.mod2 === 'undefined' && first.mod2 === '')))
      {
        /*
          Textile A: Meta + Shift + W  +  Meta + G
                                          ^^^^^^^^  This second sequence would fire off Textile B too.
          Textile B: Meta + G
         */
        return textile
      }
    }
  }
}
