import React from 'react'
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import Link from "next/link"
export const AccountSettingForm = () => {
    const t = useTranslations();
    return (
        <div className="space-y-8">
            <div className='flex flex-col space-y-3'>
                <Label>{t('PASSWORD')}</Label>
                <Link href='/change-password' target='_blank'>
                    <Button size="xs" variant="secondary">{t('CHANGE_FIELD', { field: t('PASSWORD').toLowerCase() })}</Button>
                </Link>
            </div>
        </div >
    )
}

AccountSettingForm.displayName = 'AccountSettingForm'

export default AccountSettingForm