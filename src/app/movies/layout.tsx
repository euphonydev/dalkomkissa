import { MainNavbar } from "@/components/fragments/main-navbar"
import { MainSidebar } from "@/components/fragments/main-sidebar"
import { MobileMainSidebar } from "@/components/fragments/mobile-main-sidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export default function MoviesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen">
            <Sheet>
                <MainNavbar />
                <div className="h-full bg-background">
                    <div className="h-full md:flex">
                        <MainSidebar className="md:w-2/5 lg:w-1/5" />
                        <div className="container pt-10 mx-auto border-l">
                            {children}
                        </div>
                    </div>
                </div>
                <SheetContent side="left">
                    <MobileMainSidebar />
                </SheetContent>
            </Sheet>
        </div>
    )
}
