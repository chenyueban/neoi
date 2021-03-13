import { join, isAbsolute } from 'path'
import { writeFileSync, unlinkSync } from 'fs'
import type { IConfig } from '../types'

async function bundleConfigFile(
  fileName: string,
  mjs = false
): Promise<string> {
  const rollup = require('rollup')
  const bundle = await rollup.rollup({
    external: (id: string) =>
      (id[0] !== '.' && !isAbsolute(id)) || id.slice(-5, id.length) === '.json',
    input: fileName,
    treeshake: false,
  })

  const {
    output: [{ code }],
  } = await bundle.generate({
    exports: mjs ? 'auto' : 'named',
    format: mjs ? 'es' : 'cjs',
  })

  return code
}

export async function parseConfig(): Promise<IConfig | null> {
  try {
    const configPath = join(process.cwd(), 'neoi.config.ts')
    const code = await bundleConfigFile(configPath)
    const jsPath = configPath + '.js'
    writeFileSync(jsPath, code)
    const userConfig = require(jsPath).default
    unlinkSync(jsPath)
    return userConfig
  } catch (e) {
    console.error(e)
    return null
  }
}
