import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from './label'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from './button'
import { FieldHelperMessage } from '../field-helper-message'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: React.ReactNode
  helperText?: string
}
//flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, type, label, icon, helperText, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="flex flex-col flex-1 w-full p-2 text-gray-300 focus-within:text-orange-base">
        {!!label && (
          <Label htmlFor={id} className="font-text text-[.75rem] uppercase">
            {label}
          </Label>
        )}
        <div className="flex flex-1 items-center border-b border-gray-100 text-sm ring-offset-background focus-within:border-gray-400">
          {!!icon && icon}
          <input
            id={id}
            type={type === 'password' && showPassword ? 'text' : type}
            className={cn(
              'w-full h-11 py-2 pl-2 pr-2 text-gray-400 bg-transparent outline-none caret-orange-base',
              className
            )}
            ref={ref}
            {...props}
          />
          {type === 'password' && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="px-3 py-2 hover:bg-transparent"
              onMouseDown={e => {
                e.preventDefault()
                setShowPassword(true)
              }}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? 'Hide password' : 'Show password'}
              </span>
            </Button>
          )}
        </div>
        {!!helperText && (
          <div className="mt-1">
            <FieldHelperMessage message={helperText} />
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
