const path = require('path')
const fs = require('fs')
const minimist = require('minimist')
const { prompt } = require('enquirer')
// import {} from 'chalk'
const { log, emptyDir, copy } = require('./utils')

const argv = minimist(process.argv.slice(2))
const cwd = process.cwd()

async function getTargetDir() {
  if (argv._[0]) {
    return argv._[0]
  }
  /**
   * @type { name: string }
   */
  const { name } = await prompt({
    type: 'input',
    name: 'name',
    message: 'Project name:',
    initial: 'neoi-project',
  })
  return name
}

async function init() {
  const targetDir = await getTargetDir()

  const root = path.join(cwd, targetDir)
  log(`\n  Scaffolding project in ${root}...`)

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  } else {
    const existing = fs.readdirSync(root)
    if (existing.length) {
      /**
       * @type { yes: boolean }
       */
      const { yes } = await prompt({
        type: 'confirm',
        name: 'yes',
        initial: 'Y',
        message:
          `Target directory ${targetDir} is not empty.\n` +
          `Remove existing files and continue?`,
      })
      if (yes) {
        emptyDir(root)
      } else {
        return
      }
    }
  }

  const templateDir = path.join(__dirname, 'template')
  const write = (file, content) => {
    const targetPath = path.join(root, file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }
  // copy files to target directory
  const files = fs.readdirSync(templateDir)
  files
    .filter((v) => v !== 'package.json')
    .forEach((file) => {
      write(file)
    })
  const pkg = require(path.join(templateDir, `package.json`))
  pkg.name = path.basename(root)
  write('package.json', JSON.stringify(pkg, null, 2))

  const pkgManager = /yarn/.test(process.env.npm_execpath) ? 'yarn' : 'npm'
  log(`\n  Done. Now run:\n`)
  if (root !== cwd) {
    log(`  cd ${path.relative(cwd, root)}`)
  }
  log(`  ${pkgManager === 'yarn' ? `yarn` : `npm install`}`)
  log(`  ${pkgManager === 'yarn' ? `yarn dev` : `npm run dev`}`)
  log()
}

module.exports = init
