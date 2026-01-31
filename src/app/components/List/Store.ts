import { makeAutoObservable } from 'mobx'

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
    this.root.home.state.textile = textile
  }
}
