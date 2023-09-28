import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import * as React from 'react'
import type { Database } from '@/lib/database.types'

type Props = {
  children: React.ReactNode
  redirectTo?: string
  checkAdmin?: boolean
}

export async function RequireAuth({
  children,
  redirectTo = '/login',
  checkAdmin = false,
}: Props) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect(redirectTo)
  }

  if (checkAdmin) {
    const { data } = await supabase.rpc('get_my_claim', {
      claim: 'userrole',
    })
    if (data !== 'webadmin') {
      redirect(redirectTo)
    }
  }

  return <>{children}</>
}
