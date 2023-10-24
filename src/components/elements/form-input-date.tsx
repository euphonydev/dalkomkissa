import { CalendarIcon } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import React from 'react'
import { Matcher, SelectSingleEventHandler } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormItem, FormMessage } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FormInputHeader } from '@/components/elements/form-input-header'
import { cn } from '@/lib/utils'

interface Props {
  label: string
  value: Date
  id?: string
  disabledDate?: Matcher
  className?: string
  helpText?: string
  showLockIcon?: boolean
  isLocked?: boolean
  onChange?: SelectSingleEventHandler
  onLockClick?: () => void
}

const FormInputDate = ({
  label,
  value,
  id,
  className,
  disabledDate,
  helpText,
  showLockIcon,
  isLocked,
  onChange,
  onLockClick,
}: Props) => {
  const format = useFormatter()
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant="outline"
              className={cn(
                'text-left font-normal',
                !value && 'text-muted-foreground',
              )}
            >
              {value ? (
                format.dateTime(value, { dateStyle: 'long' })
              ) : (
                <span>{t('pick_date')}</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="start"
          >
            <Calendar
              mode="single"
              captionLayout="dropdown-buttons"
              selected={value}
              onSelect={onChange}
              disabled={disabledDate}
              fromYear={1960}
              toYear={new Date().getFullYear()}
            />
          </PopoverContent>
        </Popover>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

FormInputDate.displayName = 'FormInputDate'

export { FormInputDate }
