'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'
import '@/lib/utils/string/get-all-path'


interface MainHeaderProps {
    className?: string
    title: string
    description?: string,
    ref?: React.ForwardedRef<HTMLDivElement>,
    children?: React.ReactNode,
    withBreadcrumb?: boolean
}

const MainHeader: React.FC<MainHeaderProps> = (({ className, title, description, ref, children, withBreadcrumb = false, ...props }) => {
    const t = useTranslations()
    const pathName = usePathname()
    const paths = pathName.getAllPath()
    return (
        <>
            <header className={cn('flex flex-col w-full space-y-4', className)} {...props} ref={ref}>
                {withBreadcrumb && (
                    <Breadcrumb>
                        {paths.map((path, index) =>
                            path.length > 2 ? (
                                <BreadcrumbItem key={index}>
                                    <BreadcrumbLink href={`/${paths.slice(0, index + 1).join('/')}`}>{t(path.toUpperCase())}</BreadcrumbLink>
                                </BreadcrumbItem>
                            ) : null
                        )}
                    </Breadcrumb>
                )}
                <div className="flex flex-col">
                    <h2 className='w-full'>{title}</h2>
                    <div className='text-lead'>{description}</div>
                </div>
            </header>
            <Separator />
        </>
    )
})

export { MainHeader }

MainHeader.displayName = "MainHeader"

export default MainHeader