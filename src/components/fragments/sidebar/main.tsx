import * as React from "react"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CompassIcon } from "lucide-react"

const MainSidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("hidden md:block", className)} ref={ref}>
        <div className="py-4 space-y-4">
            <div className="px-3 py-2">
                <div className="space-y-1">
                    <Button variant="secondary" className="justify-start w-full">
                        <CompassIcon className="w-4 h-4 mr-2" />
                        <div className="text-lg font-semibold">Discover</div>
                    </Button>
                </div >
            </div>
        </div>
    </div >
))

export { MainSidebar }

MainSidebar.displayName = "MainSidebar"

export default MainSidebar