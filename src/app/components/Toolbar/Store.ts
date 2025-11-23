import { makeAutoObservable } from 'mobx'

import type { RootStore } from '@/app/RootStore'

type State = {
  searchText: string
}

export class ToolbarStore {
  root: RootStore
  state: State = {
    searchText: ''
  }

  constructor(root: RootStore) {
    this.root = root
    makeAutoObservable(this)
  }

  onChangeSearch = (value: string): void => {
    this.state.searchText = value
  }
}
