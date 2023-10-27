import React from 'react'
import { FormControl, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { FormInputHeader } from '@/components/elements/form-input-header'
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
        <FormInputHeader
          label={label}
          id={id}
          helpText={helpText}
          showLockIcon={showLockIcon}
          isLocked={isLocked}
          onLockClick={onLockClick}
        />
        <FormControl>
          <Textarea
            ref={ref}
            id={id}
            disabled={isLocked}
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
