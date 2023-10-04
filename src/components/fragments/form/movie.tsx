'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  CalendarIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  PencilIcon,
} from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import * as z from 'zod'
import { AgeRating } from '@/types/age-rating'
import { Format } from '@/types/format'
import { useUser } from '@/hooks/useUser'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { publication_status } from '@/lib/enums/publication_status'
import { cn } from '@/lib/utils'
import '@/lib/utils/string/get-initial-name'
import '@/lib/utils/string/substring-after-last'

export function MovieForm() {
  const { toast } = useToast()
  const t = useTranslations()
  const supabase = createClientComponentClient()
  const router = useRouter()
  const format = useFormatter()
  const { user, avatar } = useUser()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [movieType, setMovieType] = useState<Format[]>()
  const [ageRating, setAgeRating] = useState<AgeRating[]>()

  const formSchema = z.object({
    title: z.string(),
    english_title: z.string(),
    description: z.string(),
    movie_type: z.number(),
    movie_status: z.string(),
    age_rating: z.number(),
  })

  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    const getMovieType = async () => {
      const { data } = await supabase
        .from('format')
        .select('*')
        .eq('type', 'movie_type')
      if (data) {
        setMovieType(data)
      }
    }
    const getAgeRating = async () => {
      const { data } = await supabase.from('age_rating').select('*')
      if (data) {
        setAgeRating(data)
      }
    }
    getAgeRating()
    getMovieType()
  }, [supabase])

  async function onSubmit(formData: formValues) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">{t('ORIGINAL_TITLE')}</FormLabel>
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
                <FormLabel htmlFor="english_title">{`${t('TITLE')} (${t(
                  'lang.en',
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
                <FormLabel htmlFor="description">{`${t('DESCRIPTION')} (${t(
                  'lang.en',
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
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="movie_type"
              render={() => (
                <div className="flex w-full">
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>{t('MOVIE_TYPE')}</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        form.setValue('movie_type', parseInt(value))
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t('SELECT_FIELD', {
                              field: t('MOVIE_TYPE').toLowerCase(),
                            })}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {movieType?.map((movie_type) => (
                          <SelectItem
                            value={`${movie_type.id}`}
                            key={movie_type.id}
                          >
                            {t(movie_type.name.toUpperCase())}
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
                    <FormLabel>{t('STATUS')}</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t('SELECT_FIELD', {
                              field: t('STATUS').toLowerCase(),
                            })}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {publication_status.map((publication_status) => (
                          <SelectItem
                            value={publication_status.value}
                            key={publication_status.value}
                          >
                            {t(publication_status.value.toUpperCase())}
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
                <FormLabel>{t('AGE_RATING')}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      form.setValue('age_rating', parseInt(value))
                    }}
                    className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7"
                    {...field}
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
          <Button type="submit">
            {t('SAVE_FORM', { form: t('MOVIE').toLowerCase() })}
          </Button>
        </div>
      </form>
    </Form>
  )
}

MovieForm.displayName = 'MovieForm'

export default MovieForm
