import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'

import { Action } from '@/types/Action'
import { Clipboard, Terminal, Text } from '@/app/components/Icon'
import { Select } from '@/app/components/Select'
import { StoreContext } from '@/app/contexts/StoreContext'
import { TextField } from '@/app/components/TextField'
import { TextileFormStore } from '@/app/components/TextileForm/Store'

export const TextileForm = observer(() => {
  const root = useContext(StoreContext)
  const [store] = useState(() => new TextileFormStore(root))

  return (
    <div>
      <h1 className="text-[1.5rem] tracking-[0.25px]">
        New Textile
      </h1>
      <div className="flex gap-x-[8px] items-start mt-[16px]">
        <label className="relative top-[5px]" htmlFor="name">
          Name:
        </label>
        <TextField
          autoFocus
          error={store.state.nameError}
          id="name"
          onChange={(event) => store.onChangeName(event.target.value)}
          outerClassName="w-[300px]"
          value={store.textile.name}
        />
      </div>
      <div>
        {store.textile.steps.length === 0 && (
          <div className="flex gap-x-[8px] items-start">
            <div className="flex gap-x-[8px] items-center relative top-[2px]">
              <span className="bg-blue-500 flex font-bold items-center justify-center rounded-full size-[32px] text-white">
                1
              </span>
              <span>Start with:</span>
            </div>
            <Select
              onClickOption={({ value }) => store.onChangeAction(value as Action, 0)}
              options={[
                { icon: Text, name: 'Text that I will provide now', value: Action.TEXT_NOW },
                { icon: Clipboard, name: 'The contents of my clipboard when I run this textile', value: Action.CLIPBOARD_RUNTIME },
                { icon: Terminal, name: 'The output of a command when I run this textile', value: Action.COMMAND_RUNTIME },
              ]}
              outerClassName="w-[66px]"
              placeholder="..."
              value={store.textile.steps[0]?.value ?? ''}
            />
          </div>
        )}
        {/* TODO and WYLO: Once that first option is selected, loop over the steps and show them. (Also, switch to outline icons for Text and Clipboard.) */}
      </div>
    </div>
  )
})
