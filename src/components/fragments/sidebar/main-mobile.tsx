'use client'

import { CompassIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { testPathRegex } from '@/lib/utils/string'

const MobileMainSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const t = useTranslations()
  const pathName = usePathname()
  const discoverPath = '/discover'
  const discoverMoviePath = '/discover/movies'
  return (
    <div
      className={cn('pt-0', className)}
      ref={ref}
      {...props}
    >
      <ScrollArea>
        <div className="space-y-4">
          <div className="py-2">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={
                testPathRegex(discoverPath, pathName) ? 'discover' : undefined
              }
            >
              <AccordionItem
                value="discover"
                className="border-b-0"
              >
                <AccordionTrigger className="flex w-full items-center px-3 text-lg font-semibold tracking-tight">
                  <CompassIcon className="mr-3 h-6 w-6" />
                  <div className="w-full text-left">{t('discover')}</div>
                </AccordionTrigger>
                <AccordionContent>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                  >
                    <div className="space-y-1">
                      <AccordionItem
                        value="movies"
                        className="border-b-0"
                      >
                        <Button
                          variant={
                            testPathRegex(discoverMoviePath, pathName)
                              ? 'secondary'
                              : 'ghost'
                          }
                          size="sm"
                          className="w-full justify-start"
                          asChild
                        >
                          <AccordionTrigger className="w-full justify-start">
                            <Link
                              href="/"
                              className="w-full text-left"
                            >
                              {t('movies')}
                            </Link>
                          </AccordionTrigger>
                        </Button>
                        <AccordionContent>
                          <div className="m-1 space-y-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                              asChild
                            >
                              <Link href="/discover/movies/latest">
                                {t('latest')}
                              </Link>
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
})

export { MobileMainSidebar }

MobileMainSidebar.displayName = 'MobileMainSidebar'

export default MobileMainSidebar
