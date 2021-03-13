#!/usr/bin/env node

const {
  generateTemp,
  generateMain,
  generateRouter,
  watchConfig,
  watchPages,
} = require('../dist/node')

function start() {
  generateTemp()
  generateMain()
  generateRouter()

  watchConfig()
  watchPages()

  require('vite/dist/node/cli')
}

start()
