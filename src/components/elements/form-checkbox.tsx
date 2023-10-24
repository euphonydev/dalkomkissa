import { useTranslations } from 'next-intl'
import React from 'react'
import { Control, FieldValues } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormInputHeader } from '@/components/elements/form-input-header'
import { cn } from '@/lib/utils'

interface RadioItem {
  id: number
  name: string
}

interface Props {
  label: string
  id: string
  data: Array<RadioItem> | null
  control?: Control<FieldValues> | undefined
  className?: string
  transKey?: string
  helpText?: string
  showLockIcon?: boolean
  isLocked?: boolean
  onLockClick?: () => void
}

const FormCheckbox = ({
  label,
  helpText,
  id,
  data,
  transKey,
  control,
  className,
  showLockIcon,
  isLocked,
  onLockClick,
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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        {data?.map((item) => (
          <FormField
            key={item.id}
            control={control}
            name="genres"
            render={({ field }) => {
              return (
                <FormItem
                  key={item.id}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked: boolean) => {
                        return checked
                          ? field.onChange([...(field.value || []), item.id])
                          : field.onChange(
                              (field.value || []).filter(
                                (value: number) => value !== item.id,
                              ),
                            )
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {transKey ? t(`${transKey}.${item.name}`) : t(item.name)}
                  </FormLabel>
                </FormItem>
              )
            }}
          />
        ))}
      </div>
      <FormMessage />
    </FormItem>
  )
}

FormCheckbox.displayName = 'FormCheckbox'

export { FormCheckbox }
