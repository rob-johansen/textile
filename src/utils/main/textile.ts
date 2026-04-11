// Electron requires `args` to have a type of `any[]` so we disable the `@typescript-eslint/no-explicit-any` eslint rule.
/* eslint-disable @typescript-eslint/no-explicit-any */

import { app } from 'electron'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { unlink, writeFile } from 'node:fs/promises'
import type { IpcMainInvokeEvent } from 'electron/common'

import { logger } from '@/utils/main/logger'
import type { Step } from '@/types/Step'

export const deleteTextile = async (_event: IpcMainInvokeEvent, ...args: any[]): Promise<boolean> => {
  const id = args[0] as string
  const file = join(app.getPath('documents'), 'Textile', `${id}.json`)

  try {
    const result = await unlink(file)
    return result === undefined // Yep, an `undefined` result means success.
  } catch (err) {
    logger.error(`Error deleting textile "${file}": %O`, err)
  }

  return false
}

export const runCommand = (_event: IpcMainInvokeEvent, ...args: any[]): Promise<string> => {
  const step = args[0] as Step

  return new Promise((resolve, reject) => {
    if (!step.value) {
      logger.error('Error running step with no value: %O', step)
      reject('A step in this textile should run a command, but the command is missing.')
      return
    }

    if (!step.metadata.path) {
      logger.error('Error running step with no `metadata.path`: %O', step)
      reject('A step in this textile should run a command, but the path is missing.')
      return
    }

    const cmd = step.value
    const argz = step.metadata.args?.filter(arg => arg.value.length > 0).map(arg => arg.value) ?? []
    let cwd = step.metadata.path
    if (cwd.startsWith('~')) {
      cwd = cwd.replace('~', homedir())
    }

    const command = spawn(cmd, argz, {
      cwd,
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    })

    const fullCommand = `${cmd}${argz.length > 0 ? ` ${argz.join(' ')}` : ''}`
    let stdout = ''
    let stderr = ''

    // The `error` event fires if the command fails to even start.
    command.on('error', (err) => {
      logger.error(`Error running "${fullCommand}" for textile at path "${cwd}": %O`, err)
      reject(`Textile could not run "${fullCommand}" at path "${cwd}".`)
    })

    command.stdout.on('data', (data) => { stdout += data })
    command.stderr.on('data', (data) => { stderr += data })
    command.on('close', (code) => {
      if (code === 0) {
        resolve(stdout.trim())
      } else {
        if (stderr) {
          logger.error(`Error running "${fullCommand}" for textile at path "${cwd}": ${stderr}`)
        }
        reject(`Textile could not run "${fullCommand}" at path "${cwd}".`)
      }
    })
  })
}

export const writeTextile = async (_event: IpcMainInvokeEvent, ...args: any[]): Promise<boolean> => {
  const id = args[0] as string
  const textile = args[1] as string
  const file = join(app.getPath('documents'), 'Textile', `${id}.json`)

  try {
    const result = await writeFile(file, textile, { mode: 0o644 })
    return result === undefined // Yep, an `undefined` result means success.
  } catch (err) {
    logger.error(`Error writing textile to "${file}": %O`, err)
  }

  return false
}
