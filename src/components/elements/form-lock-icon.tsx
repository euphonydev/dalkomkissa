import { LockIcon, UnlockIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  isLocked?: boolean
  onLockClick?: () => void
}

const FormLockIcon = ({ isLocked, onLockClick }: Props) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onLockClick}
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
