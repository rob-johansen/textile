import type { Action } from '@/types/Action'
import type { Input } from '@/types/Input'

export type Step = {
  action: Action;
  id: string
  input: Input
  value: string;
}
