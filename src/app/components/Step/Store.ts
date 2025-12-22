import { makeAutoObservable } from 'mobx'

import { Input } from '@/types/Input'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'
import { Action } from '@/types/Action'

type State = {
  textile: Textile
}

export class StepStore {
  root: RootStore
  state: State

  constructor(root: RootStore) {
    this.root = root
    this.state = {
      textile: root.home.state.textile
    }
    makeAutoObservable(this)
  }

  moveDownDisabled = (index: number): boolean => {
    return index === this.state.textile.steps.length - 1
  }

  moveUpDisabled = (index: number): boolean => {
    return index === 1
  }

  onChangeAction = (action: Action, index: number) => {
    this.state.textile.steps[index].action = action
  }

  onChangeInput = (input: Input, index: number) => {
    this.state.textile.steps[index].input = input
  }

  onChangeValue = (value: string, index: number) => {
    this.state.textile.steps[index].value = value
  }

  onClickDeleteStep = (index: number) => {
    this.state.textile.steps.splice(index, 1)
  }

  onClickMoveDown = (index: number) => {
    const [step] = this.state.textile.steps.splice(index, 1)
    this.state.textile.steps.splice(index + 1, 0, step)
  }

  onClickMoveUp = (index: number) => {
    const [step] = this.state.textile.steps.splice(index, 1)
    this.state.textile.steps.splice(index - 1, 0, step)
  }

  showMoveDelete = (index: number): boolean => {
    return index > 0
  }
}
