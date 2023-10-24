import { useTranslations } from 'next-intl'
import React from 'react'
import { FormControl, FormItem, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormInputHeader } from '@/components/elements/form-input-header'
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
      <FormInputHeader
        label={label}
        id={id}
        helpText={helpText}
        showLockIcon={showLockIcon}
        isLocked={isLocked}
        onLockClick={onLockClick}
      />
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
