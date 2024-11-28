import { Info } from 'lucide-react'

export interface FieldHelperMessageProps {
  message: string
}

export function FieldHelperMessage({ message }: FieldHelperMessageProps) {
  return (
    <div className="flex gap-1 items-center text-red-600">
      <Info width={16} height={16} />
      <span className="font-text text-body-xs">{message}</span>
    </div>
  )
}
