// Electron requires `args` to have a type of `any[]` so we disable the `@typescript-eslint/no-explicit-any` eslint rule.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { clipboard } from 'electron'
import type { IpcMainInvokeEvent } from 'electron/common'

export const copyFromClipboard = (): string => {
  return clipboard.readText()
}

export const copyToClipboard = (_event: IpcMainInvokeEvent, ...args: any[]) => {
  clipboard.writeText(args[0])
}
