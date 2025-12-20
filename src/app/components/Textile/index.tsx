import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'

import { Step } from '@/app/components/Step'
import { StoreContext } from '@/app/contexts/StoreContext'
import { TextField } from '@/app/components/TextField'
import { TextileStore } from './Store'

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
          return (
            <Step
              index={index}
              key={step.id}
              onChangeInput={store.onChangeInput}
              onChangeValue={store.onChangeValue}
              step={step}
            />
          )
        })}
      </div>
    </div>
  )
})
