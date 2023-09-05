import * as React from "react"
import { cn } from "@/lib/utils"
import { Separator } from '@/components/ui/separator'


interface SettingHeaderProps {
    className?: string
    title: string
    description?: string,
    ref?: React.ForwardedRef<HTMLDivElement>
}

const SettingHeader: React.FC<SettingHeaderProps> = (({ className, title, description, ref, ...props }) => {
    return (
        <>
            <header className={cn('flex flex-col w-full space-y-2', className)} {...props} ref={ref}>
                <h2 className='w-full'>{title}</h2>
                <div className='text-lead'>{description}</div>
            </header>
            <Separator />
        </>
    )
})

export { SettingHeader }
