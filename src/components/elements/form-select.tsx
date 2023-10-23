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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Enum } from '@/lib/utils/type'

interface Props {
  label: string
  id: string
  data: Enum<string> | Array<string>
  className?: string
  helpText?: string
  placeholder?: string
  showLockIcon?: boolean
  isLocked?: boolean
  onLockClick?: () => void
  onChange?: () => void
}

const FormSelect = ({
  label,
  helpText,
  id,
  data,
  className,
  placeholder,
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
      <Select onValueChange={onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {data.map((data) => (
            <SelectItem
              value={`${data}`}
              key={data}
            >
              {t(data)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )
}

FormSelect.displayName = 'FormSelect'

export { FormSelect }
