import type { Metadata } from 'next'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'
import { MovieCard } from '@/components/fragments/movie-card'
import { useTranslations } from 'next-intl'

export const metadata: Metadata = {
    title: 'Latest Movies - Dalkom Kissa',
}

export default function Page() {
    const t = useTranslations()

    return (
        <div className="flex flex-col space-y-4">
            <header className='flex flex-col w-full space-y-2'>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/discover">discover</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/movies">movies</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="/movies/latest">
                            latest
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <h2 className='w-full'>{t('LATEST_MOVIES')}</h2>
            </header>
            <div className='grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                {/* Movie Card Here */}
            </div>
        </div>
    )
}