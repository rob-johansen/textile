import { makeAutoObservable } from 'mobx'

import type { Option } from './Option'

type State = {
  open: boolean
  options: Option[]
}

export class SelectStore {
  state: State

  constructor(options: Option[]) {
    this.state = {
      open: false,
      options: [...options]
    }
    makeAutoObservable(this)
  }

  setOpen = (value: boolean): void => {
    this.state.open = value
  }
}
