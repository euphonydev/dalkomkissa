'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
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

export function ResetPasswordForm() {
  const { toast } = useToast()
  const t = useTranslations()
  const supabase = createClientComponentClient()
  const router = useRouter()

  const formSchema = z.object({
    email: z
      .string({ required_error: t('IS_REQUIRED', { field: t('EMAIL') }) })
      .email(t('IS_INVALID', { field: t('EMAIL').toLowerCase() })),
  })

  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  async function onSubmit(formData: formValues) {
    const { error } = await supabase.auth.resetPasswordForEmail(
      formData.email,
      {
        redirectTo: `${location.origin}/auth/callback?next=/reset-password`,
      },
    )
    if (!error) {
      toast({
        description: t('EMAIL_SENDED'),
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">{t('EMAIL')}</FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  type="email"
                  id="email"
                  placeholder={t('EMAIL_PLACEHOLDER')}
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
          {t('RESET_PASSWORD_TITLE')}
        </Button>
      </form>
    </Form>
  )
}

ResetPasswordForm.displayName = 'ResetPasswordForm'

export default ResetPasswordForm
