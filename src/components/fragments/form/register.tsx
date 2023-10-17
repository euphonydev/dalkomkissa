'use client'

import { signUpWithEmailAndPassword } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase/clients/client-component-client'

export function RegisterForm() {
  const { toast } = useToast()
  const t = useTranslations()
  const router = useRouter()

  const formSchema = z
    .object({
      password: z
        .string({ required_error: t('is_required', { field: t('password') }) })
        .min(8, t('is_too_short', { field: t('password'), length: 8 })),
      confirm_password: z.string({
        required_error: t('is_required', { field: t('confirm_password') }),
      }),
      email: z
        .string({ required_error: t('is_required', { field: t('email') }) })
        .email(t('is_invalid', { field: t('email').toLowerCase() })),
    })
    .refine((data: any) => data.password === data.confirm_password, {
      message: t('password_not_match'),
      path: ['confirm_password'],
    })

  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  async function onSubmit(formData: formValues) {
    const success = await signUpWithEmailAndPassword(
      supabase,
      formData.email,
      formData.password,
    )
    if (success) {
      router.push('/login')
      toast({
        description: <p>{t('register_success')}</p>,
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">{t('email')}</FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  type="email"
                  id="email"
                  placeholder={t('email_placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">{t('password')}</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-password"
                  type="password"
                  id="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirm_password">
                {t('confirm_password')}
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  type="password"
                  id="confirm_password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
        >
          {t('register')}
        </Button>
      </form>
    </Form>
  )
}

RegisterForm.displayName = 'RegisterForm'

export default RegisterForm
