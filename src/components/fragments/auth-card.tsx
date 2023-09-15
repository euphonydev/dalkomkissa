'use client'
import Link from "next/link"
import { ReactNode } from "react"
import { useTranslations } from "next-intl"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import '@/lib/utils/string/substring-after-last'
import { usePathname, redirect } from 'next/navigation';
import { cn } from '@/lib/utils'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { GoogleIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface AuthCardProps {
    className?: string;
    children?: ReactNode;
}

interface Scenario {
    title: string;
    subtitle: string;
    showGoogleButton: boolean;
    redirectUrl?: string;
    redirectPrompt?: string;
    redirectText?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({ className, children }) => {
    const t = useTranslations()
    const scenarioConfigurations: Record<string, Scenario> = {
        "login": {
            title: t('LOGIN_TITLE'),
            subtitle: t('LOGIN_SUBTITLE'),
            showGoogleButton: true,
            redirectUrl: '/register',
            redirectPrompt: t('DONT_HAVE_ACCOUNT'),
            redirectText: t('REGISTER_HERE'),
        },
        "register": {
            title: t('REGISTER_TITLE'),
            subtitle: t('REGISTER_SUBTITLE'),
            showGoogleButton: false,
            redirectUrl: '/login',
            redirectPrompt: t('HAVE_ACCOUNT'),
            redirectText: t('LOGIN_HERE'),
        },
        "reset-password": {
            title: t('RESET_PASSWORD_TITLE'),
            subtitle: t('RESET_PASSWORD_SUBTITLE'),
            showGoogleButton: false,
        },
        "change-password": {
            title: t('CHANGE_FIELD', { field: t('PASSWORD') }),
            subtitle: t('CHANGE_PASSWORD_SUBTITLE'),
            showGoogleButton: false,
        }
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
                }
            }
        })
    }
    return (
        <Card className={cn("w-4/5 md:w-2/5", className)}>
            <CardHeader>
                <CardTitle className='text-center'>{config.title}</CardTitle>
                <CardDescription className='text-center'>{config.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
                {config.showGoogleButton ? <Button type="button" variant="outline" className="w-full mt-4" onClick={onGoogleLogin}><GoogleIcon className='w-5 h-5 me-2' />{t('CONTINUE_WITH', { with: 'Google' })}</Button> : null}
            </CardContent>
            <CardFooter>
                {config.redirectUrl && config.redirectPrompt && config.redirectText ? (
                    <div className="w-full text-sm text-center">{config.redirectPrompt} <Link href={config.redirectUrl} className='font-medium text-link'>{config.redirectText}</Link></div>
                ) : null}
            </CardFooter>
        </Card>
    )
}

AuthCard.displayName = "AuthCard"

export default AuthCard