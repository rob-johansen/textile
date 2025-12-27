import type { Action } from '@/types/Action'
import type { Input } from '@/types/Input'
import type { Metadata } from '@/types/Metadata'

// `Step` is an interface, not a type alias, because it's re-opened below to add
// the `error` property. This is necessary because `StepError` and `Step` depend
// on each other.
interface Step {
  action: Action;
  id: string
  input: Input
  metadata: Metadata
  value: string;
}

type StepError = Record<keyof Required<Pick<Step, 'action' | 'input' | 'value'> & Pick<Metadata, 'path' | 'replacement'>>, string>

interface Step {
  error: StepError
}

export { Step, StepError }
