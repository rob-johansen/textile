import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'

import { Clipboard, Terminal, Text } from '@/app/components/Icon'
import { Select } from '@/app/components/Select'
import { StoreContext } from '@/app/contexts/StoreContext'
import { Toolbar } from '@/app/components/Toolbar'

export const Home = observer(() => {
  const { home } = useContext(StoreContext)
  const [value, setValue] = useState('')

  return (
    <div>
      {home.state.starting ? (
        <>Starting up...</>
      ) : (
        <>
          <Toolbar />
          <div className="m-[24px]">
            <Select
              onClickOption={({value}) => setValue(value)}
              options={[
                { icon: Text, name: 'Text that I will provide now', value: 'text_now' },
                { icon: Clipboard, name: 'The contents of my clipboard when I run this textile', value: 'clipboard_runtime' },
                { icon: Terminal, name: 'The output of a command when I run this textile', value: 'command_runtime' },
              ]}
              outerClassName="w-[500px]"
              value={value}
            />
          </div>
        </>
      )}
    </div>
  )
})
