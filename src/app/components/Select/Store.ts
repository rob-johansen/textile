import { makeAutoObservable } from 'mobx'

import type { Option } from './Option'

type State = {
  open: boolean
  options: Option[]
}

export class SelectStore {
  state: State

  constructor(options: Option[], value: string) {
    this.state = {
      open: false,
      options: [...options]
    }

    for (const option of this.state.options) {
      option.selected = option.value === value
    }

    makeAutoObservable(this)
  }

  onClickOption = ({ value }: Option): void => {
    for (const option of this.state.options) {
      option.selected = option.value === value
    }
    this.setOpen(false)
  }

  setOpen = (value: boolean): void => {
    this.state.open = value
  }
}
