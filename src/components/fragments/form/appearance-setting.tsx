'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next-intl/client'
import { useTheme } from 'next-themes'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
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
import { languages } from '@/lib/languages'
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
      required_error: t('IS_REQUIRED', { field: t('THEME') }),
    }),
    language: z.string({
      required_error: t('IS_REQUIRED', { field: t('LANGUAGE') }),
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
      description: t('THEME_CHANGED_INFO', {
        theme: t(theme.toUpperCase()).toLowerCase(),
      }),
    })
  }

  function onLanguageChanged(language: string) {
    form.setValue('language', language)
    startTransition(() => {
      router.replace(pathname, { locale: language })
      toast({
        description: t('LANGUAGE_CHANGED_INFO', {
          language: t(`lang.${language}`),
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
                {t('CHANGE_FIELD', { field: t('THEME').toLowerCase() })}
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
                    <FormLabel className="font-normal">{t('LIGHT')}</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dark" />
                    </FormControl>
                    <FormLabel className="font-normal">{t('DARK')}</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="system" />
                    </FormControl>
                    <FormLabel className="font-normal">{t('SYSTEM')}</FormLabel>
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
                {t('CHANGE_FIELD', { field: t('LANGUAGE').toLowerCase() })}
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
                        ? t(
                            `lang.${languages.find(
                              (language) => language.value === field.value,
                            )?.value}`,
                          )
                        : t('SELECT_FIELD', {
                            field: t('LANGUAGE').toLowerCase(),
                          })}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder={t('SEARCH_FIELD', {
                        field: t('LANGUAGE').toLowerCase(),
                      })}
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          value={t(`lang.${language.value}`)}
                          key={language.value}
                          onSelect={() => {
                            onLanguageChanged(language.value)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              'mr-2 h-4 w-4',
                              language.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {t(`lang.${language.value}`)}
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
