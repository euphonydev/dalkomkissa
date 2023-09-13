'use client'

import React from 'react'
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';
import { GoogleIcon } from '@/components/icons'

export const LoginForm = () => {
    const { toast } = useToast()
    const t = useTranslations();
    const supabase = createClientComponentClient()
    const router = useRouter()

    const formSchema = z.object({
        password: z
            .string({ required_error: t('IS_REQUIRED', { field: t('PASSWORD') }) }),
        email: z
            .string({ required_error: t('IS_REQUIRED', { field: t('EMAIL') }) })
            .email(t('IS_INVALID', { field: t('EMAIL').toLowerCase() })),
    })

    type formValues = z.infer<typeof formSchema>

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    })

    async function onSubmit(formData: formValues) {
        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        })
        if (!error) {
            toast({
                description: (
                    <p>{t('ACTION_SUCCESS', { action: t('LOGIN').toLowerCase() })}</p>
                )
            })
            router.push('/')
        }
    }

    async function onGoogleLogin() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                    redirectTo: `${location.origin}/auth/callback`
                },
            },
        })
        if (data) {
            toast({
                description: (
                    <p>{t('ACTION_SUCCESS', { action: t('LOGIN').toLowerCase() })}</p>
                )
            })
            console.log(data)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('EMAIL')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('EMAIL_PLACEHOLDER')} {...field} />
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
                            <FormLabel>{t('PASSWORD')}</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-full'>{t('LOGIN')}</Button>
                <Button type="button" variant="outline" className="w-full mt-4"><GoogleIcon className='w-5 h-5 me-2' onClick={onGoogleLogin} />{t('CONTINUE_WITH', { with: 'Google' })}</Button>
            </form>
        </Form >
    )
}

LoginForm.displayName = 'LoginForm'

export default LoginForm