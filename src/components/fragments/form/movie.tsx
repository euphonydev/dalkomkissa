'use client'

import ImageMultiLangModal from '../modal/image-multilang'
import { FormCheckbox } from '@/components/elements/form-checkbox'
import { FormDataList } from '@/components/elements/form-data-list'
import { FormInput } from '@/components/elements/form-input'
import { FormInputDate } from '@/components/elements/form-input-date'
import { FormRadioButton } from '@/components/elements/form-radio-button'
import { FormSelect } from '@/components/elements/form-select'
import { FormTextarea } from '@/components/elements/form-textarea'
import { insertMovie } from '@/services/movie'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PencilIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'

export function MovieForm() {
  const { toast } = useToast()
  const t = useTranslations()
  const supabase = createClientComponentClient()
  const [ageRating, setAgeRating] = React.useState<AgeRating[] | null>(null)
  const [genre, setGenre] = React.useState<Genre[] | null>(null)
  const [selectedCover, setSelectedCover] = React.useState<File | null>(null)
  const openModalRef = React.useRef<HTMLButtonElement | null>(null)

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

  React.useEffect(() => {
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
              <FormInput
                type="text"
                id="title"
                label={t('title')}
                autoComplete="off"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="english_title"
            render={({ field }) => (
              <FormInput
                type="text"
                id="english_title"
                label={`${t('title')} (${t('Lang.en')})`}
                autoComplete="off"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormTextarea
                id="description"
                label={`${t('description')} (${t('Lang.en')})`}
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="release_date"
            render={({ field }) => (
              <FormInputDate
                id="release_date"
                label={t('release_date')}
                value={field.value}
                onChange={field.onChange}
                disabledDate={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
              />
            )}
          />
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="movie_type"
              render={({ field }) => (
                <FormSelect
                  id="movie_type"
                  label={t('movie_type')}
                  placeholder={t('select_field', {
                    field: t('movie_type').toLowerCase(),
                  })}
                  data={movie_type}
                  onChange={field.onChange}
                />
              )}
            />
            <FormField
              control={form.control}
              name="movie_status"
              render={({ field }) => (
                <FormSelect
                  id="movie_status"
                  label={t('status')}
                  placeholder={t('select_field', {
                    field: t('status').toLowerCase(),
                  })}
                  data={publication_status}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormDataList
                  id="country"
                  label={t('country')}
                  data={countries}
                  value={field.value}
                  transKey="Country"
                  placeholder={t('select_field', {
                    field: t('country').toLowerCase(),
                  })}
                  searchText={t('search_field', {
                    field: t('country').toLowerCase(),
                  })}
                  notFoundText={t('field_not_found', { field: t('country') })}
                  onChange={field.onChange}
                />
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormDataList
                  id="language"
                  label={t('language')}
                  data={languages}
                  value={field.value}
                  transKey="Lang"
                  placeholder={t('select_field', {
                    field: t('language').toLowerCase(),
                  })}
                  searchText={t('search_field', {
                    field: t('language').toLowerCase(),
                  })}
                  notFoundText={t('field_not_found', { field: t('language') })}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="age_rating"
            render={({ field }) => (
              <FormRadioButton
                id="age_rating"
                label={t('age_rating')}
                currentValue={field.value}
                data={ageRating}
                onChange={field.onChange}
              />
            )}
          />
          <FormField
            control={form.control}
            name="genres"
            render={() => (
              <FormCheckbox
                id="genres"
                label={t('genre')}
                data={genre}
                transKey="Genre"
              />
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
