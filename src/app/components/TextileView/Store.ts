import { makeAutoObservable, runInAction } from 'mobx'

import { copy } from '@/app/utils/textile'
import { showToast } from '@/app/components/Toast'
import { Status } from '@/types/Status'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

export class TextileViewStore {
  confirmingDelete = false
  root: RootStore

  constructor(root: RootStore) {
    this.root = root
    makeAutoObservable(this)
  }

  get textile(): Textile {
    return this.root.home.state.textile
  }

  onCancelDelete = () => {
    this.confirmingDelete = false
  }

  onClickDelete = () => {
    this.confirmingDelete = true
  }

  onClickEdit = () => {
    copy(this.textile, this.root.home.state.editTextile)
    this.root.home.state.status = Status.EDITING
  }

  onClickRun = () => {
    this.root.run.run(this.textile)
  }

  onConfirmDelete = async () => {
    const success = await window.main.deleteTextile(this.textile.id)

    if (success) {
      runInAction(() => {
        // Remove the deleted textile from the list on the left.
        const index = this.root.home.state.textiles.findIndex(textile => textile.id === this.textile.id)
        if (index !== -1) {
          this.root.home.state.textiles.splice(index, 1)
        }

        // Reset the current textile back to defaults.
        this.root.home.state.textile = {
          id: '',
          name: '',
          steps: [],
        }

        // Prompt the user to choose another textile or create a new one.
        this.root.home.state.status = Status.NOTHING

        this.onCancelDelete()
      })
    } else {
      showToast({ message: 'There was an error deleting the textile. Please try again.', type: 'error' })
    }
  }
}
