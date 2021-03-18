import { CommandMajor } from 'func'

import { log } from '../utils'

@CommandMajor()
export class Major {
  constructor() {
    log('ok')
  }
}
