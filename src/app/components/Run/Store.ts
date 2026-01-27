import { makeAutoObservable, toJS } from 'mobx'

import { Action } from '@/types/Action'
import { Input } from '@/types/Input'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

export class RunStore {
  root: RootStore

  constructor(root: RootStore) {
    this.root = root
    makeAutoObservable(this)
  }

  run = async (textile: Textile) => {
    let output = ''

    for (const step of textile.steps) {
      if (step.action === Action.START) {
        if (step.input === Input.COMMAND_RUNTIME) {
          try {
            const result = await window.main.runCommand(toJS(step))
            output += result
          } catch (err) {
            // TODO: Show a toast and stop running the textile
            console.log(`Error running command step:`, err)
          }
        } else if (step.input === Input.TEXT_NOW) {
          output += step.value
        }
      } else if (step.action === Action.REPLACE) {
        if (!step.metadata.replacement) {
          // TODO: Show a toast and stop running the textile
          console.log('No replacement in replace step...')
        } else {
          output = output.replaceAll(step.value, step.metadata.replacement)
        }
      } else if (step.action === Action.PREPEND) {
        if (step.input === Input.TEXT_NOW) {
          output = `${step.value}${output}`
        }
      } else if (step.action === Action.APPEND) {
        if (step.input === Input.CLIPBOARD_RUNTIME) {
          const result = await window.main.copyFromClipboard()
          output = `${output}${result}`
        } else if (step.input === Input.TEXT_NOW) {
          output = `${output}${step.value}`
        }
      } else if (step.action === Action.COPY) {
        await window.main.copyToClipboard(output)
      }
    }
  }
}
