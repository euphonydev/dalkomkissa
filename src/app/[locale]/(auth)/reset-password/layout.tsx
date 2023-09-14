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
    const error = useSearchParams().get('error')
    const router = useRouter()

    if (error) {
        router.push('/')
    }

    return (
        <div className="flex flex-col items-center justify-center w-4/5 md:w-2/5 mx-auto min-h-screen">
            {children}
        </div >
    )
}
