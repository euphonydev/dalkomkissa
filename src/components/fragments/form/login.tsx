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

export const LoginForm = () => {
    const { toast } = useToast()
    const t = useTranslations();

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

    function onSubmit(data: formValues) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
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
            </form>
        </Form >
    )
}

LoginForm.displayName = 'LoginForm'

export default LoginForm