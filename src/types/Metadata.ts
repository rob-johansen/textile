export type Metadata = {
  path?: string // For when the step's `input` is `COMMAND_RUNTIME`
  replacement?: string // For when the step's `input` is `REPLACE_TARGET`
}
