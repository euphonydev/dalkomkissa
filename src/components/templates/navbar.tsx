import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils'
import { MainSidebar } from "@/components/fragments/sidebar/main"
import { MainNavbar } from "@/components/fragments/navbar/main"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { MobileMainSidebar } from "@/components/fragments/sidebar/main-mobile"

interface NavbarProps {
    className?: string;
    children?: ReactNode;
    sidebar?: React.ComponentType<any>;
}

const Navbar: React.FC<NavbarProps> = ({ className, children, sidebar: SidebarComponent = MainSidebar, ...props }) => {
    return (
        <div className={cn('h-screen')} {...props}>
            <Sheet>
                <MainNavbar className='sticky top-0 bg-background z-50' />
                <div className="md:grid md:grid-cols-5">
                    <aside className="md:self-start md:h-[calc(100vh-theme(spacing.16))] md:col-span-1 md:sticky md:top-16 md:border-r">
                        <SidebarComponent />
                    </aside>
                    <main className={cn("md:h-full md:col-span-4 container pt-10 md:pt-10 pb-16 md:pb-10 mx-auto", className)}>
                        {children}
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