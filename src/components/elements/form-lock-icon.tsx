'use client'

import { LockIcon, UnlockIcon } from 'lucide-react'
import React from 'react'
import { useUserContext } from '@/contexts/user-context'
import { Button } from '@/components/ui/button'

type Props = {
  isLocked?: boolean
  onLockClick?: () => void
}

const FormLockIcon = ({ isLocked, onLockClick }: Props) => {
  const { userRole } = useUserContext()
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={userRole === 'webadmin' ? onLockClick : undefined}
    >
      {isLocked ? (
        <LockIcon className="h-4 w-4" />
      ) : (
        <UnlockIcon className="h-4 w-4" />
      )}
    </Button>
  )
}

FormLockIcon.displayName = 'FormLockIcon'

export { FormLockIcon }
