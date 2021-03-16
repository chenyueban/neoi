// @ts-nocheck
import React from 'react'
import { dynamic } from 'dumi'

export default {
  'Foo-demo': {
    component: () =>
      React.createElement(
        dynamic({
          loader: async function () {
            const { default: demos } = await import(
              /* webpackChunkName: "demos_ooF" */ './Foo'
            )

            return demos['Foo-demo'].component
          },
          loading: () => null,
        })
      ),
    previewerProps: {
      sources: {
        _: {
          tsx:
            "import React from 'react'\nimport { Foo } from 'docs'\n\nexport default () => <Foo title=\"First Demo\" />",
        },
      },
      dependencies: {
        react: { version: '17.0.1' },
        docs: { version: '0.0.0' },
      },
      componentName: 'Foo',
      identifier: 'Foo-demo',
    },
  },
}
