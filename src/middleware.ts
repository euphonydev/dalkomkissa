import createMiddleware from 'next-intl/middleware';
import { locales, pathnames } from '@/lib/navigation';

export default createMiddleware({
  locales: locales,
  pathnames: pathnames,
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
