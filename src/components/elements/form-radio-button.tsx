import { FormLockIcon } from '@/components/elements/form-lock-icon'
import { FormTooltip } from '@/components/elements/form-tooltip'
import { useTranslations } from 'next-intl'
import React from 'react'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

interface RadioItem {
  id: number
  name: string
}

interface Props {
  label: string
  id: string
  data: Array<RadioItem> | null
  currentValue: number
  className?: string
  helpText?: string
  showLockIcon?: boolean
  isLocked?: boolean
  onLockClick?: () => void
  onChange?: (value: number) => void
}

const FormRadioButton = ({
  label,
  helpText,
  id,
  data,
  currentValue,
  className,
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
        <RadioGroup
          id={id}
          onValueChange={(value) => {
            onChange && onChange(parseInt(value))
          }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6"
        >
          {data?.map((data) => (
            <FormItem
              className="flex items-center space-x-3 space-y-0"
              key={data.id}
            >
              <FormControl>
                <RadioGroupItem
                  value={`${data.id}`}
                  checked={currentValue === data.id}
                />
              </FormControl>
              <FormLabel className="font-normal">
                {t(data.name.toUpperCase())}
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
