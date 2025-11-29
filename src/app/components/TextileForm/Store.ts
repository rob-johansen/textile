import { makeAutoObservable } from 'mobx'
import { v4 as uuid } from 'uuid';

import { Action } from '@/types/Action'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

type State = {
  nameError: string
}

export class TextileFormStore {
  root: RootStore
  state: State

  constructor(root: RootStore) {
    this.root = root
    this.state = {
      nameError: '',
    }
    makeAutoObservable(this)
  }

  get textile(): Textile {
    return this.root.home.state.textile
  }

  onChangeAction = (action: Action, index: number) => {
    let step = this.textile.steps[index]
    if (!step) {
      step = { action, id: uuid(), value: '' }
      this.textile.steps[index] = step
    } else {
      step.action = action
    }
  }

  onChangeName = (value: string): void => {
    this.textile.name = value
  }
}
