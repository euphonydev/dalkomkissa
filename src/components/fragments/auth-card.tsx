'use client'

import { GoogleIcon } from '@/components/icons'
import { signInWithGoogle } from '@/services/auth'
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
import { supabase } from '@/lib/supabase/clients/client-component-client'
import { cn } from '@/lib/utils'
import { substringAfterLast } from '@/lib/utils/string'

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
      title: t('login_title'),
      subtitle: t('login_subtitle'),
      showGoogleButton: true,
      redirectUrl: '/register',
      redirectPrompt: t('dont_have_account'),
      redirectText: t('register_here'),
    },
    register: {
      title: t('register_title'),
      subtitle: t('register_subtitle'),
      showGoogleButton: false,
      redirectUrl: '/login',
      redirectPrompt: t('have_account'),
      redirectText: t('login_here'),
    },
    'reset-password': {
      title: t('reset_password_title'),
      subtitle: t('reset_password_subtitle'),
      showGoogleButton: false,
    },
    'change-password': {
      title: t('change_field', { field: t('password') }),
      subtitle: t('change_password_subtitle'),
      showGoogleButton: false,
    },
  }

  const pathName = usePathname()
  const config = scenarioConfigurations[substringAfterLast(pathName, '/')]

  async function onGoogleLogin() {
    await signInWithGoogle(supabase)
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
            {t('continue_with', { with: 'Google' })}
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
