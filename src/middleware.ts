import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales } from '@/types/enums/languages'
import { testPathArrayRegex } from '@/lib/utils/array'

const adminPages = ['/dashboard', '/movie/new']
const protectedPages = ['/settings', '/change-password']

const intlMiddleware = createIntlMiddleware({
  locales: locales,
  defaultLocale: 'en',
})

export default async function middleware(req: NextRequest) {
  const res = intlMiddleware(req)
  const requestUrl = new URL(req.url)
  if (testPathArrayRegex(protectedPages, req.nextUrl.pathname)) {
    const supabase = createMiddlewareClient({ req, res })
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session) {
      if (testPathArrayRegex(adminPages, req.nextUrl.pathname)) {
        const { data } = await supabase.rpc('get_my_claim', {
          claim: 'userrole',
        })
        if (data !== 'webadmin') {
          return NextResponse.redirect(requestUrl.origin)
        } else {
          return res
        }
      } else {
        return res
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
