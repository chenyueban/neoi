import { Option } from 'func'

import pkg from '../../package.json'
import { log } from '../utils'

@Option({
  name: 'version',
  alias: 'v',
  description: 'version',
})
export class Version {
  constructor() {
    log(pkg.version)
  }
}
