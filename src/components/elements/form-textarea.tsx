import { FormTooltip } from './form-tooltip'
import { FormLockIcon } from '@/components/elements/form-lock-icon'
import React from 'react'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
  helpText?: string
  showLockIcon?: boolean
  isLocked?: boolean
  onLockClick?: () => void
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      label,
      helpText,
      id,
      className,
      showLockIcon,
      isLocked,
      onLockClick,
      ...props
    },
    ref,
  ) => {
    return (
      <FormItem
        className={cn(
          'flex w-full flex-col',
          showLockIcon ? 'space-y-1' : 'space-y-3',
          className,
        )}
      >
        <div className="flex w-full items-baseline justify-between">
          <FormLabel htmlFor={id}>
            <div className="flex items-center">
              {label}
              {helpText ? <FormTooltip content={helpText} /> : null}
            </div>
          </FormLabel>
          {showLockIcon ? (
            <FormLockIcon
              isLocked={isLocked}
              onLockClick={onLockClick}
            />
          ) : null}
        </div>
        <FormControl>
          <Textarea
            ref={ref}
            id={id}
            {...props}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )
  },
)

FormTextarea.displayName = 'FormTextarea'

export { FormTextarea }
