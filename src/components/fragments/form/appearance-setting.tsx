'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next-intl/client'
import { useTheme } from 'next-themes'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { interface_languages } from '@/types/enums/languages'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

export function AppearanceSettingForm() {
  const { theme, setTheme } = useTheme()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const FormSchema = z.object({
    theme: z.string({
      required_error: t('is_required', { field: t('theme') }),
    }),
    language: z.string({
      required_error: t('is_required', { field: t('language') }),
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      theme: theme,
      language: locale,
    },
  })

  function onThemeChanged(theme: string) {
    form.setValue('theme', theme)
    setTheme(theme)
    toast({
      description: t('theme_changed_info', {
        theme: t(theme).toLowerCase(),
      }),
    })
  }

  function onLanguageChanged(language: string) {
    form.setValue('language', language)
    startTransition(() => {
      router.replace(pathname, { locale: language })
      toast({
        description: t('language_changed_info', {
          language: t(`Lang.${language}`),
        }),
      })
      router.refresh()
    })
  }

  return (
    <Form {...form}>
      <div className="space-y-8">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                {t('change_field', { field: t('theme').toLowerCase() })}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={onThemeChanged}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="light" />
                    </FormControl>
                    <FormLabel className="font-normal">{t('light')}</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dark" />
                    </FormControl>
                    <FormLabel className="font-normal">{t('dark')}</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="system" />
                    </FormControl>
                    <FormLabel className="font-normal">{t('system')}</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                {t('change_field', {
                  field: t('language').toLowerCase(),
                })}
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? t(`Lang.${field.value}`)
                        : t('SELECT_FIELD', {
                            field: t('language').toLowerCase(),
                          })}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder={t('search_field', {
                        field: t('language').toLowerCase(),
                      })}
                    />
                    <CommandEmpty>
                      {t('field_not_found', { field: t('language') })}
                    </CommandEmpty>
                    <CommandGroup>
                      {interface_languages.map((language) => (
                        <CommandItem
                          value={t(`Lang.${language}`)}
                          key={language}
                          onSelect={() => {
                            onLanguageChanged(language)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              'mr-2 h-4 w-4',
                              language === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {t(`Lang.${language}`)}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}

AppearanceSettingForm.displayName = 'AppearanceSettingForm'

export default AppearanceSettingForm
