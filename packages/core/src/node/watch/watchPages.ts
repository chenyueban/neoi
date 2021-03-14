import chokidar from 'chokidar'
import { log } from '../logger'
import { generateRouter } from '../generate'

function action() {
  log(`pages changed, restarting server...`)
  generateRouter(true)
}

export function watchPages() {
  const watcher = chokidar.watch('./src/pages', { ignoreInitial: true })
  watcher
    .on('add', action)
    .on('unlink', action)
    .on('addDir', action)
    .on('unlinkDir', action)
}
