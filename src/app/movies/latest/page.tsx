import type { Metadata } from 'next'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'
import { MovieCard } from '@/components/fragments/movie-card'

export const metadata: Metadata = {
    title: 'Latest Movies - Dalkom Kissa',
}

export default function Page() {
    return (
        <div className="flex flex-col space-y-4">
            <header className='flex flex-col w-full space-y-2'>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/discover">Discover</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/movies">Movies</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="/movies/latest">
                            Latest
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <h2 className='w-full'>Latest Movies</h2>
            </header>
            <div className='grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                {/* Movie Card Here */}
            </div>
        </div>
    )
}