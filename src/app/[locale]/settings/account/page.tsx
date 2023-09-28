import { useTranslations } from 'next-intl'
import { MainHeader } from '@/components/ui/main-header'
import AccountSettingForm from '@/components/fragments/form/account-setting'

export default function Page() {
  const t = useTranslations()
  return (
    <>
      <MainHeader
        title={t('ACCOUNT')}
        description={t('ACCOUNT_SETTINGS_DESC')}
      />
      <AccountSettingForm />
    </>
  )
}
