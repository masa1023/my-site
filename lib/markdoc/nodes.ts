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
  fence: {
    render: 'Fence',
    attributes: {
      content: { type: String, required: true },
      language: { type: String, required: true },
    },
  },
}
