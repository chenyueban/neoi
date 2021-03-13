import chokidar from 'chokidar'
import { log } from './logger'
import { generateRouter } from './generateRouter'

export function watchConfig() {
  const watcher = chokidar.watch('./neoi.config.ts')
  watcher.on('change', () => {
    log(`config file changed, restarting server...`)
    generateRouter(true)
  })
}
