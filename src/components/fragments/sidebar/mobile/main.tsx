'use client'

import * as React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import MainSidebarMenu from '@/components/fragments/sidebar/menu/main'
import { cn } from '@/lib/utils'

const MobileMainSidebar = React.forwardRef<
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
            <MainSidebarMenu />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
})

export { MobileMainSidebar }

MobileMainSidebar.displayName = 'MobileMainSidebar'

export default MobileMainSidebar
