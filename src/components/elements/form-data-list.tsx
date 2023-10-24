import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { CircleFlag } from 'react-circle-flags'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { FormControl, FormItem, FormMessage } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FormInputHeader } from '@/components/elements/form-input-header'
import { cn } from '@/lib/utils'
import { Enum } from '@/lib/utils/type'

interface Props {
  label: string
  value: string
  data: Enum<string> | Array<string>
  transKey?: string
  placeholder?: string
  searchText?: string
  notFoundText?: string
  id?: string
  className?: string
  helpText?: string
  showLockIcon?: boolean
  isLocked?: boolean
  onChange?: (value: string) => void
  onLockClick?: () => void
}

const FormDataList = ({
  label,
  value,
  data,
  placeholder,
  searchText,
  notFoundText,
  transKey,
  id,
  className,
  helpText,
  showLockIcon,
  isLocked,
  onChange,
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
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                'w-full justify-between',
                !value && 'text-muted-foreground',
              )}
            >
              {value ? (
                <div className="flex items-center">
                  {transKey === 'Country' ? (
                    <CircleFlag
                      countryCode={value}
                      className="mr-2 h-4 w-4"
                    />
                  ) : null}
                  <span className="truncate">
                    {transKey ? t(`${transKey}.${value}`) : t(value)}
                  </span>
                </div>
              ) : (
                placeholder
              )}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={searchText} />
            <ScrollArea className="h-64 w-full">
              <CommandEmpty>{notFoundText}</CommandEmpty>
              <CommandGroup>
                {data.map((data) => (
                  <CommandItem
                    value={transKey ? t(`${transKey}.${data}`) : t(data)}
                    key={data}
                    onSelect={() => {
                      onChange && onChange(data)
                    }}
                  >
                    <div className="flex w-full items-center">
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          data === value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {transKey === 'Country' ? (
                        <CircleFlag
                          countryCode={data}
                          className="mr-2 h-4 w-4"
                        />
                      ) : null}
                      <span className="w-full truncate">
                        {transKey ? t(`${transKey}.${data}`) : t(data)}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}

FormDataList.displayName = 'FormDataList'

export { FormDataList }
