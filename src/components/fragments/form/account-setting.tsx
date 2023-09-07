'use client'

import React from 'react'
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { Label } from '@/components/ui/label';

export const AccountSettingForm = () => {
    const { toast } = useToast()
    const t = useTranslations();

    function onChangePassword() {
        toast({
            description: t("EMAIL_SENDED"),
        })
    }

    return (
        <div className="space-y-8">
            <div className='flex-col space-y-3'>
                <div>
                    <Label>{t('PASSWORD')}</Label>
                    <div className="text-alt">{t('CHANGE_PASSWORD_DESC')}</div>
                </div>
                <Button size="xs" variant="secondary" onClick={onChangePassword}>{t('CHANGE_FIELD', { field: t('PASSWORD').toLowerCase() })}</Button>
            </div>
        </div>
    )
}

AccountSettingForm.displayName = 'AccountSettingForm'

export default AccountSettingForm