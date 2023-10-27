import React from 'react'
import { FormControl, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormInputHeader } from '@/components/elements/form-input-header'
import { cn } from '@/lib/utils'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  helpText?: string
  showLockIcon?: boolean
  isLocked?: boolean
  onLockClick?: () => void
}

const FormInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      helpText,
      id,
      type,
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
          <Input
            type={type}
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

FormInput.displayName = 'FormInput'

export { FormInput }
