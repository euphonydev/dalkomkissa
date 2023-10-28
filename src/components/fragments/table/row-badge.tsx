import { useTranslations } from 'next-intl'
import React from 'react'
import { Badge } from '@/components/ui/badge'

type TableRowBadgeProps = {
  label: string
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  useTranslation?: boolean
  customColor?: 'primary' | 'destructive' | 'warning'
}

export function TableRowBadge({
  label,
  useTranslation,
  variant,
}: TableRowBadgeProps) {
  const t = useTranslations()
  return (
    <>
      <Badge variant={variant}>{useTranslation ? t(label) : label}</Badge>
    </>
  )
}
