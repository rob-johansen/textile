import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuid } from 'uuid'

import { Action } from '@/types/Action'
import { getDupe } from '@/app/utils/shortcut'
import { Input } from '@/types/Input'
import { copy, moveResult, removeDupes, replacer } from '@/app/utils/textile'
import { scrollTo } from '@/app/utils/scroll'
import { sort } from '@/utils/shared/textiles'
import { Status } from '@/types/Status'
import { validateLastStep, validateName } from '@/app/components/Textile/validations'
import { validateStep } from '@/app/components/Step/validations'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

type State = {
  canceling: boolean
  editingShortcut: boolean
  nameError: string
  shortcutDupe?: Textile
  showLastStepError: boolean
  textile: Textile
}

export class TextileStore {
  root: RootStore
  state: State

  constructor(root: RootStore) {
    this.root = root
    this.state = {
      canceling: false,
      editingShortcut: false,
      nameError: '',
      showLastStepError: false,
      textile: root.home.state.textile
    }
    makeAutoObservable(this)
  }

  onCancelShortcutDupe = () => {
    this.state.editingShortcut = true
    this.state.shortcutDupe = undefined
  }

  onCancelNo = () => {
    this.state.canceling = false
  }

  onCancelYes = () => {
    this.state.canceling = false

    if (this.root.home.state.status === Status.CREATING) {
      this.root.home.state.status = Status.NOTHING
    } else if (this.root.home.state.status === Status.EDITING) {
      copy(this.root.home.state.editTextile, this.root.home.state.textile)
      this.root.home.state.editTextile = {
        id: '',
        name: '',
        steps: [],
      }
      this.root.home.state.status = Status.VIEWING
    }
  }

  onChangeName = (value: string): void => {
    this.state.textile.name = value
    this.state.nameError = ''
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

  onClickCancel = () => {
    this.state.canceling = true
  }

  onClickSave = async () => {
    const validName = validateName(this)

    const shortcutDupe = getDupe(this.state.textile, this.root.home.state.textiles)
    if (shortcutDupe) {
      this.state.shortcutDupe = shortcutDupe
      return
    }

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
      runInAction(() => {
        if (this.root.home.state.status === Status.CREATING) {
          this.root.home.state.textiles.push({ ...this.state.textile })
          sort(this.root.home.state.textiles)
        }
        this.root.home.state.status = Status.VIEWING
      })
    } else {
      // TODO: Show an error toast about not being able to save the textile...
      console.log('Error...')
    }
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

  onRemoveShortcut = async () => {
    const dupe = this.state.shortcutDupe
    if (!dupe) return // TypeScript doesn't know that `dupe` will never be `undefined` here.

    dupe.keyboard = undefined

    const success = await window.main.writeTextile(dupe.id, JSON.stringify(dupe, replacer, 2))

    if (success) {
      runInAction(() => {
        this.state.shortcutDupe = undefined
        this.onClickSave()
      })
    } else {
      // TODO: Show an error toast about not being able to remove the shortcut...
      console.log('Error removing shortcut...')
    }
  }
}
