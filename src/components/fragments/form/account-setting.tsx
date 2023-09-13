'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { Label } from '@/components/ui/label';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const AccountSettingForm = () => {
    const { toast } = useToast()
    const [userData, setUserData] = useState<any>()
    const t = useTranslations();
    const supabase = createClientComponentClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data, error } = await supabase
                    .from('account')
                    .select(`email`)
                    .eq('id', user.id)
                    .single()
                if (!error) {
                    setUserData(data)
                }
            }
        }
        getUser()
    }, [])

    async function onChangePassword() {
        if (userData) {
            const { error } = await supabase.auth.resetPasswordForEmail(userData.email, {
                redirectTo: `${location.origin}/reset-password`,
            })
            if (!error) {
                console.log(userData.email)
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