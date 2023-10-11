'use client'

import ImageMultiLangModal from '../modal/image-multilang'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { CalendarIcon, PencilIcon } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { CircleFlag } from 'react-circle-flags'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { AgeRating } from '@/types/age-rating.types'
import { movie_type } from '@/types/enums/movie-type'
import { publication_status } from '@/types/enums/publication-status'
import { Genre } from '@/types/genre.types'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
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
    title: z.string(),
    english_title: z.string(),
    description: z.string(),
    movie_type: z.string(),
    movie_status: z.string(),
    age_rating: z.number(),
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
    toast({
      description: <p>{JSON.stringify(formData)}</p>,
    })
    console.log(formData)
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
                    <CircleFlag
                      className="absolute right-2 top-2 h-8 w-8"
                      countryCode={
                        field.value.language === 'en'
                          ? 'gb'
                          : field.value.language
                      }
                    />
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
                    className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7"
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
                          {age_rating.name}
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
