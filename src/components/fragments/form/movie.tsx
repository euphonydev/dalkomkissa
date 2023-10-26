'use client'

import ImageMultiLangModal from '../modal/image-multilang'
import { insertMovie } from '@/services/movie'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PencilIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { age_rating } from '@/types/enums/age-rating'
import { countries } from '@/types/enums/countries'
import { languages } from '@/types/enums/languages'
import { movie_type } from '@/types/enums/movie-type'
import { publication_status } from '@/types/enums/publication-status'
import { Genre } from '@/types/genre.types'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { FormCheckbox } from '@/components/elements/form-checkbox'
import { FormDataList } from '@/components/elements/form-data-list'
import { FormInput } from '@/components/elements/form-input'
import { FormInputDate } from '@/components/elements/form-input-date'
import { FormInputHeader } from '@/components/elements/form-input-header'
import { FormRadioButton } from '@/components/elements/form-radio-button'
import { FormSelect } from '@/components/elements/form-select'
import { FormTextarea } from '@/components/elements/form-textarea'

export function MovieForm() {
  const { toast } = useToast()
  const t = useTranslations()
  const supabase = createClientComponentClient()
  const [genre, setGenre] = React.useState<Genre[] | null>(null)
  const [selectedCover, setSelectedCover] = React.useState<File | null>(null)
  const openModalRef = React.useRef<HTMLButtonElement | null>(null)

  const formSchema = z.object({
    original_title: z.object({
      value: z.string({
        required_error: t('is_required', { field: t('title') }),
      }),
      locked: z.boolean(),
    }),
    english_title: z.object({
      value: z.string({
        required_error: t('is_required', {
          field: `${t('title')} (${t('Lang.en')})`,
        }),
      }),
      locked: z.boolean(),
    }),
    english_description: z.object({
      value: z.string({
        required_error: t('is_required', { field: t('description') }),
      }),
      locked: z.boolean(),
    }),
    format: z.object({
      value: z.enum(movie_type, {
        required_error: t('is_required', { field: t('movie_type') }),
      }),
      locked: z.boolean(),
    }),
    status: z.object({
      value: z.enum(publication_status, {
        required_error: t('is_required', { field: t('status') }),
      }),
      locked: z.boolean(),
    }),
    original_language: z.object({
      value: z.string({
        required_error: t('is_required', { field: t('language') }),
      }),
      locked: z.boolean(),
    }),
    original_country: z.object({
      value: z.enum(countries, {
        required_error: t('is_required', { field: t('country') }),
      }),
      locked: z.boolean(),
    }),
    age_rating: z.object({
      value: z.enum(age_rating, {
        required_error: t('is_required', { field: t('age_rating') }),
      }),
      locked: z.boolean(),
    }),
    default_cover: z.object({
      value: z.object({
        language: z.string({
          required_error: t('is_required', { field: t('language') }),
        }),
        name: z.string({
          required_error: t('is_required', { field: t('cover') }),
        }),
        url: z.string({
          required_error: t('is_required', { field: t('cover') }),
        }),
        dimension: z.string({
          required_error: t('is_required', { field: t('cover') }),
        }),
        size: z.number({
          required_error: t('is_required', { field: t('cover') }),
        }),
      }),
      locked: z.boolean(),
    }),
    genres: z.array(z.number()).refine((value) => value.some((item) => item), {
      message: t('must_select_field', { field: t('genre').toLowerCase() }),
    }),
    original_airdate: z.object({
      value: z.date({
        required_error: t('is_required', { field: t('release_date') }),
      }),
      locked: z.boolean(),
    }),
  })

  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      original_title: { locked: false },
      english_title: { locked: false },
      english_description: { locked: false },
      format: { locked: false },
      status: { locked: false },
      original_language: { locked: false },
      original_country: { locked: false },
      age_rating: { locked: false },
      default_cover: { locked: false },
      original_airdate: { locked: false },
    },
    mode: 'onChange',
  })

  React.useEffect(() => {
    const getGenre = async () => {
      const { data } = await supabase.from('genres').select('*')
      if (data) {
        setGenre(data)
      }
    }
    getGenre()
  }, [supabase])

  const handleNewCover = (value: any, file: File) => {
    form.setValue('default_cover.value', value)
    setSelectedCover(file)
  }

  async function onSubmit(formData: formValues) {
    const success = await insertMovie(
      supabase,
      {
        ...formData,
        original_airdate: {
          value: formData.original_airdate.value.toISOString(),
          locked: formData.original_airdate.locked,
        },
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
            {JSON.stringify(formData)}
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
            name="default_cover.value"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormInputHeader
                  label={t('cover')}
                  isLocked={form.watch('default_cover.locked')}
                  onLockClick={() =>
                    form.setValue(
                      'default_cover.locked',
                      !form.watch('default_cover.locked'),
                    )
                  }
                  showLockIcon
                />
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
            name="original_title.value"
            render={({ field }) => (
              <FormInput
                type="text"
                id="title"
                label={t('title')}
                autoComplete="off"
                isLocked={form.watch('original_title.locked')}
                onLockClick={() =>
                  form.setValue(
                    'original_title.locked',
                    !form.watch('original_title.locked'),
                  )
                }
                showLockIcon
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="english_title.value"
            render={({ field }) => (
              <FormInput
                type="text"
                id="english_title"
                label={`${t('title')} (${t('Lang.en')})`}
                autoComplete="off"
                isLocked={form.watch('english_title.locked')}
                onLockClick={() =>
                  form.setValue(
                    'english_title.locked',
                    !form.watch('english_title.locked'),
                  )
                }
                showLockIcon
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="english_description.value"
            render={({ field }) => (
              <FormTextarea
                id="description"
                label={`${t('description')} (${t('Lang.en')})`}
                isLocked={form.watch('english_description.locked')}
                onLockClick={() =>
                  form.setValue(
                    'english_description.locked',
                    !form.watch('english_description.locked'),
                  )
                }
                showLockIcon
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="original_airdate.value"
            render={({ field }) => (
              <FormInputDate
                id="original_airdate"
                label={t('release_date')}
                value={field.value}
                onChange={field.onChange}
                disabledDate={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                isLocked={form.watch('original_airdate.locked')}
                onLockClick={() =>
                  form.setValue(
                    'original_airdate.locked',
                    !form.watch('original_airdate.locked'),
                  )
                }
                showLockIcon
              />
            )}
          />
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="format.value"
              render={({ field }) => (
                <FormSelect
                  id="format"
                  label={t('movie_type')}
                  placeholder={t('select_field', {
                    field: t('movie_type').toLowerCase(),
                  })}
                  data={movie_type}
                  onChange={field.onChange}
                  isLocked={form.watch('format.locked')}
                  onLockClick={() =>
                    form.setValue('format.locked', !form.watch('format.locked'))
                  }
                  showLockIcon
                />
              )}
            />
            <FormField
              control={form.control}
              name="status.value"
              render={({ field }) => (
                <FormSelect
                  id="status"
                  label={t('status')}
                  placeholder={t('select_field', {
                    field: t('status').toLowerCase(),
                  })}
                  data={publication_status}
                  onChange={field.onChange}
                  isLocked={form.watch('status.locked')}
                  onLockClick={() =>
                    form.setValue('status.locked', !form.watch('status.locked'))
                  }
                  showLockIcon
                />
              )}
            />
          </div>
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="original_country.value"
              render={({ field }) => (
                <FormDataList
                  id="original_country"
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
                  isLocked={form.watch('original_country.locked')}
                  onLockClick={() =>
                    form.setValue(
                      'original_country.locked',
                      !form.watch('original_country.locked'),
                    )
                  }
                  showLockIcon
                />
              )}
            />
            <FormField
              control={form.control}
              name="original_language.value"
              render={({ field }) => (
                <FormDataList
                  id="original_language"
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
                  isLocked={form.watch('original_language.locked')}
                  onLockClick={() =>
                    form.setValue(
                      'original_language.locked',
                      !form.watch('original_language.locked'),
                    )
                  }
                  showLockIcon
                />
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="age_rating.value"
            render={({ field }) => (
              <FormRadioButton
                id="age_rating"
                label={t('age_rating')}
                currentValue={field.value}
                data={age_rating}
                onChange={field.onChange}
                isLocked={form.watch('age_rating.locked')}
                onLockClick={() =>
                  form.setValue(
                    'age_rating.locked',
                    !form.watch('age_rating.locked'),
                  )
                }
                showLockIcon
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
