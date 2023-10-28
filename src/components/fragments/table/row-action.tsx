import { MoreVerticalIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'

type TableRowActionProps = {
  children: React.ReactElement<typeof MenuItemAction>
}

export function TableRowAction({ children }: TableRowActionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}

interface MenuItemActionProps {
  label: string
  link?: string
  onClick?: () => void
  successTranslationKey?: string
}

export const MenuItemAction = ({
  label,
  link,
  onClick,
  successTranslationKey = label,
}: MenuItemActionProps) => {
  const t = useTranslations()
  const router = useRouter()
  const { toast } = useToast()
  if (link) {
    return (
      <Link
        key={label}
        href={link}
      >
        <DropdownMenuItem>{t(label)}</DropdownMenuItem>
      </Link>
    )
  } else if (onClick) {
    return (
      <DropdownMenuItem
        onClick={() => {
          onClick()
          toast({
            description: (
              <p>
                {t('action_success', {
                  action: t('change_field', {
                    field: t(successTranslationKey),
                  }).toLowerCase(),
                })}
              </p>
            ),
          })
          router.refresh()
        }}
      >
        {t(label)}
      </DropdownMenuItem>
    )
  } else {
    return <DropdownMenuItem key={label}>{t(label)}</DropdownMenuItem>
  }
}
