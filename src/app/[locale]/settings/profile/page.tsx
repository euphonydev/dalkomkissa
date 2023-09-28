import { useTranslations } from 'next-intl'
import { MainHeader } from '@/components/ui/main-header'
import ProfileSettingForm from '@/components/fragments/form/profile-setting'

export default function Page() {
  const t = useTranslations()
  return (
    <>
      <MainHeader
        title={t('PROFILE')}
        description={t('PROFILE_SETTINGS_DESC')}
      />
      <ProfileSettingForm />
    </>
  )
}
