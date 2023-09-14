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

export const AuthCard: React.FC<AuthCardProps> = ({ className, children }) => {
    const t = useTranslations()
    const pathName = usePathname()
    const supabase = createClientComponentClient()

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
                <CardTitle className='text-center'>{pathName.substringAfterLast('/') == 'login' ? t('LOGIN_TITLE') : t('REGISTER_TITLE')}</CardTitle>
                <CardDescription className='text-center'>{pathName.substringAfterLast('/') == 'login' ? t('LOGIN_SUBTITLE') : t('REGISTER_SUBTITLE')}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
                <Button type="button" variant="outline" className="w-full mt-4" onClick={onGoogleLogin}><GoogleIcon className='w-5 h-5 me-2' />{t('CONTINUE_WITH', { with: 'Google' })}</Button>
            </CardContent>
            <CardFooter>
                {pathName.substringAfterLast('/') == 'login' ? (
                    <div className="w-full text-sm text-center">{t('DONT_HAVE_ACCOUNT')} <Link href="/register" className='font-medium text-link'>{t('REGISTER_HERE')}</Link></div>
                ) : (
                    <div className="w-full text-sm text-center">{t('HAVE_ACCOUNT')} <Link href="/login" className='font-medium text-link'>{t('LOGIN_HERE')}</Link></div>
                )}
            </CardFooter>
        </Card>
    )
}

AuthCard.displayName = "AuthCard"

export default AuthCard