'use client'

import MainSidebarMenu from './menu/main'
import * as React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const MainSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn('hidden md:block', className)}
      ref={ref}
      {...props}
    >
      <ScrollArea>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <MainSidebarMenu />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
})

export { MainSidebar }

MainSidebar.displayName = 'MainSidebar'

export default MainSidebar
