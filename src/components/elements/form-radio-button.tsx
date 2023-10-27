import { useTranslations } from 'next-intl'
import React from 'react'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormInputHeader } from '@/components/elements/form-input-header'
import { cn } from '@/lib/utils'
import { Enum } from '@/lib/utils/type'

interface Props {
  label: string
  id: string
  data: Enum<string>
  currentValue: string
  className?: string
  helpText?: string
  showLockIcon?: boolean
  isLocked?: boolean
  withKeyTranslation?: boolean
  onLockClick?: () => void
  onChange?: (value: string) => void
}

const FormRadioButton = ({
  label,
  helpText,
  id,
  data,
  currentValue,
  className,
  withKeyTranslation = false,
  showLockIcon,
  isLocked,
  onLockClick,
  onChange,
}: Props) => {
  const t = useTranslations()
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
        <RadioGroup
          id={id}
          onValueChange={(value) => {
            onChange && onChange(value)
          }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6"
        >
          {data.map((data) => (
            <FormItem
              className="flex items-center space-x-3 space-y-0"
              key={data}
            >
              <FormControl>
                <RadioGroupItem
                  value={`${data}`}
                  disabled={isLocked}
                  checked={currentValue === data}
                />
              </FormControl>
              <FormLabel className="font-normal">
                {withKeyTranslation
                  ? t(data.toUpperCase())
                  : data.toUpperCase()}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

FormRadioButton.displayName = 'FormRadioButton'

export { FormRadioButton }
