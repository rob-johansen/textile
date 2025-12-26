import { makeAutoObservable } from 'mobx'
import { v4 as uuid } from 'uuid'

import { Action } from '@/types/Action'
import { Input } from '@/types/Input'
import { scrollTo } from '@/app/utils/scroll'
import { validateName } from '@/app/components/Textile/validations'
import type { RootStore } from '@/app/RootStore'
import type { Textile } from '@/types/Textile'

type State = {
  nameError: string
  textile: Textile
}

export class TextileStore {
  root: RootStore
  state: State

  constructor(root: RootStore) {
    this.root = root
    this.state = {
      nameError: '',
      textile: root.home.state.textile
    }
    makeAutoObservable(this)
  }

  onClickAddStep = () => {
    this.state.textile.steps.push({
      action: '' as Action,
      id: uuid(),
      input: '' as Input,
      metadata: {},
      value: ''
    })
  }

  onClickSave = async () => {
    const validName = validateName(this)

    if (!validName) {
      scrollTo('name')
      return
    }
  }

  onChangeName = (value: string): void => {
    this.state.textile.name = value
    this.state.nameError = ''
  }
}
