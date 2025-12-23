import { makeAutoObservable } from 'mobx'

import { Action } from '@/types/Action'
import { Input } from '@/types/Input'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

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
    const nextStep = this.state.textile.steps[index + 1]
    return index === this.state.textile.steps.length - 1 || (nextStep && [Action.COPY, Action.SHOW].includes(nextStep.action))
  }

  moveUpDisabled = (index: number): boolean => {
    const step = this.state.textile.steps[index]
    return index === 1 || [Action.COPY, Action.SHOW].includes(step.action)
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

  showInputSelect = (index: number): boolean => {
    const step = this.state.textile.steps[index]
    return index === 0 || (step.action && ![Action.COPY, Action.SHOW].includes(step.action))
  }

  showActionSelect = (index: number): boolean => {
    return index > 0
  }

  showMoveDelete = (index: number): boolean => {
    return index > 0
  }
}
