import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { Button } from '@/app/components/Button'
import { Icon, Plus, Search } from '@/app/components/Icon'
import { StoreContext } from '@/app/contexts/StoreContext'
import { TextField } from '@/app/components/TextField'

export const Toolbar = observer(() => {
  const { toolbar: store } = useContext(StoreContext)

  return (
    <div className="bg-slate-100 border-b border-b-gray-300 draggable flex h-[56px] justify-center">
      <div className="flex gap-x-[16px] items-center w-[50%]">
        <TextField
          className="bg-slate-50 focus:bg-white"
          hideError={true}
          icon={() => <Icon primary="#64748b" source={Search} />}
          id="search"
          placeholder="Search"
          onChange={(event) => store.onChangeSearch(event.target.value)}
          outerClassName="min-w-[300px] w-full"
          value={store.state.searchText}
        />
        <Button
          icon={{ element: () => <Icon className="size-[20px]" primary="#ffffff" source={Plus} /> }}
          onClick={store.root.home.onClickNew}
        >
          New Textile
        </Button>
      </div>
    </div>
  )
})
