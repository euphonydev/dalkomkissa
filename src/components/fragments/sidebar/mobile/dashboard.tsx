'use client'

import * as React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import DashboardSidebarMenu from '@/components/fragments/sidebar/menu/dashboard'
import { cn } from '@/lib/utils'

const MobileDashboardSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn('pt-0', className)}
      ref={ref}
      {...props}
    >
      <ScrollArea>
        <div className="space-y-4">
          <div className="py-2">
            <DashboardSidebarMenu />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
})

export { MobileDashboardSidebar }

MobileDashboardSidebar.displayName = 'MobileDashboardSidebar'

export default MobileDashboardSidebar
