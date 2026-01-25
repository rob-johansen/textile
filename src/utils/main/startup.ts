import { app } from 'electron'
import { join } from 'node:path'
import { mkdir, readdir, readFile } from 'node:fs/promises'
import { sort } from '@/utils/shared/textiles'
import { v4 as uuid } from 'uuid';

import { logger } from '@/utils/main/logger'
import type { Textile } from '@/types/Textile'

export const loadTextiles = async (): Promise<Textile[]> => {
  const documents = join(app.getPath('documents'), 'Textile')

  try {
    const files = await readdir(documents)
    const names: string[] = []
    const promises: Promise<string>[] = []
    const textiles: Textile[] = []

    for (const file of files) {
      if (file.endsWith('.json')) {
        names.push(file)
        promises.push(readFile(join(documents, file), { encoding: 'utf8' }))
      }
    }

    const results = await Promise.allSettled(promises)

    for (let i = 0; i < results.length; i++) {
      const result = results[i]

      if (result.status === 'rejected') {
        logger.error(`Error reading file "${names[i]}": ${result.reason}`)
      } else {
        const textile: Textile = JSON.parse(result.value)
        textile.id = names[i].replace('.json', '')

        for (const step of textile.steps) {
          step.error = {
            action: '',
            input: '',
            path: '',
            replacement: '',
            value: '',
          }

          step.id = uuid()

          if (step.metadata.args) {
            for (const arg of step.metadata.args) {
              arg.id = uuid()
            }
          }
        }

        textiles.push(textile)
      }
    }

    return sort(textiles)
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        await mkdir(documents)
      } catch (err) {
        logger.error('Error creating Textile directory: %O', err)
      }
    }
  }

  return []
}
