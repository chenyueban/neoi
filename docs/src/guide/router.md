---
title: 路由
order: 3
toc: 'menu'
---

## 配置路由

在 `neoi.config.ts` 中通过 `routes` 进行配置，格式为路由信息的数组。

比如：

```typescript
import { defineConfig } from '@neoi/core'

// https://vitejs.dev/config/
export default defineConfig({
  // ...others

  routes: [
    {
      path: '/',
      component: '@/pages/index',
      exact: true,
    },
    {
      path: '/my',
      component: '@/pages/my',
    },
  ],
})
```

### path

- Type: `string`

### component

- Type: `string`

配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 `src/pages` 开始找起。

如果指向 src 目录的文件，可以用 `@`，也可以用 `../`。比如 `component: '@/layouts/basic'`，或者 `component: '../layouts/basic'`，推荐用前者。

### exact

- Type: `boolean`

表示是否严格匹配，即 location 是否和 path 完全对应上。

### routes

- Type: `string`

配置子路由，通常在需要为多个路径增加 layout 组件时使用。

比如：

```typescript
{
  routes: [
    { path: '/login', component: 'login' },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/list', component: 'list' },
        { path: '/admin', component: 'admin' },
      ],
    },
  ],
}
```

然后在 `src/layouts/index` 中通过 `props.children` 渲染子路由，

```tsx | pure
export default (props) => {
  return <div style={{ padding: 20 }}>{props.children}</div>
}
```

这样，访问 `/list` 和 `/admin` 就会带上 `src/layouts/index` 这个 layout 组件。

### redirect

- Type: `string`

配置路由跳转。

比如：

```typescript
export default {
  routes: [
    { exact: true, path: '/', redirect: '/list' },
    { exact: true, path: '/list', component: 'list' },
  ],
}
```

访问 `/` 会跳转到 `/list`，并由 `src/pages/list` 文件进行渲染。
