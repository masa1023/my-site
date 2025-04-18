import { nodes as defaultNodes } from '@markdoc/markdoc'

export const nodes = {
  document: {
    ...defaultNodes.document,
  },
  paragraph: {
    ...defaultNodes.paragraph,
    render: 'p',
  },
  heading: {
    ...defaultNodes.heading,
    render: 'h{% $level %}',
  },
  list: {
    ...defaultNodes.list,
    render: '{% if $ordered %}ol{% else %}ul{% endif %}',
  },
  item: {
    ...defaultNodes.item,
    render: 'li',
  },
  code: {
    ...defaultNodes.code,
    render: 'code',
  },
  fence: {
    ...defaultNodes.fence,
    render: 'pre',
  },
}
