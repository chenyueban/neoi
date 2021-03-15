import chokidar from 'chokidar'
import { log } from './logger'
import { generateRouter } from './generate'

function watchConfig() {
  const watcher = chokidar.watch('./neoi.config.ts', { ignoreInitial: true })
  watcher.on('change', () => {
    log(`config file changed, restarting server...`)
    generateRouter({ refresh: true })
  })
}

function watchPagesAction() {
  log(`pages changed, restarting server...`)
  generateRouter({ refresh: true })
}
function watchPages() {
  const watcher = chokidar.watch('./src/pages', { ignoreInitial: true })
  watcher
    .on('add', watchPagesAction)
    .on('unlink', watchPagesAction)
    .on('addDir', watchPagesAction)
    .on('unlinkDir', watchPagesAction)
}

export function watch() {
  watchConfig()
  watchPages()
}
