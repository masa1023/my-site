import React from 'react'
import Markdoc, { Config } from '@markdoc/markdoc'
import { nodes } from './nodes'
import { tags } from './tags'
import { Callout } from '@/components/ui/callout'
import { CodeBlock } from '@/components/ui/code-block'
import { MermaidDiagram } from '@/components/ui/mermaid-diagram'
import { codeToHtml } from 'shiki'
import type { BundledLanguage } from 'shiki'

export async function Fence({
  content,
  language,
}: {
  content: string
  language: string
}) {
  if (language === 'mermaid') {
    return <MermaidDiagram content={content} />
  }

  const html = await codeToHtml(content, {
    lang: language as BundledLanguage,
    theme: 'tokyo-night',
  })
  return <CodeBlock content={content} html={html} />
}

export function parseMarkdown(content: string) {
  const ast = Markdoc.parse(content)
  const config: Config = {
    nodes,
    tags,
  }

  const transformed = Markdoc.transform(ast, config)
  return Markdoc.renderers.react(transformed, React, {
    components: {
      Callout,
      Fence,
      MermaidDiagram,
    },
  })
}
