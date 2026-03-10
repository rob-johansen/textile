import { makeAutoObservable } from 'mobx'

import { copy } from '@/app/utils/textile'
import { Status } from '@/types/Status'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

export class ListStore {
  root: RootStore
  switchTextile: Textile = {} as Textile

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
    if (this.root.home.state.status === Status.CREATING || this.root.home.state.status === Status.EDITING) {
      this.switchTextile = textile
      return
    }

    this.switch(textile)
  }

  onConfirmSwitchNo = () => {
    this.switchTextile = {} as Textile
  }

  onConfirmSwitchYes = () => {
    this.switch(this.switchTextile)
    this.switchTextile = {} as Textile
  }

  switch = (textile: Textile) => {
    if (this.root.home.state.status === Status.EDITING) {
      copy(this.root.home.state.editTextile, this.root.home.state.textile)
    }

    this.root.home.state.status = Status.VIEWING
    this.root.home.state.textile = textile
  }
}
