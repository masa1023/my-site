'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const CodeBlock = ({ content, html }: { content: string; html: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const onClickCopy = () => {
    navigator.clipboard.writeText(content)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
  }

  return (
    <div className="code-block relative">
      <Button
        className="absolute top-2 right-2 w-8 h-8 cursor-pointer"
        variant="ghost"
        size="icon"
        onClick={onClickCopy}
      >
        {isCopied ? <Check size={16} /> : <Copy size={16} />}
      </Button>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export { CodeBlock }
