import type { Arg } from '@/types/Arg'

export type Metadata = {
  args?: Arg[]  // For when the step's `input` is `COMMAND_RUNTIME`
  path?: string // For when the step's `input` is `COMMAND_RUNTIME`
  replacement?: string // For when the step's `input` is `REPLACE_TARGET`
}
