---
title: 配置
order: 2
toc: 'menu'
---

## 默认配置

Neoi 在 `neoi.config.ts` 中配置项目。默认配置如下：

```typescript
import { resolve } from 'path'
import { defineConfig } from '@neoi/core'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@@': resolve(__dirname, 'src/.neoi'),
    },
  },

  store: true,
})
```
