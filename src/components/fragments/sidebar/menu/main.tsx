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
import { testPathRegex } from '@/lib/utils/string'

function MainSidebarMenu() {
  const t = useTranslations()
  const pathName = usePathname()
  const discoverPath = '/discover'
  const discoverMoviePath = '/discover/movies'
  return (
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
                      <Link href="/discover/movies/latest">{t('latest')}</Link>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

MainSidebarMenu.displayName = 'MainSidebarMenu'

export default MainSidebarMenu
