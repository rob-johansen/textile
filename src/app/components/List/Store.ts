import { makeAutoObservable } from 'mobx'

import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

export class ListStore {
  root: RootStore

  constructor(root: RootStore) {
    this.root = root
    makeAutoObservable(this)
  }

  get textiles(): Textile[] {
    return this.root.home.state.textiles
  }
}
