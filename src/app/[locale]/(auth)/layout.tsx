import AuthCard from '@/components/fragments/auth-card'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
        redirect('/')
    }

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <AuthCard>
                {children}
            </AuthCard>
        </div >
    )
}
