import { useTranslations } from 'next-intl'
import { MainHeader } from '@/components/ui/main-header'
import ProfileSettingForm from '@/components/fragments/form/profile-setting'

export default function Page() {
  const t = useTranslations()
  return (
    <>
      <MainHeader
        title={t('profile')}
        description={t('profile_setting_desc')}
      />
      <ProfileSettingForm />
    </>
  )
}
