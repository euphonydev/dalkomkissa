import { ArrowUpDownIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

type TableHeaderDataProps = {
  label: string
  column?: any
}

export function TableHeaderData({ label, column }: TableHeaderDataProps) {
  const t = useTranslations()
  return (
    <>
      {column ? (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t(label)}
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        t(label)
      )}
    </>
  )
}
