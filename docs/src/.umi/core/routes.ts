// @ts-nocheck
import React from 'react'
import { ApplyPluginsType } from '/Users/chenyueban/Documents/works/neoi/node_modules/.pnpm/@umijs/runtime@3.4.2_react@16.14.0/node_modules/@umijs/runtime'
import * as umiExports from './umiExports'
import { plugin } from './plugin'

export function getRoutes() {
  const routes = [
    {
      path: '/~demos/:uuid',
      layout: false,
      wrappers: [
        require('/Users/chenyueban/Documents/works/neoi/node_modules/.pnpm/@umijs/preset-dumi@1.1.7_react@17.0.1+umi@3.4.2/node_modules/@umijs/preset-dumi/lib/theme/layout')
          .default,
      ],
      component: (props) => {
        const React = require('react')
        const renderArgs = require('../../../../node_modules/.pnpm/@umijs/preset-dumi@1.1.7_react@17.0.1+umi@3.4.2/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs').default(
          props
        )

        switch (renderArgs.length) {
          case 1:
            // render demo directly
            return renderArgs[0]

          case 2:
            // render demo with previewer
            return React.createElement(
              require('dumi-theme-default/src/builtins/Previewer.tsx').default,
              renderArgs[0],
              renderArgs[1]
            )

          default:
            return `Demo ${uuid} not found :(`
        }
      },
    },
    {
      path: '/_demos/:uuid',
      redirect: '/~demos/:uuid',
    },
    {
      __dumiRoot: true,
      layout: false,
      path: '/',
      wrappers: [
        require('/Users/chenyueban/Documents/works/neoi/node_modules/.pnpm/@umijs/preset-dumi@1.1.7_react@17.0.1+umi@3.4.2/node_modules/@umijs/preset-dumi/lib/theme/layout')
          .default,
        require('/Users/chenyueban/Documents/works/neoi/node_modules/.pnpm/@umijs/preset-dumi@1.1.7_react@17.0.1+umi@3.4.2/node_modules/dumi-theme-default/src/layout.tsx')
          .default,
      ],
      routes: [
        {
          path: '/components/foo',
          component: require('/Users/chenyueban/Documents/works/neoi/docs/src/Foo/index.md')
            .default,
          exact: true,
          meta: {
            filePath: 'src/Foo/index.md',
            updatedTime: null,
            componentName: 'Foo',
            nav: {
              title: 'Components',
              path: '/components',
            },
            slugs: [
              {
                depth: 2,
                value: 'Foo',
                heading: 'foo',
              },
            ],
            title: 'Foo',
            group: {
              path: '/components/foo',
              title: 'Foo',
            },
          },
          title: 'Foo',
        },
        {
          path: '/zh-CN/components/foo',
          component: require('/Users/chenyueban/Documents/works/neoi/docs/src/Foo/index.zh-CN.md')
            .default,
          exact: true,
          meta: {
            filePath: 'src/Foo/index.zh-CN.md',
            updatedTime: null,
            componentName: 'Foo',
            nav: {
              title: '组件',
              path: '/zh-CN/components',
            },
            slugs: [
              {
                depth: 2,
                value: 'Foo',
                heading: 'foo',
              },
            ],
            title: 'Foo',
            locale: 'zh-CN',
            group: {
              path: '/zh-CN/components/foo',
              title: 'Foo',
            },
          },
          title: 'Foo',
        },
        {
          path: '/',
          component: require('/Users/chenyueban/Documents/works/neoi/docs/docs/index.md')
            .default,
          exact: true,
          meta: {
            filePath: 'docs/index.md',
            updatedTime: null,
            title: 'Neoi - A React framework based vite.',
            order: 10,
            hero: {
              title: 'neoi',
              desc:
                '<div class="markdown"><p>📖 A React framework based vite.</p></div>',
              actions: [
                {
                  text: 'Getting Started',
                  link: '/components/foo',
                },
              ],
            },
            features: [
              {
                icon:
                  'https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png',
                title: 'Out of the box',
                desc:
                  '<div class="markdown"><p>Elegant default configrations and convention routing assist developers to get started as simple as possible, that focus all attentions on developing libraries &#x26; writting docs</p></div>',
              },
              {
                icon:
                  'https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png',
                title: 'For developing libraries',
                desc:
                  '<div class="markdown"><p>Rich Markdown extensions are not limited to rendering component demos, making component documents not only easy to write and manage, but also beautiful and easy to use</p></div>',
              },
              {
                icon:
                  'https://gw.alipayobjects.com/zos/bmw-prod/b8570f4d-c1b1-45eb-a1da-abff53159967/kj9t990h_w144_h144.png',
                title: 'Theme system',
                desc:
                  '<div class="markdown"><p>Progressive custom theme capabilities, ranging from expanding your own Markdown tags to customizing complete theme packages, are up to you</p></div>',
              },
              {
                icon:
                  'https://gw.alipayobjects.com/zos/bmw-prod/b3e102cd-5dad-4046-a02a-be33241d1cc7/kj9t8oji_w144_h144.png',
                title: 'API automatically generated',
                desc:
                  '<div class="markdown"><p>Component API can be automatically generated based on TypeScript type definitions, and components will always be『the same in appearance』</p></div>',
              },
              {
                icon:
                  'https://gw.alipayobjects.com/zos/bmw-prod/3863e74a-7870-4874-b1e1-00a8cdf47684/kj9t7ww3_w144_h144.png',
                title: 'Mobile component library development',
                desc:
                  '<div class="markdown"><p>Install the theme package to quickly enable mobile component R&#x26;D capabilities, built-in mobile HD rendering solution</p></div>',
              },
              {
                icon:
                  'https://gw.alipayobjects.com/zos/bmw-prod/f093e060-726e-471c-a53e-e988ed3f560c/kj9t9sk7_w144_h144.png',
                title: 'Asset dataization capabilities',
                desc:
                  '<div class="markdown"><p>One-line command digitizes component assets, and standardized asset data can be connected with downstream productivity tools</p></div>',
              },
            ],
            footer:
              '<div class="markdown"><p>Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self</p></div>',
            slugs: [
              {
                depth: 2,
                value: 'Getting Started',
                heading: 'getting-started',
              },
              {
                depth: 2,
                value: 'Feedback',
                heading: 'feedback',
              },
            ],
          },
          title: 'Neoi - A React framework based vite.',
        },
        {
          path: '/zh-CN',
          component: require('/Users/chenyueban/Documents/works/neoi/docs/docs/index.zh-CN.md')
            .default,
          exact: true,
          meta: {
            filePath: 'docs/index.zh-CN.md',
            updatedTime: null,
            title: 'Neoi - 基于 vite 的 react 框架',
            order: 10,
            hero: {
              title: 'neoi',
              desc:
                '<div class="markdown"><p>📖 基于 vite 的 react 框架</p></div>',
              actions: [
                {
                  text: '快速上手',
                  link: '/zh-CN/components/foo',
                },
              ],
            },
            features: [
              {
                icon:
                  'https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png',
                title: '开箱即用',
                desc:
                  '<div class="markdown"><p>考究的默认配置和约定式的目录结构，帮助开发者零成本上手，让所有注意力都能放在文档编写和组件开发上</p></div>',
              },
              {
                icon:
                  'https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png',
                title: '为组件开发而生',
                desc:
                  '<div class="markdown"><p>丰富的 Markdown 扩展，不止于渲染组件 demo，使得组件的文档不仅易于编写、管理，还好看、好用</p></div>',
              },
              {
                icon:
                  'https://gw.alipayobjects.com/zos/bmw-prod/b8570f4d-c1b1-45eb-a1da-abff53159967/kj9t990h_w144_h144.png',
                title: '主题系统',
                desc:
                  '<div class="markdown"><p>渐进式的自定义主题能力，小到扩展自己的 Markdown 标签，大到自定义完整主题包，全由你定</p></div>',
              },
              {
                icon:
                  'https://gw.alipayobjects.com/zos/bmw-prod/b3e102cd-5dad-4046-a02a-be33241d1cc7/kj9t8oji_w144_h144.png',
                title: 'API 自动生成',
                desc:
                  '<div class="markdown"><p>可基于 TypeScript 类型定义自动生成组件 API，组件永远『表里如一』</p></div>',
              },
              {
                icon:
                  'https://gw.alipayobjects.com/zos/bmw-prod/3863e74a-7870-4874-b1e1-00a8cdf47684/kj9t7ww3_w144_h144.png',
                title: '移动端组件库研发',
                desc:
                  '<div class="markdown"><p>安装主题包即可快速启用移动端组件研发能力，内置移动端高清渲染方案</p></div>',
              },
              {
                icon:
                  'https://gw.alipayobjects.com/zos/bmw-prod/f093e060-726e-471c-a53e-e988ed3f560c/kj9t9sk7_w144_h144.png',
                title: '资产数据化能力',
                desc:
                  '<div class="markdown"><p>一行命令将组件资产数据化，标准化的资产数据可与下游生产力工具串联</p></div>',
              },
            ],
            footer:
              '<div class="markdown"><p>Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self</p></div>',
            slugs: [
              {
                depth: 2,
                value: '轻松上手',
                heading: '轻松上手',
              },
              {
                depth: 2,
                value: '反馈与共建',
                heading: '反馈与共建',
              },
            ],
            locale: 'zh-CN',
          },
          title: 'Neoi - 基于 vite 的 react 框架',
        },
        {
          path: '/components',
          meta: {},
          exact: true,
          redirect: '/components/foo',
        },
        {
          path: '/zh-CN/components',
          meta: {},
          exact: true,
          redirect: '/zh-CN/components/foo',
        },
      ],
      title: 'docs',
      component: (props) => props.children,
    },
  ]

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  })

  return routes
}
