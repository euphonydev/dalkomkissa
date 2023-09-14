'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { Label } from '@/components/ui/label';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@/hooks/useUser';

export const AccountSettingForm = () => {
    const { toast } = useToast()
    const { user } = useUser()
    const t = useTranslations();
    const supabase = createClientComponentClient()

    async function onChangePassword() {
        if (user) {
            const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
                redirectTo: `${location.origin}/auth/callback?next=/reset-password`,
            })
            if (!error) {
                console.log(user.email)
                toast({
                    description: t("EMAIL_SENDED"),
                })
            }
        }
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