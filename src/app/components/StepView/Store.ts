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
    return `${step.value} ${step.metadata.args?.map((arg) => arg.value).join(' ')}`
  }

  getPath = (step: Step): string => {
    return step.metadata.path ?? ''
  }
}
