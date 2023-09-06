import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation';

export const locales = ['en'] as const;

export const pathnames = {
  '/login': {
    en: '/login',
  },
  '/movies/latest': {
    en: '/movies/latest',
  },
  '/register': {
    en: '/register',
  },
  '/settings/account': {
    en: '/settings/account',
  },
  '/settings/appearance': {
    en: '/settings/appearance',
  },
  '/settings/profile': {
    en: '/settings/profile',
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({ locales, pathnames });
