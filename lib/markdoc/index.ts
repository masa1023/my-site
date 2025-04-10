import Markdoc, { Config, Tag } from '@markdoc/markdoc'
import { nodes } from './nodes'
import { tags } from './tags'

export function parseMarkdown(content: string) {
  const ast = Markdoc.parse(content)
  const config: Config = {
    nodes,
    tags,
  }

  const transformed = Markdoc.transform(ast, config)
  return Markdoc.renderers.html(transformed)
}
