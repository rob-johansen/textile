import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'

import { Button } from '@/app/components/Button'
import { Icon, Plus } from '@/app/components/Icon'
import { Step } from '@/app/components/Step'
import { StoreContext } from '@/app/contexts/StoreContext'
import { TextField } from '@/app/components/TextField'
import { TextileStore } from './Store'

export const Textile = observer(() => {
  const root = useContext(StoreContext)
  const [store] = useState(() => new TextileStore(root))

  return (
    <div className="mt-[20px] pb-[56px] w-fit">
      <h1 className="text-[1.5rem] text-center tracking-[0.25px]">
        New Textile
      </h1>
      <div className="flex gap-x-[8px] items-start ml-[120px] mt-[20px]">
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
      <div className="mt-[16px]">
        {store.state.textile.steps.map((step, index) => {
          return (
            <Step
              index={index}
              key={step.id}
              step={step}
            />
          )
        })}
      </div>
      <div className="flex ml-[120px] mt-[16px]">
        <Button
          icon={{ element: () => <Icon className="size-[20px]" primary="#3b82f6" source={Plus} /> }}
          onClick={store.onClickAddStep}
          variant="secondary"
        >
          Add Step
        </Button>
      </div>
    </div>
  )
})
