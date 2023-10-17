'use client'

import {
  signInWithEmailAndPassword,
  signInWithUsernameAndPassword,
} from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useUserContext } from '@/contexts/user-context'
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

export function LoginForm() {
  const { toast } = useToast()
  const t = useTranslations()
  const router = useRouter()
  const { getUserInfo } = useUserContext()

  const formSchema = z.object({
    password: z.string({
      required_error: t('is_required', { field: t('password') }),
    }),
    identity: z.string({
      required_error: t('is_required', { field: t('email') }),
    }),
  })

  type formValues = z.infer<typeof formSchema>

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  async function onSubmit(formData: formValues) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const success = regex.test(formData.identity)
      ? await signInWithEmailAndPassword(
          supabase,
          formData.identity,
          formData.password,
        )
      : await signInWithUsernameAndPassword(
          supabase,
          formData.identity,
          formData.password,
        )

    if (success) {
      getUserInfo()
      router.push('/')
      toast({
        description: (
          <p>{t('action_success', { action: t('login').toLowerCase() })}</p>
        ),
      })
    } else {
      router.refresh()
      toast({
        description: <p>{t('login_failed')}</p>,
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
          name="identity"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="identity">
                {t('this_or_that', {
                  this: t('email'),
                  that: t('username').toLowerCase(),
                })}
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  type="text"
                  id="identity"
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
                  autoComplete="current-password"
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
        <div className="flex justify-end">
          <Link href="/reset-password">
            <Button
              variant="link"
              size="xs"
            >
              {t('forgot_password')}
            </Button>
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full"
        >
          {t('login')}
        </Button>
      </form>
    </Form>
  )
}

LoginForm.displayName = 'LoginForm'

export default LoginForm
