import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuid } from 'uuid'

import { Action } from '@/types/Action'
import { Input } from '@/types/Input'
import { moveResult, removeDupes, replacer } from '@/app/utils/textile'
import { scrollTo } from '@/app/utils/scroll'
import { validateLastStep, validateName } from '@/app/components/Textile/validations'
import { validateStep } from '@/app/components/Step/validations'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

type State = {
  editingShortcut: boolean
  nameError: string
  showLastStepError: boolean
  textile: Textile
}

export class TextileStore {
  root: RootStore
  state: State

  constructor(root: RootStore) {
    this.root = root
    this.state = {
      editingShortcut: false,
      nameError: '',
      showLastStepError: false,
      textile: root.home.state.textile
    }
    makeAutoObservable(this)
  }

  onClickAddStep = () => {
    this.state.textile.steps.push({
      action: '' as Action,
      error: {
        action: '',
        input: '',
        path: '',
        replacement: '',
        value: '',
      },
      id: uuid(),
      input: '' as Input,
      metadata: {},
      value: ''
    })
  }

  onClickSave = async () => {
    const validName = validateName(this)

    const textile = this.state.textile
    const steps = textile.steps
    let stepError = -1

    for (let i = steps.length - 1; i >= 0; i--) {
      const step = steps[i]
      if (!validateStep(step)) {
        stepError = i
      }
    }

    if (!validName) {
      scrollTo('name')
      return
    }

    if (stepError !== -1) {
      scrollTo(`step${stepError}`)
      return
    }

    if (!validateLastStep(steps)) {
      this.state.showLastStepError = true
      return
    }

    removeDupes(steps)
    moveResult(steps)

    const success = await window.main.writeTextile(textile.id, JSON.stringify(textile, replacer, 2))

    if (success) {
      // TODO: Show the textile in read-only form, with its name selected in the list on the left...
      runInAction(() => {
        this.root.home.state.textiles.push({ ...this.state.textile })
      })
    } else {
      // TODO: Show an error toast...
      console.log('Error...')
    }
  }

  onChangeName = (value: string): void => {
    this.state.textile.name = value
    this.state.nameError = ''
  }

  onCloseLastStepError = () => {
    this.state.showLastStepError = false
  }

  onDeleteShortcut = () => {
    this.state.textile.keyboard = undefined
  }

  onEditShortcut = () => {
    this.state.editingShortcut = true
  }

  onEscapeLastStepError = (open: boolean) => {
    this.state.showLastStepError = open
  }
}
