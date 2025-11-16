import { Home } from '@/app/components/Home'
import { StoreProvider } from '@/app/providers/StoreProvider'

export const App = () => {
  return (
    <StoreProvider>
      <Home />
    </StoreProvider>
  )
}
