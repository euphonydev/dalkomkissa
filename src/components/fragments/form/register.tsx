'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"

export const RegisterForm = () => {
    const { toast } = useToast()
    const t = useTranslations();

    const formSchema = z.object({
        username: z
            .string({ required_error: t('IS_REQUIRED', { field: t('USERNAME') }) })
            .min(3, t('IS_TOO_SHORT', { field: t('USERNAME'), length: 3 }))
            .max(30, t('IS_TOO_LONG', { field: t('USERNAME'), length: 30 })),
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
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('USERNAME')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('USERNAME_PLACEHOLDER')} {...field} />
                            </FormControl>
                            <FormMessage />
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
                                            format(field.value, "PPP")
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