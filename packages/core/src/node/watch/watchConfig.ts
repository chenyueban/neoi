import chokidar from 'chokidar'
import { log } from '../logger'
import { generateRouter } from '../generate'

export function watchConfig() {
  const watcher = chokidar.watch('./neoi.config.ts', { ignoreInitial: true })
  watcher.on('change', () => {
    log(`config file changed, restarting server...`)
    generateRouter(true)
  })
}
