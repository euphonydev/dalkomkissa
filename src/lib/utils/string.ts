import { locales } from '@/types/enums/languages'

/**
 * #### getAllPathFromUrl
 *
 * Get all path from url
 *
 * * * *
 * Example:
 * ```typescript
 * import { getAllPathFromUrl } from '@/lib/utils/string/get-all-path-from-url'
 *
 * const path = '/movie/1'
 * getAllPathFromUrl(path) // ['movie', '1']
 *
 * ```
 * * * *
 * @param path Url
 * @return Array of path
 */
export function getAllPathFromUrl(path: string): string[] {
  const pathArray = path.split('/').filter(Boolean)
  return pathArray
}

/**
 * #### getNameIntial
 *
 * Get initial name from name
 *
 * * * *
 * Example:
 * ```typescript
 * import { getNameIntial } from '@/lib/utils/string/get-name-initial'
 *
 * const name = 'John Doe'
 * getNameInitial(name) // 'JD'
 *
 * ```
 * * * *
 * @param name Name
 * @return Initial name
 */
export function getNameInitial(name: string): string {
  const words = name.split(' ')
  let initials = ''
  for (let i = 0; i < words.length; i++) {
    if (initials.length >= 2) {
      break
    }
    const word = words[i]
    if (word.length > 0) {
      initials += word[0].toUpperCase()
    }
  }
  return initials
}

/**
 * #### substringAfterLast
 *
 * Get substring after last
 *
 * * * *
 * Example:
 * ```typescript
 * import { substringAfterLast } from '@/lib/utils/string/substring-after-last'
 *
 * const str = 'Hello World'
 * substringAfterLast(str, ' ') // 'World'
 *
 * ```
 * * * *
 * @param str String
 * @param char Char
 * @return Substring after last
 */
export function substringAfterLast(str: string, char: string): string {
  return str.substring(str.lastIndexOf(char) + 1)
}

/**
 * #### toTitleCase
 *
 * Convert string to title case
 *
 * * * *
 * Example:
 * ```typescript
 * import { toTitleCase } from '@/lib/utils/string/to-title-case'
 *
 * const str = 'hello world'
 * toTitleCase(str) // 'Hello World'
 *
 * ```
 * * * *
 * @param str String
 * @return Title case string
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  )
}

export function testPathRegex(path: string, currentPath: string): boolean {
  const pathRegex = new RegExp(`^(/(${locales.join('|')}))?${path}(/.*)?$`, 'i')
  return pathRegex.test(currentPath)
}
