import type { Metadata } from 'next'
import { Navbar } from '@/components/templates/navbar'
import { SettingSidebar } from '@/components/fragments/sidebar/setting'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Settings - Dalkom Kissa',
}

export default async function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login')
    }

    return (
        <Navbar sidebar={SettingSidebar} className='pt-0 md:pt-10'>
            <div className="flex flex-col space-y-4">
                {children}
            </div>
        </Navbar>
    )
}
