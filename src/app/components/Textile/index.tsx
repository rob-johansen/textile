import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'

import { StoreContext } from '@/app/contexts/StoreContext'
import { TextField } from '@/app/components/TextField'
import { TextileStore } from './Store'
import { Action } from '@/types/Action'
import { Select } from '@/app/components/Select'
import { Input } from '@/types/Input'
import { Clipboard, Terminal, Text } from '@/app/components/Icon'
import { TextArea } from '@/app/components/TextArea'

export const Textile = observer(() => {
  const root = useContext(StoreContext)
  const [store] = useState(() => new TextileStore(root))

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
          value={store.state.textile.name}
        />
      </div>
      <div>
        {store.state.textile.steps.map((step, index) => {
          let inputIcon
          if (step.input === Input.CLIPBOARD_RUNTIME) inputIcon = Clipboard
          if (step.input === Input.COMMAND_RUNTIME) inputIcon = Terminal
          if (step.input === Input.TEXT_NOW) inputIcon = Text

          return (
            <div className="flex flex-col w-fit" key={step.id}>
              <div className="flex gap-x-[8px] items-start">
                <div className="flex gap-x-[8px] items-center relative top-[2px]">
                <span className="bg-green-700 flex font-bold items-center justify-center rounded-full size-[32px] text-white">
                  {index + 1}
                </span>
                  {step.action === Action.START ? (
                    <span>Start with:</span>
                  ) : (
                    <span>select with append, replace, etc.</span>
                  )}
                </div>
                <Select
                  onClickOption={({value}) => store.onChangeInput(value as Input, index)}
                  options={[
                    { icon: Text, name: 'Text that I will provide now', value: Input.TEXT_NOW },
                    { icon: Clipboard, name: 'The text on my clipboard when I run this textile', value: Input.CLIPBOARD_RUNTIME },
                    { icon: Terminal, name: 'The output of a command when I run this textile', value: Input.COMMAND_RUNTIME },
                  ]}
                  outerClassName={step.input ? '' : 'w-[66px]'}
                  placeholder="..."
                  value={step.input || ''}
                  {...(inputIcon ? {icon: inputIcon} : {})}
                />
              </div>
              {(step.input === Input.TEXT_NOW || step.input === Input.COMMAND_RUNTIME) && (
                <TextArea
                  className="field-sizing-content whitespace-pre"
                  onChange={(event) => store.onChangeValue(event.target.value, index)}
                  outerClassName="w-[386px] self-end"
                  placeholder={step.input === Input.TEXT_NOW ? 'Enter the text here' : 'Enter the command here'}
                  value={step.value}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
})
