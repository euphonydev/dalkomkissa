'use client'

import { ArrowUpIcon } from 'lucide-react'
import React, { ReactNode, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { MainNavbar } from '@/components/fragments/navbar/main'
import { MobileMainSidebar } from '@/components/fragments/sidebar/mobile/main'
import { cn } from '@/lib/utils'

interface NavbarProps {
  className?: string
  children?: ReactNode
  sidebar?: React.ComponentType<any>
  mobileSidebar?: React.ComponentType<any>
}

const Navbar: React.FC<NavbarProps> = ({
  className,
  children,
  sidebar: SidebarComponent,
  mobileSidebar: MobileSidebarComponent,
  ...props
}) => {
  const [visible, setVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [shouldHideNavbar, setShouldHideNavbar] = useState(false)

  const debouncedHandleScroll = useDebouncedCallback((currentScrollPos) => {
    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10,
    )
    setPrevScrollPos(currentScrollPos)
  }, 100)

  const handleBackToTop = () => {
    const target = document.getElementById('main')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const mdBreakpoint = 768
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
    <div
      className={cn('h-screen')}
      {...props}
      id="main"
    >
      <Sheet>
        <MainNavbar
          className={`sticky top-0 z-50 bg-background transition-all ${
            !visible && shouldHideNavbar ? 'translate-y-[-100%]' : ''
          }`}
        />
        <div className="md:grid md:grid-cols-5">
          <aside className="md:sticky md:top-16 md:col-span-1 md:h-[calc(100vh-theme(spacing.16))] md:self-start md:border-r">
            {SidebarComponent ? <SidebarComponent /> : null}
          </aside>
          <main
            className={cn(
              'container mx-auto pb-[8vh] pt-10 md:col-span-4 md:h-full md:pb-10 md:pt-10',
              className,
            )}
          >
            {children}
            <Button
              size="icon"
              className={`fixed bottom-3 right-3 rounded-full transition-all hover:animate-bounce md:bottom-4 md:right-4 ${
                visible ? 'translate-y-[+200%]' : ''
              }`}
              onClick={handleBackToTop}
            >
              <ArrowUpIcon />
            </Button>
          </main>
        </div>
        <SheetContent side="left">
          {MobileSidebarComponent ? (
            <MobileSidebarComponent />
          ) : (
            <MobileMainSidebar />
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export { Navbar }

Navbar.displayName = 'Navbar'

export default Navbar
