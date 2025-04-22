import React, { useState } from 'react'
import Markdoc, { Config } from '@markdoc/markdoc'
import { nodes } from './nodes'
import { tags } from './tags'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { CodeBlock } from '@/components/ui/code-block'
import { LightbulbIcon, TriangleAlert, Info, Copy, Check } from 'lucide-react'
import { codeToHtml } from 'shiki'
import type { BundledLanguage } from 'shiki'

function Callout({
  title,
  type,
  children,
}: {
  title: string
  type: 'note' | 'warning' | 'error'
  children: string
}) {
  return (
    <Alert
      className="not-prose"
      variant={type === 'error' ? 'destructive' : 'default'}
    >
      {type === 'note' && <LightbulbIcon className="h-4 w-4" />}
      {type === 'warning' && <TriangleAlert className="h-4 w-4" />}
      {type === 'error' && <Info className="h-4 w-4" />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}

export async function Fence({
  content,
  language,
}: {
  content: string
  language: BundledLanguage
}) {
  const html = await codeToHtml(content, {
    lang: language,
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
    },
  })
}
