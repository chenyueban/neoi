import { Container } from 'func'

import * as commands from './commands'
import * as options from './options'

const modules = Object.assign({}, commands, options)
const params = (Object.keys(modules) as (keyof typeof modules)[]).map(
  (key) => modules[key]
)
new Container(params)
