import { HelpCircleIcon } from 'lucide-react'
import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Props = {
  content: string
}

const FormTooltip = ({ content }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <HelpCircleIcon className="ml-2 h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="text-small"
      >
        {content}
      </PopoverContent>
    </Popover>
  )
}

FormTooltip.displayName = 'FormTooltip'

export { FormTooltip }
