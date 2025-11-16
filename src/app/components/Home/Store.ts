import { makeAutoObservable, runInAction } from 'mobx'

import type { RootStore } from '@/app/RootStore'

type State = {
  starting: boolean
}

export class HomeStore {
  root: RootStore
  state: State = {
    starting: true
  }

  constructor(root: RootStore) {
    this.root = root
    makeAutoObservable(this)

    void this.loadTextiles()
  }

  loadTextiles = async (): Promise<void> => {
    const textiles = await window.main.loadTextiles()

    runInAction(() => {
      // TODO: At this moment in time, the files are loaded and you're ready to stop showing a splash screen in the UI.
      for (const textile of textiles) {
        console.log(textile.name)
      }

      this.state.starting = false
    })
  }
}
