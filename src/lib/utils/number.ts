/**
 * #### convertFileSize
 *
 * Convert file size to human readable
 *
 * * * *
 * Example:
 * ```typescript
 * import { convertFileSize } from '@/lib/utils/number/convert-file-size'
 *
 * const number = 1024
 * convertFileSize(number) // 1.00 KB
 *
 * ```
 * * * *
 * @param number File size
 * @return A string of converted file size
 */
export function convertFileSize(number: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (number === 0) return '0 Byte'
  const i = Math.floor(Math.log(number) / Math.log(1024))
  const fileSize = number / Math.pow(1024, i)
  const formattedSize = fileSize
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return formattedSize + ' ' + sizes[i]
}

/**
 * #### shortenFormatNumber
 *
 * Takes a number and shortens it to a more readable format.
 *
 * * * *
 * Example:
 * ```typescript
 * import { shortenFormatNumber } from '@/lib/utils/number/shorten-format-number'
 *
 * const number = 1000
 * shortenFormatNumber(number) // 1k
 *
 * ```
 * * * *
 * @param number - The number to be shortened.
 * @return A string of shortened format
 */
export function shortenFormatNumber(number: number): string {
  if (number < 1000) {
    return number.toString()
  }
  if (number < 1000000) {
    const thousands = (number / 1000).toFixed(2)
    const parts = thousands.split('.')
    if (parts[1] === '00') {
      return `${parts[0]}k`
    }
    if (parts[1][1] === '0') {
      return `${parts[0]}.${parts[1][0]}k`
    }
    return `${thousands}k`
  }
  if (number < 1000000000) {
    const millions = (number / 1000000).toFixed(2)
    const parts = millions.split('.')
    if (parts[1] === '00') {
      return `${parts[0]}m`
    }
    if (parts[1][1] === '0') {
      return `${parts[0]}.${parts[1][0]}m`
    }
    return `${millions}m`
  }
  const billions = (number / 1000000000).toFixed(2)
  const parts = billions.split('.')
  if (parts[1] === '00') {
    return `${parts[0]}b`
  }
  if (parts[1][1] === '0') {
    return `${parts[0]}.${parts[1][0]}b`
  }
  return `${billions}b`
}
