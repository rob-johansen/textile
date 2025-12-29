import { app } from 'electron'
import { join } from 'node:path'
import { writeFile } from 'node:fs/promises'
import type { IpcMainInvokeEvent } from 'electron/common'

import { logger } from '@/utils/main/logger'

// Electron requires `args` to have a type of `any[]` so we disable the `@typescript-eslint/no-explicit-any` eslint rule.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const writeTextile = async (_event: IpcMainInvokeEvent, ...args: any[]): Promise<boolean> => {
  const id = args[0] as string
  const textile = args[1] as string
  const file = join(app.getPath('documents'), 'Textile', `${id}.json`)

  try {
    const result = await writeFile(file, textile, { mode: 0o644 })
    return result === undefined // Yep, an `undefined` result means success.
  } catch (err) {
    logger.error(`Error writing textile to "${file}": %0`, err)
  }

  return false
}
