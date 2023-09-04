import * as React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuGroup } from '@/components/ui/dropdown-menu'
import { SheetTrigger } from "@/components/ui/sheet"
import { AlignLeftIcon } from "lucide-react"

const MainNavbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn('border-b', className)} {...props} ref={ref}>
        <div className="flex items-center h-16 px-4">
            <nav className="flex items-center space-x-4 lg:space-x-6">
                <SheetTrigger className="block md:hidden">
                    <AlignLeftIcon className="w-6 h-6" />
                </SheetTrigger>
                <Link href="/">
                    <Image src="/images/logo.png" width={180} height={120} alt="Dalkom Kissa" />
                </Link>
            </nav>
            <div className="flex items-center ml-auto space-x-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/avatars/01.png" alt="@euphonydev" />
                                <AvatarFallback>ED</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">euphonydev</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    euphonydev@gmail.com
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Settings
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </div >
))

export { MainNavbar }
