import { statSync, mkdirSync } from 'fs'
import { join } from 'path'

export function generateTemp(srcPath: string) {
  const tempPath = join(srcPath, '.neoi')
  try {
    const stats = statSync(tempPath)
    if (!stats.isDirectory()) {
      mkdirSync(tempPath)
    }
  } catch (_) {
    mkdirSync(tempPath)
  }
}
