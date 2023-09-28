import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb'
import { MainHeader } from '@/components/ui/main-header'
import { MovieCard } from '@/components/fragments/movie-card'

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
      <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {/* Movie Card Here */}
      </div>
    </div>
  )
}
