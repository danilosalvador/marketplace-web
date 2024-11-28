import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from './label'

export interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: string
  helperText?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, label, helperText, ...props }, ref) => {
    return (
      <div className="flex flex-col flex-1 w-full p-2 text-gray-300 focus-within:text-orange-base">
        {!!label && (
          <Label htmlFor={id} className="font-text text-[.75rem] uppercase">
            {label}
          </Label>
        )}
        <div className="flex flex-1 items-center border-b border-gray-100 text-sm ring-offset-background focus-within:border-gray-400">
          <textarea
            className={cn(
              'w-full h-11 py-2 pl-2 pr-2 text-gray-400 bg-transparent outline-none caret-orange-base',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
