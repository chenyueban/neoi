import type { IRoutes } from '../type'

/**
 * 抹平文件名的差异
 * index.tsx  => index
 * index.ts   => index
 * index.jsx  => index
 * index.js   => index
 * index(dir) => index
 * @param page
 */
function smooth(page: string) {
  const [name] = page.split(/.(t|j)s(x)?/)
  return name
}

/**
 * 根据 pages 目录结构解析
 * @param pages pages 目录下包含的文件
 */
export function parseRoutes(pages: string[], rootPath?: string): IRoutes {
  return pages.map((page) => {
    const name = smooth(page)
    const base = rootPath ? `${rootPath}/pages/` : `pages/`
    return {
      path: name === 'index' ? '/' : '/' + name,
      component: base + name,
      exact: name === 'index',
    }
  })
}
