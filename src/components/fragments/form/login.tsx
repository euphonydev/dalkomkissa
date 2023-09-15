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
import { useRouter } from 'next/navigation'
import Link from "next/link"

export const LoginForm = () => {
    const { toast } = useToast()
    const t = useTranslations();
    const supabase = createClientComponentClient()
    const router = useRouter()

    const formSchema = z.object({
        password: z
            .string({ required_error: t('IS_REQUIRED', { field: t('PASSWORD') }) }),
        identity: z
            .string({ required_error: t('IS_REQUIRED', { field: t('EMAIL') }) }),
    })

    type formValues = z.infer<typeof formSchema>

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    })

    async function login(email: string, password: string) {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
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

    async function onSubmit(formData: formValues) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(formData.identity)) {
            login(formData.identity, formData.password);
        } else {
            const { data } = await supabase
                .from('account')
                .select('email')
                .eq('username', formData.identity)
                .single();
            if (data) {
                login(data.email, formData.password);
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="identity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor='identity'>{t('THIS_OR_THAT', { this: t('EMAIL'), that: t('USERNAME').toLowerCase() })}</FormLabel>
                            <FormControl>
                                <Input autoComplete='email' type='text' id='identity' placeholder={t('EMAIL_PLACEHOLDER')} {...field} />
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
                                <Input autoComplete="current-password" type="password" id="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end'>
                    <Link href="/reset-password">
                        <Button variant="link" size='xs'>
                            {t('FORGOT_PASSWORD')}
                        </Button>
                    </Link>
                </div>
                <Button type="submit" className='w-full'>{t('LOGIN')}</Button>
            </form>
        </Form >
    )
}

LoginForm.displayName = 'LoginForm'

export default LoginForm