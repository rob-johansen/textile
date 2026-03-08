import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuid } from 'uuid'

import { Action } from '@/types/Action'
import { copy } from '@/app/utils/textile'
import { Input } from '@/types/Input'
import { Status } from '@/types/Status'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

type State = {
  confirmNew: boolean
  editTextile: Textile // A copy of the textile currently being edited (so we can restore if the user cancels)
  status: string
  textile: Textile // The currently selected textile
  textiles: Textile[] // The list of all textiles on the left
}

export class HomeStore {
  root: RootStore
  state: State = {
    confirmNew: false,
    editTextile: {
      id: '',
      name: '',
      steps: [],
    },
    status: Status.STARTING,
    textile: {
      id: '',
      name: '',
      steps: [],
    },
    textiles: [],
  }

  constructor(root: RootStore) {
    this.root = root
    makeAutoObservable(this)

    void this.loadTextiles()
  }

  loadTextiles = async (): Promise<void> => {
    const textiles = await window.main.loadTextiles()

    runInAction(() => {
      // TODO: At this moment in time, the files are loaded and
      //       you can stop showing a splash screen in the UI.

      this.state.status = Status.NOTHING
      this.state.textiles = textiles
    })
  }

  onClickNew = () => {
    if (this.state.status === Status.CREATING || this.state.status === Status.EDITING) {
      this.state.confirmNew = true
      return
    }

    this.startNewTextile()
  }

  onClickNewNo = () => {
    this.state.confirmNew = false
  }

  onClickNewYes = () => {
    this.state.confirmNew = false

    if (this.state.status === Status.EDITING) {
      copy(this.state.editTextile, this.state.textile)
    }

    this.startNewTextile()
  }

  startNewTextile = () => {
    this.state.status = Status.CREATING
    this.state.textile = {
      id: uuid(),
      name: '',
      steps: [
        {
          action: Action.START,
          error: {
            action: '',
            input: '',
            path: '',
            replacement: '',
            value: '',
          },
          id: uuid(),
          input: '' as Input,
          metadata: {},
          value: ''
        }
      ],
    }
  }
}
