import { makeAutoObservable } from 'mobx'

import { HomeStore } from '@/app/components/Home/Store'
import { ListStore } from '@/app/components/List/Store'
import { ToolbarStore } from '@/app/components/Toolbar/Store'

export class RootStore {
  home: HomeStore
  list: ListStore
  toolbar: ToolbarStore

  constructor() {
    this.home = new HomeStore(this)
    this.list = new ListStore(this)
    this.toolbar = new ToolbarStore(this)
    makeAutoObservable(this)
  }
}
