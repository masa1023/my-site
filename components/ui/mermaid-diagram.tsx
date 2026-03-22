'use client'

import { useEffect, useId, useState } from 'react'
import { useTheme } from 'next-themes'

const MermaidDiagram = ({ content }: { content: string }) => {
  const [svg, setSvg] = useState<string>('')
  const id = useId().replace(/:/g, '_')
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const render = async () => {
      const mermaid = (await import('mermaid')).default
      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === 'dark' ? 'dark' : 'default',
      })
      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, content)
        setSvg(svg)
      } catch {
        setSvg('')
      }
    }
    render()
  }, [content, id, resolvedTheme])

  if (!svg) {
    return <pre><code>{content}</code></pre>
  }

  return <div dangerouslySetInnerHTML={{ __html: svg }} />
}

export { MermaidDiagram }
