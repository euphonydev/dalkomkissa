'use client'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl';
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GoogleIcon } from '@/components/icons'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathName = usePathname()
    const t = useTranslations();
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <Card className='w-3/5 md:w-2/5'>
                <CardHeader>
                    <CardTitle className='text-center'>{pathName == '/login' ? t('LOGIN_TITLE') : t('REGISTER_TITLE')}</CardTitle>
                    <CardDescription className='text-center'>{pathName == '/login' ? t('LOGIN_SUBTITLE') : t('REGISTER_SUBTITLE')}</CardDescription>
                </CardHeader>
                <CardContent>
                    {children}
                    <Button type="button" variant="outline" className="w-full mt-4"><GoogleIcon className='w-5 h-5 me-2' />{t('CONTINUE_WITH', { with: 'Google' })}</Button>
                </CardContent>
                <CardFooter>
                    {pathName == '/login' ? (
                        <div className="w-full text-sm text-center">{t('DONT_HAVE_ACCOUNT')} <Link href="/register" className='font-medium text-link'>{t('REGISTER_HERE')}</Link></div>
                    ) : (
                        <div className="w-full text-sm text-center">{t('HAVE_ACCOUNT')} <Link href="/login" className='font-medium text-link'>{t('LOGIN_HERE')}</Link></div>
                    )}
                </CardFooter>
            </Card>
        </div >
    )
}
