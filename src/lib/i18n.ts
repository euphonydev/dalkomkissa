import { locales } from '../types/enums/languages'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`@/assets/locales/${locale}.json`)).default,
  timeZone: 'Asia/Jakarta',
}))

export const { Link, useRouter, usePathname, redirect } =
  createSharedPathnamesNavigation({ locales })
