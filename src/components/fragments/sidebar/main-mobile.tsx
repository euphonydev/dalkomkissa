import * as React from "react"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CompassIcon } from "lucide-react"
import { useTranslations } from "next-intl"

const MobileMainSidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const t = useTranslations()
    return (
        <div className={cn("py-12 ", className)} ref={ref}>
            <div className="space-y-4">
                <div className="py-2">
                    <div className="space-y-1">
                        <Button variant="ghost" className="justify-start w-full px-2">
                            <CompassIcon className="w-4 h-4 mr-2" />
                            <div className="text-lg font-semibold">{t('DISCOVER')}</div>
                        </Button>
                    </div >
                </div>
            </div>
        </div >
    )
})

export { MobileMainSidebar }

MobileMainSidebar.displayName = "MobileMainSidebar"

export default MobileMainSidebar