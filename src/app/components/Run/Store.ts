import { makeAutoObservable, toJS } from 'mobx'

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
      if (step.input === Input.COMMAND_RUNTIME) {
        try {
          const result = await window.main.runCommand(toJS(step))
          console.log(`Result of command step: [${result}]`)
          // TODO: Add `result` to `output`...
        } catch (err) {
          // TODO: Show a toast and stop running the textile
          console.log(`Error running command step:`, err)
        }
      }
    }
  }
}
