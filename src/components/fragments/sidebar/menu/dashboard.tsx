import { DatabaseIcon } from 'lucide-react'
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

function DashboardSidebarMenu() {
  const t = useTranslations()
  const pathName = usePathname()
  const entriesPath = '/dashboard/entries'
  const movieEntriesPath = '/dashboard/entries/movies'
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={
        testPathRegex(entriesPath, pathName) ? 'entries' : undefined
      }
    >
      <AccordionItem
        value="entries"
        className="border-b-0"
      >
        <AccordionTrigger className="flex w-full items-center px-3 text-lg font-semibold tracking-tight">
          <DatabaseIcon className="mr-3 h-6 w-6" />
          <div className="w-full text-left">{t('entries')}</div>
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
                    testPathRegex(movieEntriesPath, pathName)
                      ? 'secondary'
                      : 'ghost'
                  }
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <AccordionTrigger className="w-full justify-start">
                    <Link
                      href={movieEntriesPath}
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
                      <Link href={movieEntriesPath}>{t('all')}</Link>
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

DashboardSidebarMenu.displayName = 'DashboardSidebarMenu'

export default DashboardSidebarMenu
