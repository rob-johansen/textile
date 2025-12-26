import { makeAutoObservable } from 'mobx'
import { v4 as uuid } from 'uuid'

import { Action } from '@/types/Action'
import { Input } from '@/types/Input'
import type { RootStore } from '@/app/RootStore'
import type { Step } from '@/types/Step'
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

  onChangeAction = (step: Step, action: Action) => {
    step.action = action

    if (action === Action.REPLACE) {
      step.input = Input.REPLACE_TARGET
    } else {
      step.input = '' as Input
    }
  }

  onChangeArg = (step: Step, index: number, value: string) => {
    const args = step.metadata.args
    if (args) {
      args[index].value = value
    }
  }

  onChangeInput = (step: Step, input: Input) => {
    step.input = input
    step.metadata.args = step.input === Input.COMMAND_RUNTIME ? [{id: uuid(), value: ''}] : undefined
    step.metadata.path = step.input === Input.COMMAND_RUNTIME ? '' : undefined
    step.metadata.replacement = step.input === Input.REPLACE_TARGET ? '' : undefined
    step.value = ''
  }

  onChangeMetadata = (step: Step, value: string) => {
    if (step.input === Input.COMMAND_RUNTIME) {
      step.metadata.path = value
    } else if (step.input === Input.REPLACE_TARGET) {
      step.metadata.replacement = value
    }
  }

  onChangeValue = (value: string, index: number) => {
    this.state.textile.steps[index].value = value
  }

  onClickAddArg = (step: Step) => {
    const args = step.metadata.args
    if (args) {
      args.push({ id: uuid(), value: '' })
    }
  }

  onClickDeleteArg = (step: Step, index: number) => {
    const args = step.metadata.args
    if (args) {
      args.splice(index, 1)
    }
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

  showArgInputs = (step: Step): boolean => {
    return step.input === Input.COMMAND_RUNTIME
  }

  showActionSelect = (index: number): boolean => {
    return index > 0
  }

  showCommandInput = (step: Step): boolean => {
    return step.input === Input.COMMAND_RUNTIME
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

  showPathInput = (step: Step): boolean => {
    return step.input === Input.COMMAND_RUNTIME
  }

  showReplaceInputs = (step: Step): boolean => {
    return step.input === Input.REPLACE_TARGET
  }

  showTextArea = (step: Step): boolean => {
    return step.input === Input.TEXT_NOW
  }
}
