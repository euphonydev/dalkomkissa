import { useTranslations } from 'next-intl'
import { MainHeader } from '@/components/ui/main-header'
import MovieForm from '@/components/fragments/form/movie'

export default function Page() {
  const t = useTranslations()
  return (
    <>
      <MainHeader
        title={t('add_new_entry', { entry: t('movie').toLowerCase() })}
      />
      <MovieForm />
    </>
  )
}
