'use client'

import { CompassIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MainSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const t = useTranslations()
  return (
    <div
      className={cn('hidden md:block', className)}
      ref={ref}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              variant="secondary"
              className="w-full justify-start"
            >
              <CompassIcon className="mr-2 h-4 w-4" />
              <div className="text-lg font-semibold">{t('DISCOVER')}</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

export { MainSidebar }

MainSidebar.displayName = 'MainSidebar'

export default MainSidebar
