import { Info, LightbulbIcon, TriangleAlert } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from './alert'

const Callout = ({
  title,
  type,
  children,
}: {
  title: string
  type: 'note' | 'warning' | 'error'
  children: string
}) => {
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

export { Callout }
