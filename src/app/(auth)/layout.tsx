'use client'

import '@/app/globals.css'
import { usePathname } from 'next/navigation'
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
    return (
        <div className="flex min-h-screen flex-col items-center justify-center w-full">
            <Card className='w-3/5 md:1/2'>
                <CardHeader>
                    <CardTitle className='text-center'>{pathName == '/login' ? 'Welcome back!' : 'Let\'s get started'}</CardTitle>
                    <CardDescription className='text-center'>{pathName == '/login' ? 'Login to your account and stay connected.' : 'Relax, have fun, and enjoy the experience.'}</CardDescription>
                </CardHeader>
                <CardContent>
                    {children}
                    <Button type="button" variant="outline" className="w-full mt-4"><GoogleIcon className='w-5 h-5 me-2' />Continue with Google</Button>
                </CardContent>
                <CardFooter>
                    {pathName == '/login' ? (
                        <div className="w-full text-center text-sm">Need an account? <Link href="/register" className='font-medium underline'>Register here</Link></div>
                    ) : (
                        <div className="w-full text-center text-sm">Already have an account? <Link href="/login" className='font-medium underline'>Login here</Link></div>
                    )}
                </CardFooter>
            </Card>
        </div >
    )
}
