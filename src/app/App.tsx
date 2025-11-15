import { StoreProvider } from '@/app/providers/StoreProvider'

export const App = () => {
  return (
    <StoreProvider>
      <div>Hello, React!</div>
    </StoreProvider>
  )
}
