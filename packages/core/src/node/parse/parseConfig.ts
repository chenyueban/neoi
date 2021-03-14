import { join, isAbsolute } from 'path'
import { writeFileSync, unlinkSync } from 'fs'
import { rollup } from 'rollup'
import type { IConfig } from '../../types'

async function bundleConfigFile(
  fileName: string,
  mjs = false
): Promise<string> {
  const bundle = await rollup({
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

export async function parseConfig(refresh?: boolean): Promise<IConfig | null> {
  try {
    if (refresh || !global.cacheConfig) {
      const configPath = join(process.cwd(), 'neoi.config.ts')
      const code = await bundleConfigFile(configPath)
      const jsPath = configPath + '.js'
      writeFileSync(jsPath, code)
      // clear cache in case of server restart
      delete require.cache[require.resolve(jsPath)]
      global.cacheConfig = require(jsPath).default
      unlinkSync(jsPath)
    }
    return global.cacheConfig
  } catch (e) {
    console.error(e)
    return null
  }
}
