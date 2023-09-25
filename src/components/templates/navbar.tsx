'use client'
import React, { ReactNode, useState, useEffect } from 'react';
import { cn } from '@/lib/utils'
import { MainSidebar } from "@/components/fragments/sidebar/main"
import { MainNavbar } from "@/components/fragments/navbar/main"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { MobileMainSidebar } from "@/components/fragments/sidebar/main-mobile"
import { Button } from '@/components/ui/button'
import { ArrowUpIcon } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'

interface NavbarProps {
    className?: string;
    children?: ReactNode;
    sidebar?: React.ComponentType<any>;
}

const Navbar: React.FC<NavbarProps> = ({ className, children, sidebar: SidebarComponent, ...props }) => {
    const [visible, setVisible] = useState(true)
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [shouldHideNavbar, setShouldHideNavbar] = useState(false)

    const debouncedHandleScroll = useDebouncedCallback(
        (currentScrollPos) => {
            setVisible(
                (
                    prevScrollPos > currentScrollPos &&
                    prevScrollPos - currentScrollPos > 70
                ) || currentScrollPos < 10
            )
            setPrevScrollPos(currentScrollPos)
        },
        100
    )

    const handleBackToTop = () => {
        const target = document.getElementById('main')
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        const mdBreakpoint = 768;
        setShouldHideNavbar(window.innerWidth < mdBreakpoint)
        window.addEventListener('scroll', () => {
            const currentScrollPos = window.pageYOffset
            debouncedHandleScroll(currentScrollPos)
        })

        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll)
        }
    }, [debouncedHandleScroll, prevScrollPos])

    return (
        <div className={cn('h-screen')} {...props} id='main'>
            <Sheet>
                <MainNavbar className={`sticky top-0 bg-background z-50 transition-all ${!visible && shouldHideNavbar ? 'translate-y-[-100%]' : ''}`} />
                <div className="md:grid md:grid-cols-5">
                    <aside className="md:self-start md:h-[calc(100vh-theme(spacing.16))] md:col-span-1 md:sticky md:top-16 md:border-r">
                        {SidebarComponent ? <SidebarComponent /> : null}
                    </aside>
                    <main className={cn("md:h-full md:col-span-4 container pt-10 md:pt-10 pb-[8vh] md:pb-10 mx-auto", className)}>
                        {children}
                        <Button size="icon" className={`rounded-full hover:animate-bounce fixed bottom-3 md:bottom-4 right-3 md:right-4 transition-all ${visible ? 'translate-y-[+200%]' : ''}`} onClick={handleBackToTop}><ArrowUpIcon /></Button>
                    </main>
                </div>
                <SheetContent side="left">
                    <MobileMainSidebar />
                </SheetContent>
            </Sheet>
        </div>
    )
}

export { Navbar }

Navbar.displayName = "Navbar"

export default Navbar