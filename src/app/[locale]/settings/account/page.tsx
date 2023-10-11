import { useTranslations } from 'next-intl'
import { MainHeader } from '@/components/ui/main-header'
import AccountSettingForm from '@/components/fragments/form/account-setting'

export default function Page() {
  const t = useTranslations()
  return (
    <>
      <MainHeader
        title={t('account')}
        description={t('account_setting_desc')}
      />
      <AccountSettingForm />
    </>
  )
}
