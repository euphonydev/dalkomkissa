import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { MainHeader } from '@/components/ui/main-header'
import MovieGrid from '@/components/templates/movie-grid'

export const metadata: Metadata = {
  title: 'Latest Movies - Dalkom Kissa',
}

export default function Page() {
  const t = useTranslations()

  return (
    <div className="flex flex-col space-y-4">
      <MainHeader
        title={t('LATEST_ENTRY', { entry: t('MOVIES') })}
        withBreadcrumb
      />
      <MovieGrid />
    </div>
  )
}
