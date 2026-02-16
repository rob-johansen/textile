import { makeAutoObservable } from 'mobx'

import { Status } from '@/types/Status'
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
    this.root.home.state.status = Status.EDITING
  }

  onClickRun = () => {
    this.root.run.run(this.textile)
  }
}
