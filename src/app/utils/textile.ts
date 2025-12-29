import { Action } from '@/types/Action'
import type { Step } from '@/types/Step'

/**
 * Moves a "result" step (i.e. `COPY` or `SHOW`) to the penultimate
 *
 * This is intended for after the other step validation and normalization
 * functions have been run, because it expects the last step to be either
 * `COPY` or `SHOW`
 */
export const moveResult = (steps: Step[]) => {
  const last = steps[steps.length - 1].action === Action.COPY ? 'copy' : 'show'
  let move = -1

  for (let i = 0; i < steps.length - 2; i++) {
    const step = steps[i]
    if ((step.action === Action.COPY && last === 'show') || (step.action === Action.SHOW && last === 'copy')) {
      move = i
      break
    }
  }

  if (move !== -1) {
    const [step] = steps.splice(move, 1)
    steps.splice(steps.length - 1, 0, step)
  }
}

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

/**
 * Replaces properties that needn't be written to file when saving a
 * textile (intended as the second argument to `JSON.stringify()`)
 *
 * @param key The string name of the current property being processed by `JSON.stringify()`
 * @param value The value of the current property being processed by `JSON.stringify()`
 */
export const replacer = (key: string, value: unknown) => {
  if (key === 'error' || key === 'id') {
    return undefined // Remove the `error` object from each step, and all `id` properties.
  }

  return value
}
