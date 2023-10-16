'use client'

import ImageMultiLangModal from '../modal/image-multilang'
import { insertMovie } from '@/services/movie'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  CalendarIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  PencilIcon,
} from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { CircleFlag } from 'react-circle-flags'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { AgeRating } from '@/types/age-rating.types'
import { countries } from '@/types/enums/countries'
import { languages } from '@/types/enums/languages'
import { movie_type } from '@/types/enums/movie-type'
import { publication_status } from '@/types/enums/publication-status'
import { Genre } from '@/types/genre.types'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

export function MovieForm() {
  const { toast } = useToast()
  const format = useFormatter()
  const t = useTranslations()
  const supabase = createClientComponentClient()
  const [ageRating, setAgeRating] = useState<AgeRating[]>()
  const [genre, setGenre] = useState<Genre[]>()
  const [selectedCover, setSelectedCover] = React.useState<File | null>(null)
  const openModalRef = useRef<HTMLButtonElement | null>(null)

  const formSchema = z.object({
    title: z.string({
      required_error: t('is_required', { field: t('title') }),
    }),
    english_title: z.string({
      required_error: t('is_required', {
        field: `${t('title')} (${t('Lang.en')})`,
      }),
    }),
    description: z.string({
      required_error: t('is_required', { field: t('description') }),
    }),
    movie_type: z.enum(movie_type, {
      required_error: t('is_required', { field: t('movie_type') }),
    }),
    movie_status: z.enum(publication_status, {
      required_error: t('is_required', { field: t('status') }),
    }),
    language: z.string({
      required_error: t('is_required', { field: t('language') }),
    }),
    country: z.string({
      required_error: t('is_required', { field: t('country') }),
    }),
    age_rating: z.number({
      required_error: t('is_required', { field: t('age_rating') }),
    }),
    cover: z.object({
      language: z.string({
        required_error: t('is_required', { field: t('language') }),
      }),
      name: z.string({
        required_error: t('is_required', { field: t('cover') }),
      }),
      url: z.string({
        required_error: t('is_required', { field: t('cover') }),
      }),
      size: z.string({
        required_error: t('is_required', { field: t('cover') }),
      }),
    }),
    genres: z.array(z.number()).refine((value) => value.some((item) => item), {
      message: t('must_select_field', { field: t('genre').toLowerCase() }),
    }),
    release_date: z.date({
      required_error: t('is_required', { field: t('release_date') }),
    }),
  })

  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    const getAgeRating = async () => {
      const { data } = await supabase.from('age_rating').select('*')
      if (data) {
        setAgeRating(data)
      }
    }
    const getGenre = async () => {
      const { data } = await supabase.from('genre').select('*')
      if (data) {
        setGenre(data)
      }
    }
    getGenre()
    getAgeRating()
  }, [supabase])

  const handleNewCover = (value: any, file: File) => {
    form.setValue('cover', value)
    setSelectedCover(file)
  }

  async function onSubmit(formData: formValues) {
    const success = await insertMovie(
      supabase,
      {
        ...formData,
        release_date: formData.release_date.toISOString(),
      },
      selectedCover!,
    )
    if (success) {
      toast({
        description: (
          <p>
            {t('action_success', {
              action: t('add_new_entry', { entry: t('movie') }).toLowerCase(),
            })}
          </p>
        ),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full space-y-8">
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor="cover">{t('cover')}</FormLabel>
                {field.value ? (
                  <div className="relative w-full rounded-md sm:w-48 md:w-56">
                    <AspectRatio ratio={7 / 10}>
                      <Image
                        src={field.value.url}
                        alt={field.value.name}
                        width={182}
                        height={160}
                        className="h-full w-full rounded-md object-cover"
                      />
                    </AspectRatio>
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      className="absolute bottom-2 left-2"
                      onClick={() => {
                        if (openModalRef.current) {
                          openModalRef.current.click()
                        }
                      }}
                    >
                      <div className="flex items-center">
                        <PencilIcon className="mr-1 h-4 w-4" />
                        {t('change_field', { field: '' })}
                      </div>
                    </Button>
                  </div>
                ) : null}
                <ImageMultiLangModal
                  className={field.value ? 'hidden' : ''}
                  label={t('add_new_entry', {
                    entry: t('cover').toLowerCase(),
                  })}
                  onModalSubmit={handleNewCover}
                  openModalRef={openModalRef}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">{t('original_title')}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    type="text"
                    id="title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="english_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="english_title">{`${t('title')} (${t(
                  'Lang.en',
                )})`}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    type="text"
                    id="english_title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">{`${t('description')} (${t(
                  'Lang.en',
                )})`}</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="release_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('release_date')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format.dateTime(field.value, { dateStyle: 'long' })
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
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      fromYear={1960}
                      toYear={new Date().getFullYear()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="movie_type"
              render={() => (
                <div className="flex w-full">
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>{t('movie_type')}</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        form.setValue('movie_type', value)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t('select_field', {
                              field: t('movie_type').toLowerCase(),
                            })}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {movie_type.map((movie_type) => (
                          <SelectItem
                            value={`${movie_type}`}
                            key={movie_type}
                          >
                            {t(movie_type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="movie_status"
              render={({ field }) => (
                <div className="flex w-full">
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>{t('status')}</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t('select_field', {
                              field: t('status').toLowerCase(),
                            })}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {publication_status.map((publication_status) => (
                          <SelectItem
                            value={publication_status}
                            key={publication_status}
                          >
                            {t(publication_status)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </div>
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <div className="flex w-full">
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>{t('country_origin')}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              <div className="flex items-center">
                                <CircleFlag
                                  countryCode={field.value}
                                  className="mr-2 h-4 w-4"
                                />
                                <span className="truncate">
                                  {t(`Country.${field.value}`)}
                                </span>
                              </div>
                            ) : (
                              t('select_field', {
                                field: t('country').toLowerCase(),
                              })
                            )}
                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder={t('search_field', {
                              field: t('country').toLowerCase(),
                            })}
                          />
                          <ScrollArea className="h-64 w-full">
                            <CommandEmpty>
                              {t('field_not_found', { field: t('language') })}
                            </CommandEmpty>
                            <CommandGroup>
                              {countries.map((country) => (
                                <CommandItem
                                  value={t(`Country.${country}`)}
                                  key={country}
                                  onSelect={() => {
                                    form.setValue('country', country)
                                  }}
                                >
                                  <div className="flex w-full items-center">
                                    <CheckIcon
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        country === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    <CircleFlag
                                      countryCode={country}
                                      className="mr-2 h-4 w-4"
                                    />
                                    <span className="w-full truncate">
                                      {t(`Country.${country}`)}
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
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <div className="flex w-full">
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>{t('language_spoken')}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? t(`Lang.${field.value}`)
                              : t('select_field', {
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
                          <ScrollArea className="h-64 w-full">
                            <CommandEmpty>
                              {t('field_not_found', { field: t('language') })}
                            </CommandEmpty>
                            <CommandGroup>
                              {languages.map((language) => (
                                <CommandItem
                                  value={t(`Lang.${language}`)}
                                  key={language}
                                  onSelect={() => {
                                    form.setValue('language', language)
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
                          </ScrollArea>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="age_rating"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t('age_rating')}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      form.setValue('age_rating', parseInt(value))
                    }}
                    className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6"
                  >
                    {ageRating?.map((age_rating) => (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={age_rating.id}
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={`${age_rating.id}`}
                            checked={form.watch('age_rating') === age_rating.id}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {age_rating.name.toUpperCase()}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genres"
            render={() => (
              <FormItem>
                <FormLabel>{t('genre')}</FormLabel>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                  {genre?.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
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
                                    ? field.onChange([
                                        ...(field.value || []),
                                        item.id,
                                      ])
                                    : field.onChange(
                                        (field.value || []).filter(
                                          (value) => value !== item.id,
                                        ),
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {t(`Genre.${item.name}`)}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {t('save_form', { form: t('movie').toLowerCase() })}
          </Button>
        </div>
      </form>
    </Form>
  )
}

MovieForm.displayName = 'MovieForm'

export default MovieForm
