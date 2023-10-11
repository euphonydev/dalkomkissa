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

export function ChangePasswordForm() {
  const { toast } = useToast()
  const t = useTranslations()
  const supabase = createClientComponentClient()
  const router = useRouter()

  const formSchema = z.object({
    password: z
      .string({ required_error: t('ise_required', { field: t('password') }) })
      .min(8, t('is_too_short', { field: t('password'), length: 8 })),
  })

  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  async function onSubmit(formData: formValues) {
    const { error } = await supabase.auth.updateUser({
      password: formData.password,
    })
    if (!error) {
      toast({
        description: (
          <p>
            {t('action_success', {
              action: t('change_field', { field: t('password') }).toLowerCase(),
            })}
          </p>
        ),
      })
      router.push('/')
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('new_password')}</FormLabel>
              <FormControl>
                <Input
                  type="password"
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
          {t('change_field', { field: t('password').toLowerCase() })}
        </Button>
      </form>
    </Form>
  )
}

ChangePasswordForm.displayName = 'ChangePasswordForm'

export default ChangePasswordForm
