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
                <MainNavbar />
                <div className="h-full bg-background">
                    <div className="h-full md:flex">
                        <SidebarComponent className="md:w-2/5 lg:w-1/5" />
                        <div className={cn("container pt-10 mx-auto border-l", className)}>
                            {children}
                        </div>
                    </div>
                </div>
                <SheetContent side="left">
                    <MobileMainSidebar />
                </SheetContent>
            </Sheet>
        </div>
    );
};

export { Navbar }
