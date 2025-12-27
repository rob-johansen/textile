import { Action } from '@/types/Action'
import { Input } from '@/types/Input'
import type { Step } from '@/types/Step'

export const validateStep = (step: Step): boolean => {
  if (!step.action) {
    step.error.action = 'Required'
    return false
  }

  if (!step.input) {
    step.error.input = 'Required'
    return false
  }

  if (step.input === Input.CLIPBOARD_RUNTIME) return true

  if (step.input === Input.TEXT_NOW && !step.value) {
    step.error.value = 'Please enter the text'
    return false
  }

  if (step.input === Input.COMMAND_RUNTIME) {
    let error = false

    if (!step.value) {
      step.error.value = 'Please enter the command'
      error = true
    }

    if (!step.metadata.path) {
      step.error.path = 'Please enter the path'
      error = true
    }

    if (error) return false
  }

  if (step.action === Action.REPLACE) {
    let error = false

    if (!step.value) {
      step.error.value = 'Required'
      error = true
    }

    if (!step.metadata.replacement) {
      step.error.replacement = 'Required'
      error = true
    }

    if (error) return false
  }

  return true
}
