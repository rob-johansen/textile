import { makeAutoObservable } from 'mobx'

import { Status } from '@/types/Status'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

export class ListStore {
  root: RootStore

  constructor(root: RootStore) {
    this.root = root
    makeAutoObservable(this)
  }

  get emptyText(): string {
    const text = this.root.toolbar.state.searchText
    const textiles = this.root.home.state.textiles
    return `No textiles ${(text && textiles.length > 0) ? 'found' : 'yet'}`
  }

  get textiles(): Textile[] {
    const text = this.root.toolbar.state.searchText
    return this.root.home.state.textiles.filter((textile) => {
      if (!text || textile.name.toLowerCase().includes(text.toLowerCase())) {
        return textile
      }
    })
  }

  isSelected = (textile: Textile): boolean => {
    return textile.id === this.root.home.state.textile.id
  }

  onClickTextile = (textile: Textile) => {
    // TODO: If you're in the middle of CREATING / EDITING, ask the user to confirm switching to VIEWING? (Otherwise they could lose unsaved changes.)
    this.root.home.state.status = Status.VIEWING
    this.root.home.state.textile = textile
  }
}
