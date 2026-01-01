import { makeAutoObservable } from 'mobx'

import { HomeStore } from '@/app/components/Home/Store'
import { KeyboardStore } from '@/app/components/Keyboard/Store'
import { ListStore } from '@/app/components/List/Store'
import { ToolbarStore } from '@/app/components/Toolbar/Store'

export class RootStore {
  home: HomeStore
  keyboard: KeyboardStore
  list: ListStore
  toolbar: ToolbarStore

  constructor() {
    this.home = new HomeStore(this)
    this.keyboard = new KeyboardStore(this)
    this.list = new ListStore(this)
    this.toolbar = new ToolbarStore(this)
    makeAutoObservable(this)
  }
}
