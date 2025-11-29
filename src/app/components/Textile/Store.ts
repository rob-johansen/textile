import { makeAutoObservable } from 'mobx'

import { Action } from '@/types/Action'
import { Input } from '@/types/Input'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

type State = {
  nameError: string
  textile: Textile
}

export class TextileStore {
  root: RootStore
  state: State

  constructor(root: RootStore) {
    this.root = root
    this.state = {
      nameError: '',
      textile: root.home.state.textile
    }
    makeAutoObservable(this)
  }

  onChangeAction = (action: Action, index: number) => {
    this.state.textile.steps[index].action = action
  }

  onChangeInput = (input: Input, index: number) => {
    this.state.textile.steps[index].input = input
  }

  onChangeName = (value: string): void => {
    this.state.textile.name = value
  }

  onChangeValue = (value: string, index: number) => {
    this.state.textile.steps[index].value = value
  }
}
