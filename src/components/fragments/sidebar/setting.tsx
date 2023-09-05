'use client'

import * as React from "react"
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import '@/lib/utils/string/substring-after-last'
import '@/lib/utils/string/to-title-case'
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

interface SettingMenuProps {
    className?: string;
    pathName: string;
}

const SettingMenu: React.FC<SettingMenuProps> = ({ className, pathName }) => {
    const paths = ["/settings/profile", "/settings/account", "/settings/appearance"];

    return (
        <div className={cn("space-y-1", className)}>
            {paths.map((path, index) => (
                <Button
                    key={index}
                    variant={pathName === path ? "secondary" : "ghost"}
                    className={cn("justify-start w-full", pathName === path ? "hidden md:block" : "")}
                    asChild
                >
                    <Link href={path}>
                        <div className="text-lg font-semibold">{path.substringAfterLast("/").toTitleCase()}</div>
                    </Link>
                </Button>
            ))
            }
        </div >
    )
}

const SettingSidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const pathName = usePathname();
    const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false)
    const toggleCollapsible = () => {
        setIsCollapsibleOpen(!isCollapsibleOpen);
    };
    return (
        <div className={cn("", className)} ref={ref} {...props}>
            <div className="py-4 space-y-4">
                <div className="px-3 py-2">
                    <SettingMenu pathName={pathName} className="hidden md:block" />
                    <Collapsible className="md:hidden">
                        <CollapsibleTrigger className="w-full">
                            <Button variant="outline" className="justify-start w-full" onClick={toggleCollapsible} asChild>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold">{pathName.substringAfterLast("/").toTitleCase()}</span>
                                    {!isCollapsibleOpen ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronUpIcon className="w-4 h-4" />}
                                    {/* <ChevronDownIcon className="w-4 h-4" /> */}
                                </div>
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SettingMenu pathName={pathName} />
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
        </div>
    )
})

export { SettingSidebar }
