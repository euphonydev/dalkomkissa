

import * as React from "react"
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

type Props = {
    children: React.ReactNode,
    redirectTo?: string
}

export async function RequireAuth({ children, redirectTo = '/login' }: Props) {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        redirect(redirectTo)
    }
    return <>{children}</>
}
