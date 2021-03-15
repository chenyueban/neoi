#!/usr/bin/env node

const { generate, watch } = require('../dist/node')

function start() {
  generate()
  watch()

  require('vite/dist/node/cli')
}

start()
