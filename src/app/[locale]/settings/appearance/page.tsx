import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { MainHeader } from '@/components/ui/main-header'

const AppearanceSettingForm = dynamic(
  () => import('@/components/fragments/form/appearance-setting'),
  { ssr: false },
)

export default function Page() {
  const t = useTranslations()
  return (
    <>
      <MainHeader
        title={t('appearance')}
        description={t('appearance_setting_desc')}
      />
      <AppearanceSettingForm />
    </>
  )
}
