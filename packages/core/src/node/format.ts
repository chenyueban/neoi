import prettier from 'prettier'

export function format(string: string) {
  return prettier.format(string, {
    singleQuote: true,
    semi: false,
    endOfLine: 'lf',
  })
}
