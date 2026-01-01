import type { Keyboard } from '@/types/Keyboard'
import type { Step } from '@/types/Step'

export type Textile = {
  id: string
  keyboard?: Keyboard
  name: string
  steps: Step[]
}
