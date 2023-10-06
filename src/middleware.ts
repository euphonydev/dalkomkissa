import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'id']
const adminPages = ['/dashboard', '/movie/new']
const protectedPages = ['/settings', '/change-password']
const preLoginPages = ['/login', '/register']

const intlMiddleware = createIntlMiddleware({
  locales: locales,
  defaultLocale: 'en',
})

export default async function middleware(req: NextRequest) {
  const res = intlMiddleware(req)
  const requestUrl = new URL(req.url)
  const adminPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${adminPages.join('|')})(/.*)?$`,
    'i',
  )
  const protectedPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${protectedPages.join('|')})(/.*)?$`,
    'i',
  )
  const preLoginPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${preLoginPages.join('|')})(/.*)?$`,
  )
  if (protectedPathnameRegex.test(req.nextUrl.pathname)) {
    const supabase = createMiddlewareClient({ req, res })
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session) {
      if (adminPathnameRegex.test(req.nextUrl.pathname)) {
        const { data } = await supabase.rpc('get_my_claim', {
          claim: 'userrole',
        })
        if (data !== 'webadmin') {
          return NextResponse.redirect(requestUrl.origin)
        } else {
          return res
        }
      } else {
        if (preLoginPathnameRegex.test(req.nextUrl.pathname)) {
          return NextResponse.redirect(requestUrl.origin)
        } else {
          return res
        }
      }
    } else {
      return NextResponse.redirect(`${requestUrl.origin}/login`)
    }
  } else {
    return res
  }
}

export const config = {
  matcher: ['/((?!api|auth|_next|.*\\..*).*)'],
}
