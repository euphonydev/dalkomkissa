'use client'
import { useEffect } from 'react'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ResetPasswordLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createClientComponentClient()
    const code = useSearchParams().get('code')
    const router = useRouter()
    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

    useEffect(() => {
        async function checkCode() {
            if (code && regex.test(code)) {
                const { data: { session } } = await supabase.auth.getSession()
                if (!session) {
                    router.push('/')
                }
            } else {
                router.push('/')
            }
        }
        checkCode()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-4/5 md:w-2/5 mx-auto min-h-screen">
            {children}
        </div >
    )
}
