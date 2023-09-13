'use client'
import Link from "next/link"
import { ReactNode } from "react"
import { useTranslations } from "next-intl"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import '@/lib/utils/string/substring-after-last'
import { usePathname } from "next/navigation"
import { cn } from '@/lib/utils'

interface AuthCardProps {
    className?: string;
    children?: ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ className, children }) => {
    const t = useTranslations()
    const pathName = usePathname()
    return (
        <Card className={cn("w-4/5 md:w-2/5", className)}>
            <CardHeader>
                <CardTitle className='text-center'>{pathName.substringAfterLast('/') == 'login' ? t('LOGIN_TITLE') : t('REGISTER_TITLE')}</CardTitle>
                <CardDescription className='text-center'>{pathName.substringAfterLast('/') == 'login' ? t('LOGIN_SUBTITLE') : t('REGISTER_SUBTITLE')}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
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