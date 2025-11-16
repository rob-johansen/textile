import { app } from 'electron'
import { join } from 'node:path'
import { mkdir, readdir } from 'node:fs/promises'

import type { Textile } from '@/types/Textile'

export const loadTextiles = async (): Promise<Textile[]> => {
  const documents = join(app.getPath('documents'), 'Textiles')

  try {
    const textiles: Textile[] = []
    const files = await readdir(documents)
    for (const file of files) {
      if (file.endsWith('.json')) {
        // TODO: Read and `JSON.parse()` the file so you have it's actual name and steps.
        textiles.push({name: file, steps: []})
      }
    }
    return textiles
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        await mkdir(documents)
      } catch (err) {
        console.log('Error reading and creating Textiles directory!', err)
      }
    }
  }

  return []
}
