'use client'

import { GoogleIcon } from '@/components/icons'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import '@/lib/utils/string/substring-after-last'

interface AuthCardProps {
  className?: string
  children?: ReactNode
}

interface Scenario {
  title: string
  subtitle: string
  showGoogleButton: boolean
  redirectUrl?: string
  redirectPrompt?: string
  redirectText?: string
}

export const AuthCard: React.FC<AuthCardProps> = ({ className, children }) => {
  const t = useTranslations()
  const scenarioConfigurations: Record<string, Scenario> = {
    login: {
      title: t('LOGIN_TITLE'),
      subtitle: t('LOGIN_SUBTITLE'),
      showGoogleButton: true,
      redirectUrl: '/register',
      redirectPrompt: t('DONT_HAVE_ACCOUNT'),
      redirectText: t('REGISTER_HERE'),
    },
    register: {
      title: t('REGISTER_TITLE'),
      subtitle: t('REGISTER_SUBTITLE'),
      showGoogleButton: false,
      redirectUrl: '/login',
      redirectPrompt: t('HAVE_ACCOUNT'),
      redirectText: t('LOGIN_HERE'),
    },
    'reset-password': {
      title: t('RESET_PASSWORD_TITLE'),
      subtitle: t('RESET_PASSWORD_SUBTITLE'),
      showGoogleButton: false,
    },
    'change-password': {
      title: t('CHANGE_FIELD', { field: t('PASSWORD') }),
      subtitle: t('CHANGE_PASSWORD_SUBTITLE'),
      showGoogleButton: false,
    },
  }

  const pathName = usePathname()
  const supabase = createClientComponentClient()
  const config = scenarioConfigurations[pathName.substringAfterLast('/')]

  async function onGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
  }
  return (
    <Card className={cn('w-4/5 md:w-2/5', className)}>
      <CardHeader>
        <CardTitle className="text-center">{config.title}</CardTitle>
        <CardDescription className="text-center">
          {config.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        {config.showGoogleButton ? (
          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full"
            onClick={onGoogleLogin}
          >
            <GoogleIcon className="me-2 h-5 w-5" />
            {t('CONTINUE_WITH', { with: 'Google' })}
          </Button>
        ) : null}
      </CardContent>
      <CardFooter>
        {config.redirectUrl && config.redirectPrompt && config.redirectText ? (
          <div className="w-full text-center text-sm">
            {config.redirectPrompt}{' '}
            <Link
              href={config.redirectUrl}
              className="text-link font-medium"
            >
              {config.redirectText}
            </Link>
          </div>
        ) : null}
      </CardFooter>
    </Card>
  )
}

AuthCard.displayName = 'AuthCard'

export default AuthCard
