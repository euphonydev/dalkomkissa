'use client'

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'
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
import { useDebounce } from 'use-debounce';

export const ProfileSettingForm = () => {
    const { toast } = useToast()
    const t = useTranslations();
    const supabase = createClientComponentClient()
    const router = useRouter()
    const [userData, setUserData] = useState<any>()
    const [avatar, setAvatar] = useState("")
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
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data, error } = await supabase
                    .from('profile')
                    .select(`name, gender, birthdate, account_id, photo, account (username)`)
                    .eq('id', user.id)
                    .single()
                if (!error) {
                    setUserData(data)
                    const { data: photo } = supabase
                        .storage
                        .from('avatar')
                        .getPublicUrl(data.photo)
                    setAvatar(photo.publicUrl)
                }
            }
        }
        getUser()
    }, [])

    useEffect(() => {
        const validateUsername = async (username: string) => {
            if (username) {
                if (username != userData?.account.username) {
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
            }
        };

        validateUsername(debouncedUsername);
    }, [debouncedUsername, supabase, t]);

    useEffect(() => {
        if (userData) {
            const birthDate = new Date(userData.birthdate)
            form.setValue("username", userData.account.username)
            form.setValue("fullname", userData.name)
            form.setValue("dob", birthDate)
            form.setValue("gender", userData.gender)
        }
    }, [userData, form])

    async function onSubmit(formData: formValues) {
        const fileName = selectedFile ? `public/avatar/${userData?.account_id}.${selectedFile?.name.substringAfterLast('.')}` : userData?.photo
        let avatarError = false

        if (fileName && selectedFile) {
            if (userData?.photo) {
                await supabase
                    .storage
                    .from('avatar')
                    .remove([userData?.photo])
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
            .eq('id', userData?.account_id);

        const { error: profileError } = await supabase
            .from('profile')
            .update({
                name: formData.fullname,
                gender: formData.gender,
                birthdate: formData.dob,
                photo: fileName
            })
            .eq('id', userData?.account_id);

        if (!accountError && !profileError && !avatarError) {
            toast({
                description: (
                    <p>{t('ACTION_SUCCESS', { action: t('CHANGE_FIELD', { field: t('PROFILE') }).toLowerCase() })}</p>
                ),
            })
            router.refresh()
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
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('FULL_NAME')}</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder={t('FULL_NAME_PLACEHOLDER')} {...field} />
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
                                <AvatarImage id="avatar" src={selectedFile ? URL.createObjectURL(selectedFile) : avatar}
                                    alt={'@' + (userData?.account.username)} />
                                <AvatarFallback>{userData?.name.getInitialName()}</AvatarFallback>
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