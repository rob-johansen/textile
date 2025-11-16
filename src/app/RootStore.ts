import { makeAutoObservable } from 'mobx'

import { HomeStore } from '@/app/components/Home/Store'

export class RootStore {
  home: HomeStore

  constructor() {
    this.home = new HomeStore(this)
    makeAutoObservable(this)
  }
}
