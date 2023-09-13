'use client'

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useTranslations, useFormatter } from 'next-intl';
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { CalendarIcon } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useDebounce } from 'use-debounce';

export const RegisterForm = () => {
    const { toast } = useToast()
    const t = useTranslations()
    const supabase = createClientComponentClient()
    const router = useRouter()
    const format = useFormatter();

    const formSchema = z.object({
        username: z
            .string({ required_error: t('IS_REQUIRED', { field: t('USERNAME') }) })
            .min(3, t('IS_TOO_SHORT', { field: t('USERNAME'), length: 3 }))
            .max(30, t('IS_TOO_LONG', { field: t('USERNAME'), length: 30 }))
            .regex(/^[a-zA-Z0-9_]+$/, t('USERNAME_NOT_VALID')),
        password: z
            .string({ required_error: t('IS_REQUIRED', { field: t('PASSWORD') }) })
            .min(8, t('IS_TOO_SHORT', { field: t('PASSWORD'), length: 8 })),
        email: z
            .string({ required_error: t('IS_REQUIRED', { field: t('EMAIL') }) })
            .email(t('IS_INVALID', { field: t('EMAIL').toLowerCase() })),
        dob: z
            .date({ required_error: t('IS_REQUIRED', { field: t('DATE_OF_BIRTH') }) }),
    })

    type formValues = z.infer<typeof formSchema>

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    })

    const [usernameError, setUsernameError] = useState<string>('');
    const [debouncedUsername] = useDebounce(form.watch('username'), 1000);

    useEffect(() => {
        const validateUsername = async (username: string) => {
            if (username) {
                const { data: existingUser, error: existingUserError } = await supabase
                    .from('account')
                    .select('id')
                    .eq('username', username)
                    .single();

                if (existingUser) {
                    setUsernameError(t('USERNAME_ALREADY_EXISTS'));
                } else {
                    setUsernameError('');
                }
            }
        };

        validateUsername(debouncedUsername);
    }, [debouncedUsername, supabase, t]);

    async function onSubmit(formData: formValues) {
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        if (!error) {
            if (data.user) {
                const accountInsert = await supabase.from('account').insert({
                    id: data.user.id,
                    email: formData.email,
                    username: formData.username,
                })

                const entryInsert = await supabase.from('entry').insert({
                    id: data.user.id,
                    type_id: 1,
                })

                const profileInsert = await supabase.from('profile').insert({
                    id: data.user.id,
                    name: formData.username,
                    birthdate: formData.dob,
                    gender: '?',
                    account_id: data.user.id,
                })

                if (!accountInsert.error && !entryInsert.error && !profileInsert.error) {
                    toast({
                        description: (
                            <p>{t('REGISTER_SUCCESS')}</p>
                        ),
                    })
                    router.push('/login')
                }
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('USERNAME')}</FormLabel>
                            <FormControl onChange={(e) => {
                                if (e.target instanceof HTMLInputElement) {
                                    field.onChange(e.target.value.toLowerCase());
                                }
                            }}>
                                <Input placeholder={t('USERNAME_PLACEHOLDER')} {...field} />
                            </FormControl>
                            <FormMessage>{usernameError}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('EMAIL')}</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder={t('EMAIL_PLACEHOLDER')} {...field} />
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
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>{t('DATE_OF_BIRTH')}</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value ? (
                                            format.dateTime(field.value, { dateStyle: "long" })
                                        ) : (
                                            <span>{t('PICK_DATE')}</span>
                                        )}
                                        <CalendarIcon className="w-4 h-4 ml-auto text-gray-500" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        captionLayout="dropdown-buttons"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
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
                <Button type="submit" className='w-full'>{t('REGISTER')}</Button>
            </form>
        </Form >
    )
}

RegisterForm.displayName = 'RegisterForm'

export default RegisterForm