import { makeAutoObservable } from 'mobx'

import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

export class TextileViewStore {
  root: RootStore

  constructor(root: RootStore) {
    this.root = root
    makeAutoObservable(this)
  }

  get textile(): Textile {
    return this.root.home.state.textile
  }

  onClickEdit = () => {

  }
}
