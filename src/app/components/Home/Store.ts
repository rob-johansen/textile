import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuid } from 'uuid'

import { Action } from '@/types/Action'
import { Input } from '@/types/Input'
import { Status } from '@/types/Status'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

type State = {
  status: string
  textile: Textile
}

export class HomeStore {
  root: RootStore
  state: State = {
    status: Status.STARTING,
    textile: {
      id: '',
      name: '',
      steps: [],
    }
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

      this.state.status = Status.NOTHING
    })
  }

  onClickNew = (): void => {
    this.state.status = Status.CREATING
    this.state.textile = {
      id: uuid(),
      name: '',
      steps: [
        { action: Action.START, id: uuid(), input: '' as Input, value: '' }
      ],
    }
  }
}
