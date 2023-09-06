"use client"

import * as React from "react"
import Image from 'next/image'
import Link from 'next/link'
import { AlignLeftIcon, MoonIcon, SunIcon } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuGroup, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { SheetTrigger } from "@/components/ui/sheet"
import { cn } from '@/lib/utils'
import { useTheme } from "next-themes"
import { useTranslations } from 'next-intl'

const MainNavbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const { theme, setTheme } = useTheme()
    const t = useTranslations()
    return (
        <div className={cn('border-b', className)} {...props} ref={ref} >
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
                            <Button variant="ghost" size="icon">
                                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                                <DropdownMenuRadioItem value="light">{t('LIGHT_MODE')}</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="dark">{t('DARK_MODE')}</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="system">{t('SYSTEM')}</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/avatars/01.png" alt="@imacool" />
                                    <AvatarFallback>EU</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">imacool</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        example@mail.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <Link href="/settings">
                                    <DropdownMenuItem>
                                        {t('SETTINGS')}
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                {t('LOGOUT')}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
})

export { MainNavbar }

MainNavbar.displayName = "MainNavbar"

export default MainNavbar