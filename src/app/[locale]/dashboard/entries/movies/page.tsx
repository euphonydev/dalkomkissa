import { useTranslations } from 'next-intl'
import { MainHeader } from '@/components/ui/main-header'
import { MovieTable } from '@/components/fragments/table/dashboard/movies/movies'

export default function Page() {
  const t = useTranslations()
  return (
    <>
      <MainHeader
        title={t('movies')}
        withBreadcrumb
      />
      <MovieTable />
    </>
  )
}
