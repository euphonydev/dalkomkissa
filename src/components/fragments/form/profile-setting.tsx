'use client'

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useTranslations, useFormatter } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { CalendarIcon, PencilIcon } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from "next/navigation"
import '@/lib/utils/string/get-initial-name'
import '@/lib/utils/string/substring-after-last'
import { useDebounce } from 'use-debounce'
import { useUser } from '@/hooks/useUser'

export const ProfileSettingForm = () => {
    const { toast } = useToast()
    const t = useTranslations();
    const supabase = createClientComponentClient()
    const router = useRouter()
    const format = useFormatter();
    const { user, avatar } = useUser()
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [usernameError, setUsernameError] = useState<string>('');

    const formSchema = z.object({
        username: z
            .string({ required_error: t('IS_REQUIRED', { field: t('USERNAME') }) })
            .min(3, t('IS_TOO_SHORT', { field: t('USERNAME'), length: 3 }))
            .max(30, t('IS_TOO_LONG', { field: t('USERNAME'), length: 30 }))
            .regex(/^[a-zA-Z0-9_]+$/, t('USERNAME_NOT_VALID')),
        fullname: z
            .string(),
        avatar: z.string(),
        dob: z
            .date({ required_error: t('IS_REQUIRED', { field: t('DATE_OF_BIRTH') }) }),
        gender: z.string({
            required_error: t("IS_REQUIRED", { field: t("GENDER") }),
        })
    })

    type formValues = z.infer<typeof formSchema>

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            avatar: ""
        },
        mode: "onChange",
    })

    const [debouncedUsername] = useDebounce(form.watch('username'), 1000);

    useEffect(() => {
        const validateUsername = async (username: string) => {
            if (username) {
                if (username != user?.account.username) {
                    const { data: existingUser } = await supabase
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
            }
        };

        validateUsername(debouncedUsername);
    }, [debouncedUsername, supabase, t, user?.account.username]);

    useEffect(() => {
        if (user) {
            const birthDate = new Date(user.birthdate)
            form.setValue("username", user.account.username)
            form.setValue("fullname", user.name)
            form.setValue("dob", birthDate)
            form.setValue("gender", user.gender)
        }
    }, [user, form])

    async function onSubmit(formData: formValues) {
        const fileName = selectedFile ? `public/avatar/${user?.account_id}.${selectedFile?.name.substringAfterLast('.')}` : user?.photo
        let avatarError = false

        if (fileName && selectedFile) {
            if (user?.photo) {
                await supabase
                    .storage
                    .from('avatar')
                    .remove([user?.photo])
            }
            const { error } = await supabase
                .storage
                .from('avatar')
                .upload(fileName, selectedFile, { upsert: true })
            if (error) {
                avatarError = true
            }
        }

        const { error: accountError } = await supabase
            .from('account')
            .update({ username: formData.username })
            .eq('id', user?.account_id);

        const { error: profileError } = await supabase
            .from('profile')
            .update({
                name: formData.fullname,
                gender: formData.gender,
                birthdate: formData.dob,
                photo: fileName
            })
            .eq('id', user?.account_id);

        const { error: entryError } = await supabase
            .from('entry')
            .update({
                updated_at: new Date(),
            })
            .eq('id', user?.account_id);

        if (!accountError && !profileError && !avatarError && !entryError) {
            toast({
                description: (
                    <p>{t('ACTION_SUCCESS', { action: t('CHANGE_FIELD', { field: t('PROFILE') }).toLowerCase() })}</p>
                ),
            })
            router.push('/settings/profile')
        }
    }

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type.startsWith("image/")) {
                setSelectedFile(file);
            } else {
                console.error("Selected file is not an image.");
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex flex-col-reverse w-full space-y-8 space-y-reverse md:space-x-8 md:flex-row'>
                    <div className="w-full space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor='username'>{t('USERNAME')}</FormLabel>
                                    <FormControl onChange={(e) => {
                                        if (e.target instanceof HTMLInputElement) {
                                            field.onChange(e.target.value.toLowerCase());
                                        }
                                    }}>
                                        <Input type="text" autoComplete='off' id='username' placeholder={t('USERNAME_PLACEHOLDER')} {...field} />
                                    </FormControl>
                                    <FormMessage>{usernameError}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor='fullname'>{t('FULL_NAME')}</FormLabel>
                                    <FormControl>
                                        <Input autoComplete='name' type="text" id='fullname' placeholder={t('FULL_NAME_PLACEHOLDER')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>{t("CHANGE_FIELD", { field: t("GENDER").toLowerCase() })}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            className="flex flex-col space-y-1 md:flex-row md:space-x-4 md:space-y-0"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="m" checked={form.watch('gender') === 'm'} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {t("MALE")}
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="f" checked={form.watch('gender') === 'f'} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {t("FEMALE")}
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="?" checked={form.watch('gender') === '?'} />
                                                </FormControl>
                                                <FormLabel className="font-normal">{t("SECRET")}</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
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
                        <Button type="submit">{t('SAVE_FORM', { form: t('PROFILE').toLowerCase() })}</Button>
                    </div>
                    <div className='w-full md:w-2/5'>
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('AVATAR')}</FormLabel>
                                    <FormControl onChange={handleAvatarChange}>
                                        <Input
                                            type="file" {...field}
                                            id='avatar-input'
                                            className="hidden"
                                            accept='image/*' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="relative w-full">
                            <Avatar className="w-48 h-48 md:mx-auto md:w-56 md:h-56">
                                <AvatarImage id="avatar" src={selectedFile ? URL.createObjectURL(selectedFile) : avatar?.publicUrl}
                                    alt={'@' + (user?.account.username)} />
                                <AvatarFallback>{user?.name.getInitialName()}</AvatarFallback>
                            </Avatar>
                            <Button type="button" variant="outline" size="xs" className="absolute bottom-4 md:bottom-6" onClick={() => document.getElementById('avatar-input')?.click()}>
                                <div className='flex items-center'>
                                    <PencilIcon className="w-4 h-4 mr-1" />
                                    {t('CHANGE_FIELD', { field: "" })}
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form >
    )
}

ProfileSettingForm.displayName = 'ProfileSettingForm'

export default ProfileSettingForm