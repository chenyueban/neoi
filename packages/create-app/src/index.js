#!/usr/bin/env node

const init = require('./init')

init().catch((e) => console.error(e))
