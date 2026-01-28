import { makeAutoObservable, toJS } from 'mobx'

import { Action } from '@/types/Action'
import { Input } from '@/types/Input'
import type { RootStore } from '@/app/RootStore'
import type { Step } from '@/types/Step'
import type { Textile } from '@/types/Textile'

export class RunStore {
  root: RootStore

  constructor(root: RootStore) {
    this.root = root
    makeAutoObservable(this)
  }

  runCommand = async (step: Step): Promise<string> => {
    let result = ''
    try {
      result = await window.main.runCommand(toJS(step))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // This is a no-op because, if the command failed, the main process will log it.
      // Also, the caller will show a toast if this method returns an empty string.
    }
    return result
  }

  run = async (textile: Textile) => {
    let output = ''

    for (const step of textile.steps) {
      if (step.action === Action.START) {
        if (step.input === Input.CLIPBOARD_RUNTIME) output = await window.main.copyFromClipboard()
        else if (step.input === Input.COMMAND_RUNTIME) output = await this.runCommand(step)
        else if (step.input === Input.TEXT_NOW) output = step.value

        if (!output) {
          // TODO: Show a toast
          return
        }
      } else if (step.action === Action.APPEND) {
        let result = ''

        if (step.input === Input.CLIPBOARD_RUNTIME) result = await window.main.copyFromClipboard()
        else if (step.input === Input.COMMAND_RUNTIME) result = await this.runCommand(step)
        else if (step.input === Input.TEXT_NOW) result = step.value

        if (!result) {
          // TODO: Show a toast
          return
        }

        output = `${output}${result}`
      } else if (step.action === Action.PREPEND) {
        let result = ''

        if (step.input === Input.CLIPBOARD_RUNTIME) result = await window.main.copyFromClipboard()
        else if (step.input === Input.COMMAND_RUNTIME) result = await this.runCommand(step)
        else if (step.input === Input.TEXT_NOW) result = step.value

        if (!result) {
          // TODO: Show a toast
          return
        }

        output = `${result}${output}`
      } else if (step.action === Action.REPLACE) {
        if (!step.metadata.replacement) {
          // TODO: Show a toast
          return
        }
        output = output.replaceAll(step.value, step.metadata.replacement)
      } else if (step.action === Action.COPY) {
        await window.main.copyToClipboard(output)
      } else if (step.action === Action.SHOW) {
        // TODO: Show the output ... somehow.
      }
    }
  }
}
