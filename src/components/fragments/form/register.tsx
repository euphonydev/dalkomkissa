'use client'

import React from 'react';
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const RegisterForm = () => {
    const { toast } = useToast()
    const t = useTranslations()
    const supabase = createClientComponentClient()
    const router = useRouter()

    const formSchema = z.object({
        password: z
            .string({ required_error: t('IS_REQUIRED', { field: t('PASSWORD') }) })
            .min(8, t('IS_TOO_SHORT', { field: t('PASSWORD'), length: 8 })),
        confirm_password: z
            .string({ required_error: t('IS_REQUIRED', { field: t('CONFIRM_PASSWORD') }) }),
        email: z
            .string({ required_error: t('IS_REQUIRED', { field: t('EMAIL') }) })
            .email(t('IS_INVALID', { field: t('EMAIL').toLowerCase() })),
    }).refine((data: any) => data.password === data.confirm_password, {
        message: t('PASSWORD_NOT_MATCH'),
        path: ["confirm_password"]
    })

    type formValues = z.infer<typeof formSchema>

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    })

    async function onSubmit(formData: formValues) {
        const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        if (!error) {
            toast({
                description: (
                    <p>{t('REGISTER_SUCCESS')}</p>
                ),
            })
            router.push('/login')
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
                            <FormLabel htmlFor='email'>{t('EMAIL')}</FormLabel>
                            <FormControl>
                                <Input autoComplete="email" type="email" id="email" placeholder={t('EMAIL_PLACEHOLDER')} {...field} />
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
                            <FormLabel htmlFor='password'>{t('PASSWORD')}</FormLabel>
                            <FormControl>
                                <Input autoComplete="new-password" type="password" id="password" placeholder="********" {...field} />
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
                            <FormLabel htmlFor='confirm_password'>{t('CONFIRM_PASSWORD')}</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" type="password" id="confirm_password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-full'>{t('REGISTER')}</Button>
            </form>
        </Form >
    )
}

RegisterForm.displayName = 'RegisterForm'

export default RegisterForm