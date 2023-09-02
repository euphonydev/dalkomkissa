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
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle className='text-center'>{pathName == '/login' ? 'Welcome back!' : 'Create an account'}</CardTitle>
                    <CardDescription className='text-center'>{pathName == '/login' ? 'Enter your details to get sign in to your account' : 'Create an account'}</CardDescription>
                </CardHeader>
                <CardContent>
                    {children}
                    <Button type="button" variant="outline" className="w-full mt-4"><GoogleIcon className='w-5 h-5 me-2' />Continue with Google</Button>
                </CardContent>
                <CardFooter>
                    <div className="w-full text-center text-sm">Need an account? <Link href="/register" className='font-medium underline'>Sign up here</Link></div>
                </CardFooter>
            </Card>
        </div >
    )
}
