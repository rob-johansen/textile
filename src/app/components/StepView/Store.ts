import { makeAutoObservable } from 'mobx'

import type { RootStore } from '@/app/RootStore'
import type { Step } from '@/types/Step'

export class StepViewStore {
  root: RootStore

  constructor(root: RootStore) {
    this.root = root
    makeAutoObservable(this)
  }

  getCommand = (step: Step): string => {
    const args = step.metadata.args?.filter((arg) => arg.value.length > 0).map(arg => arg.value) ?? []
    return `${step.value}${args.length > 0 ? ` ${args.join(' ')}` : ''}`
  }

  getPath = (step: Step): string => {
    return step.metadata.path ?? ''
  }
}
