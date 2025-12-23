import type { Action } from '@/types/Action'
import type { Input } from '@/types/Input'
import type { Metadata } from '@/types/Metadata'

export type Step = {
  action: Action;
  id: string
  input: Input
  metadata: Metadata
  value: string;
}
