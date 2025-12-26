import type { TextileStore } from '@/app/components/Textile/Store'

export const validateName = (store: TextileStore): boolean => {
  if (!store.state.textile.name.trim()) {
    store.state.nameError = 'Please enter a name for this textile'
    return false
  }
  return true
}
