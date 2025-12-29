import { app } from 'electron'
import { join } from 'node:path'
import { mkdir, readdir } from 'node:fs/promises'
import { v4 as uuid } from 'uuid';

import { logger } from '@/utils/main/logger'
import type { Textile } from '@/types/Textile'

export const loadTextiles = async (): Promise<Textile[]> => {
  const documents = join(app.getPath('documents'), 'Textile')

  try {
    const files = await readdir(documents)
    const textiles: Textile[] = []

    for (const file of files) {
      if (file.endsWith('.json')) {
        // TODO: Read and `JSON.parse()` the file so you have it's actual name and steps.
        textiles.push({ id: uuid(), name: file, steps: [] })
      }
    }

    return textiles
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        await mkdir(documents)
      } catch (err) {
        logger.error('Error creating Textile directory: %0', err)
      }
    }
  }

  return []
}
