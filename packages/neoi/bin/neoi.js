#!/usr/bin/env node

const { join } = require('path')

const { generateTemp, generateMain, generateRouter } = require('../dist/node')

function start() {
  const srcPath = join(process.cwd(), 'src')

  generateTemp(srcPath)
  generateMain(srcPath)
  generateRouter(srcPath)

  require('vite/dist/node/cli')
}

start()
