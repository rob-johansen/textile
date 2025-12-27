import { Action } from '@/types/Action'
import type { Step } from '@/types/Step'
import type { TextileStore } from '@/app/components/Textile/Store'

export const validateLastStep = (steps: Step[]): boolean => {
  const last = steps[steps.length - 1]
  return last.action === Action.COPY || last.action === Action.SHOW
}

export const validateName = (store: TextileStore): boolean => {
  if (!store.state.textile.name.trim()) {
    store.state.nameError = 'Please enter a name for this textile'
    return false
  }
  return true
}
