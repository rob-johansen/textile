import { observer } from 'mobx-react-lite'
import { useContext } from 'react'

import { Icon, Search } from '@/app/components/Icon'
import { StoreContext } from '@/app/contexts/StoreContext'
import { TextField } from '@/app/components/TextField'

export const Toolbar = observer(() => {
  const { toolbar: store } = useContext(StoreContext)

  return (
    <div className="bg-slate-100 border-b border-b-gray-300 draggable flex h-[56px] justify-center">
      <div className="mt-[10px] w-[50%]">
        <TextField
          hideError={true}
          icon={() => <Icon primary="#64748b" source={Search} />}
          placeholder="Search"
          onChange={(event) => store.onChangeSearch(event.target.value)}
          outerClassName="w-full"
          value={store.state.searchText}
        />
      </div>
    </div>
  )
})
