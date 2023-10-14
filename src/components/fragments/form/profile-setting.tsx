'use client'

import { removeImage, uploadImage } from '@/services/common'
import {
  checkUsernameAvailability,
  removeUserAvatar,
  updateUserProfile,
} from '@/services/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import * as z from 'zod'
import { useUserContext } from '@/contexts/user-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase/clients/client-component-client'
import { cn } from '@/lib/utils'
import { getNameInitial, substringAfterLast } from '@/lib/utils/string'

export function ProfileSettingForm() {
  const { toast } = useToast()
  const t = useTranslations()
  const format = useFormatter()
  const { userInfo, avatar, getUserInfo } = useUserContext()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [usernameError, setUsernameError] = useState<string>('')

  const formSchema = z.object({
    username: z
      .string({ required_error: t('is_required', { field: t('username') }) })
      .min(3, t('is_too_short', { field: t('username'), length: 3 }))
      .max(30, t('is_too_long', { field: t('username'), length: 30 }))
      .regex(/^[a-zA-Z0-9_]+$/, t('username_not_valid')),
    fullName: z.string(),
    avatar: z.string(),
    dob: z.date({
      required_error: t('is_required', { field: t('date_of_birth') }),
    }),
    gender: z.string({
      required_error: t('is_required', { field: t('gender') }),
    }),
  })

  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: '',
    },
    mode: 'onChange',
  })

  const [debouncedUsername] = useDebounce(form.watch('username'), 200)

  useEffect(() => {
    const validateUsername = async (username: string) => {
      if (username && userInfo?.username) {
        if (username !== userInfo?.username) {
          const isAvailable = await checkUsernameAvailability(
            supabase,
            username,
          )
          if (!isAvailable) {
            setUsernameError(t('username_already_exists'))
          } else {
            setUsernameError('')
          }
        }
      }
    }

    validateUsername(debouncedUsername)
  }, [debouncedUsername, userInfo?.username])

  useEffect(() => {
    if (userInfo) {
      if (userInfo.birthdate) {
        const birthDate = new Date(userInfo.birthdate)
        form.setValue('dob', birthDate)
      }
      userInfo.username && form.setValue('username', userInfo.username)
      userInfo.name && form.setValue('fullName', userInfo.name)
      userInfo.gender && form.setValue('gender', userInfo.gender)
    }
  }, [userInfo, form])

  async function onAvatarDelete() {
    if (userInfo?.photo && userInfo?.account_id) {
      const success = await removeUserAvatar(
        supabase,
        userInfo.photo,
        userInfo.account_id,
      )
      if (success) {
        getUserInfo()
        setSelectedFile(null)
      }
    }
  }

  async function onSubmit(formData: formValues) {
    const fileName = selectedFile
      ? `${userInfo?.account_id}.${substringAfterLast(selectedFile.name, '.')}`
      : userInfo?.photo
    let uploadError = false

    if (fileName && selectedFile) {
      if (userInfo?.photo) {
        await removeImage(supabase, 'avatar', userInfo.photo)
      }
      const success = await uploadImage(
        supabase,
        'avatar',
        fileName,
        selectedFile,
      )
      if (!success) {
        uploadError = true
      }
    }

    const success = await updateUserProfile(
      supabase,
      userInfo?.account_id!,
      formData.username,
      formData.fullName,
      formData.gender,
      formData.dob.toString(),
      fileName ? fileName : '',
    )

    if (success && !uploadError) {
      getUserInfo()
      toast({
        description: (
          <p>
            {t('action_success', {
              action: t('change_field', { field: t('profile') }).toLowerCase(),
            })}
          </p>
        ),
      })
    }
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file.type.startsWith('image/')) {
        setSelectedFile(file)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col-reverse space-y-8 space-y-reverse md:flex-row md:space-x-8">
          <div className="w-full space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">{t('username')}</FormLabel>
                  <FormControl
                    onChange={(e) => {
                      if (e.target instanceof HTMLInputElement) {
                        field.onChange(e.target.value.toLowerCase())
                      }
                    }}
                  >
                    <Input
                      type="text"
                      autoComplete="off"
                      id="username"
                      placeholder={t('username_placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{usernameError}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="fullName">{t('full_name')}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      type="text"
                      id="fullName"
                      placeholder={t('full_name_placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    {t('change_field', { field: t('gender').toLowerCase() })}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex flex-col space-y-1 md:flex-row md:space-x-4 md:space-y-0"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="m"
                            checked={form.watch('gender') === 'm'}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t('male')}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="f"
                            checked={form.watch('gender') === 'f'}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t('female')}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="?"
                            checked={form.watch('gender') === '?'}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t('secret')}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('date_of_birth')}</FormLabel>
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
            <Button type="submit">
              {t('save_form', { form: t('profile').toLowerCase() })}
            </Button>
          </div>
          <div className="w-full md:w-2/5">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('avatar')}</FormLabel>
                  <FormControl onChange={handleAvatarChange}>
                    <Input
                      type="file"
                      {...field}
                      id="avatar-input"
                      className="hidden"
                      accept="image/*"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative w-full">
              <Avatar className="h-48 w-48 md:mx-auto md:h-56 md:w-56">
                <AvatarImage
                  id="avatar"
                  className="bg-secondary"
                  src={
                    selectedFile ? URL.createObjectURL(selectedFile) : avatar
                  }
                  alt={`@${userInfo?.username}`}
                />
                <AvatarFallback>
                  {userInfo?.name ? getNameInitial(userInfo.name) : ''}
                </AvatarFallback>
              </Avatar>
              {userInfo?.photo ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      className="absolute right-4 top-4 text-destructive md:right-4 md:top-6 md:px-2 lg:right-6"
                    >
                      <div className="flex items-center">
                        <TrashIcon className="mr-1 h-4 w-4 md:mr-0" />
                        <span className="md:hidden">{t('delete')}</span>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {t('delete_confirmation', {
                          context: t('avatar').toLowerCase(),
                        })}
                      </DialogTitle>
                      <DialogDescription>
                        {t('delete_permanently_desc', {
                          context: t('avatar').toLowerCase(),
                        })}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={onAvatarDelete}
                      >
                        {t('delete')}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : null}
              <Button
                type="button"
                variant="outline"
                size="xs"
                className="absolute bottom-4 md:bottom-6"
                onClick={() => document.getElementById('avatar-input')?.click()}
              >
                <div className="flex items-center">
                  <PencilIcon className="mr-1 h-4 w-4" />
                  {t('change_field', { field: '' })}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

ProfileSettingForm.displayName = 'ProfileSettingForm'

export default ProfileSettingForm
