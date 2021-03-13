import chalk from 'chalk'

const time = chalk.dim
const tag = chalk.cyan.bold
const content = chalk.keyword('orange')

export function log(...args: string[]) {
  // eslint-disable-next-line no-console
  return console.log(
    `${time(new Date().toLocaleTimeString())} ${tag('[neoi]')} ${content(
      ...args
    )}`
  )
}
