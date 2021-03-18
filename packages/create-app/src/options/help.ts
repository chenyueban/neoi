import { Option, RegisterProvider } from 'func'

import pkg from '../../package.json'
import { log } from '../utils'

@Option({
  name: 'help',
  alias: 'h',
  description: 'help',
})
export class Help {
  constructor(regs: RegisterProvider) {
    log(pkg.name.toUpperCase())
    log('')

    regs.commands.forEach((data) => {
      log(`  ${data.name} <command>${this.showDesc(data.description)}`)
    })

    log('')

    regs.options.forEach((data) => {
      const alias = data.alias ? ` -${data.alias}` : ''
      log(`  --${data.name}${alias} <option>${this.showDesc(data.description)}`)
    })

    log('')
  }

  private showDesc(desc?: string): string {
    return desc ? ` --  ${desc}` : ''
  }
}
