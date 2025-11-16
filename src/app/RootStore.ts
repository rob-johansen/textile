import { makeAutoObservable } from 'mobx'

import { HomeStore } from '@/app/components/Home/Store'
import { ToolbarStore } from '@/app/components/Toolbar/Store'

export class RootStore {
  home: HomeStore
  toolbar: ToolbarStore

  constructor() {
    this.home = new HomeStore(this)
    this.toolbar = new ToolbarStore(this)
    makeAutoObservable(this)
  }
}
