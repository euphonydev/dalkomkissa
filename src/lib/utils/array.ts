import { locales } from '@/types/enums/languages'

export function testPathArrayRegex(
  pathArray: string[],
  currentPath: string,
): boolean {
  const pathRegex = new RegExp(
    `^(/(${locales.join('|')}))?(${pathArray.join('|')})(/.*)?$`,
    'i',
  )
  return pathRegex.test(currentPath)
}
