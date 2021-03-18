import { Command } from 'func'

import { log } from '../utils'

@Command({
  name: 'hello',
})
export class Hello {
  constructor() {
    log('hello command trigger!')
  }
}
