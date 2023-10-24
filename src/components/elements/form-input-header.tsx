import { FormLabel } from '@/components/ui/form'
import { FormLockIcon } from '@/components/elements/form-lock-icon'
import { FormTooltip } from '@/components/elements/form-tooltip'

type Props = {
  label: string
  id?: string
  helpText?: string
  showLockIcon?: boolean
  isLocked?: boolean
  onLockClick?: () => void
}

const FormInputHeader = ({
  label,
  id,
  helpText,
  showLockIcon,
  isLocked,
  onLockClick,
}: Props) => {
  return (
    <div className="flex w-full items-baseline justify-between">
      <FormLabel htmlFor={id}>
        <div className="flex items-center">
          {label}
          {helpText ? <FormTooltip content={helpText} /> : null}
        </div>
      </FormLabel>
      {showLockIcon ? (
        <FormLockIcon
          isLocked={isLocked}
          onLockClick={onLockClick}
        />
      ) : null}
    </div>
  )
}

FormInputHeader.displayName = 'FormInputHeader'

export { FormInputHeader }
