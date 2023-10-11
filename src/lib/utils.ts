import { type ClassValue, clsx } from 'clsx'
import * as React from 'react'
import { twMerge } from 'tailwind-merge'

/**
 * #### cn
 *
 * Merge classnames
 *
 * * * *
 * Example:
 * ```typescript
 * import { cn } from '@/lib/utils'
 *
 * const classes = cn('flex flex-col', 'items-center')
 *
 * ```
 * * * *
 * @param ...inputs Classnames
 * @return merged classnames
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * #### getValidChildren
 *
 * Filter out invalid children
 *
 * * * *
 * Example:
 * ```typescript
 * import { getValidChildren } from '@/lib/utils'
 *
 * const children = getValidChildren(children)
 *
 * ```
 * * * *
 * @param children React children
 * @return React children
 */
export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement[]
}
