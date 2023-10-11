import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function AccountSettingForm() {
  const t = useTranslations()
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-3">
        <Label>{t('password')}</Label>
        <Link
          href="/change-password"
          target="_blank"
        >
          <Button
            size="xs"
            variant="secondary"
          >
            {t('change_field', { field: t('password').toLowerCase() })}
          </Button>
        </Link>
      </div>
    </div>
  )
}

AccountSettingForm.displayName = 'AccountSettingForm'

export default AccountSettingForm
