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
    const step = this.state.textile.steps[index]
    step.action = action

    if (action === Action.REPLACE) {
      step.input = Input.REPLACE_TARGET
    } else {
      step.input = '' as Input
    }
  }

  onChangeInput = (input: Input, index: number) => {
    this.state.textile.steps[index].input = input
  }

  onChangeMetadata = (value: string, index: number) => {
    const step = this.state.textile.steps[index]

    if (step.input === Input.COMMAND_RUNTIME) {
      step.metadata.path = value
      step.metadata.replacement = undefined
    } else if (step.input === Input.REPLACE_TARGET) {
      step.metadata.path = undefined
      step.metadata.replacement = value
    }
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

  showActionSelect = (index: number): boolean => {
    return index > 0
  }

  showDeleteMoveButtons = (index: number): boolean => {
    return index > 0
  }

  showInputSelect = (index: number): boolean => {
    const step = this.state.textile.steps[index]

    if (step.input === Input.REPLACE_TARGET) {
      return false
    }

    return index === 0 || (step.action && ![Action.COPY, Action.SHOW].includes(step.action))
  }

  showPathInput = (index: number): boolean => {
    const step = this.state.textile.steps[index]
    return step.input === Input.COMMAND_RUNTIME
  }

  showReplaceInputs = (index: number): boolean => {
    const step = this.state.textile.steps[index]
    return step.input === Input.REPLACE_TARGET
  }

  showValueTextArea = (index: number): boolean => {
    const step = this.state.textile.steps[index]
    return [Input.COMMAND_RUNTIME, Input.TEXT_NOW].includes(step.input)
  }
}
