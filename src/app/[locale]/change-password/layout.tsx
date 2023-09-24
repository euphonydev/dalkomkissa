import AuthCard from '@/components/fragments/auth-card'
import { RequireAuth } from '@/contexts/require-auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Change Password - Dalkom Kissa',
}

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <RequireAuth>
            <div className="flex flex-col items-center justify-center w-full min-h-screen">
                <AuthCard>
                    {children}
                </AuthCard>
            </div >
        </RequireAuth>
    )
}
