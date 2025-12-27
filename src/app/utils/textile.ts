import type { Step } from '@/types/Step'
import { Action } from '@/types/Action'

/**
 * Removes steps whose action is `COPY` or `SHOW` when
 * there's already a `COPY` or `SHOW` step at the end
 */
export const removeDupes = (steps: Step[]) => {
  let copy = false
  let show = false
  const remove: number[] = []

  for (let i = steps.length - 1; i >= 0; i--) {
    const step = steps[i]

    if (step.action === Action.COPY) {
      if (copy) {
        remove.push(i)
      } else {
        copy = true
      }
    }

    if (step.action === Action.SHOW) {
      if (show) {
        remove.push(i)
      } else {
        show = true
      }
    }
  }

  for (const i of remove) {
    steps.splice(i, 1)
  }
}
