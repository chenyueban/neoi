import { statSync, mkdirSync } from 'fs'
import { join } from 'path'

export function generateTemp() {
  const tempPath = join(process.cwd(), 'src', '.neoi')
  try {
    const stats = statSync(tempPath)
    if (!stats.isDirectory()) {
      mkdirSync(tempPath)
    }
  } catch (_) {
    mkdirSync(tempPath)
  }
}
