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

export const ChangePasswordForm = () => {
    const { toast } = useToast()
    const t = useTranslations();
    const supabase = createClientComponentClient()
    const router = useRouter()

    const formSchema = z.object({
        password: z
            .string({ required_error: t('IS_REQUIRED', { field: t('PASSWORD') }) })
            .min(8, t('IS_TOO_SHORT', { field: t('PASSWORD'), length: 8 })),
    })

    type formValues = z.infer<typeof formSchema>

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    })

    async function onSubmit(formData: formValues) {
        const { error } = await supabase.auth.updateUser({
            password: formData.password
        })
        if (!error) {
            toast({
                description: (
                    <p>{t('ACTION_SUCCESS', { action: t('CHANGE_FIELD', { field: t('PASSWORD') }).toLowerCase() })}</p>
                )
            })
            router.push('/')
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full space-y-4">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('NEW_PASSWORD')}</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-full'>{t('CHANGE_FIELD', { field: t('PASSWORD').toLowerCase() })}</Button>
            </form>
        </Form >
    )
}

ChangePasswordForm.displayName = 'ChangePasswordForm'

export default ChangePasswordForm