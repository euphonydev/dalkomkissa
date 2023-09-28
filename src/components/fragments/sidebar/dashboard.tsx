'use client'

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import '@/lib/utils/string/substring-after-last'
import '@/lib/utils/string/to-title-case'

interface DashboardMenuProps {
  className?: string
  pathName: string
}

const DashboardMenu: React.FC<DashboardMenuProps> = ({
  className,
  pathName,
}) => {
  const t = useTranslations()
  const paths = ['/dashboard/movies']

  return (
    <div className={cn('space-y-1', className)}>
      {paths.map((path, index) => (
        <Button
          key={index}
          variant={
            pathName.substringAfterLast('/') === path.substringAfterLast('/')
              ? 'secondary'
              : 'ghost'
          }
          className={cn(
            'w-full justify-start',
            pathName.substringAfterLast('/') === path.substringAfterLast('/')
              ? 'hidden md:block'
              : '',
          )}
          asChild
        >
          <Link href={path}>
            <div className="text-lg md:font-semibold">
              {t(path.substringAfterLast('/').toUpperCase()).toTitleCase()}
            </div>
          </Link>
        </Button>
      ))}
    </div>
  )
}

const DashboardSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const pathName = usePathname()
  const t = useTranslations()
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false)
  const toggleCollapsible = () => {
    setIsCollapsibleOpen(!isCollapsibleOpen)
  }
  return (
    <div
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <DashboardMenu
            pathName={pathName}
            className="hidden md:block"
          />
          <Collapsible className="md:hidden">
            <CollapsibleTrigger className="w-full">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={toggleCollapsible}
                asChild
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">
                    {t(
                      pathName.substringAfterLast('/').toUpperCase(),
                    ).toTitleCase()}
                  </span>
                  {!isCollapsibleOpen ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronUpIcon className="h-4 w-4" />
                  )}
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <DashboardMenu pathName={pathName} />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  )
})

export { DashboardSidebar }

DashboardSidebar.displayName = 'DashboardSidebar'

export default DashboardSidebar
