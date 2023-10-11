import { CompassIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MobileMainSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const t = useTranslations()
  return (
    <div
      className={cn('py-12 ', className)}
      ref={ref}
    >
      <div className="space-y-4">
        <div className="py-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start px-2"
            >
              <CompassIcon className="mr-2 h-4 w-4" />
              <div className="text-lg font-semibold">{t('discover')}</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

export { MobileMainSidebar }

MobileMainSidebar.displayName = 'MobileMainSidebar'

export default MobileMainSidebar
