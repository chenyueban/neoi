import chokidar from 'chokidar'
import { log } from './logger'
import { generateRouter } from './generateRouter'

export function watchPages() {
  const watcher = chokidar.watch('./src/pages')
  watcher
    .on('add', () => {
      log(`pages changed, restarting server...`)
      generateRouter(true)
    })
    .on('unlink', () => {
      log(`pages changed, restarting server...`)
      generateRouter(true)
    })
    .on('addDir', () => {
      log(`pages changed, restarting server...`)
      generateRouter(true)
    })
    .on('unlinkDir', () => {
      log(`pages changed, restarting server...`)
      generateRouter(true)
    })
}
