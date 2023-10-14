import { getCurrentSession } from '@/services/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import AuthCard from '@/components/fragments/auth-card'
import { supabase } from '@/lib/supabase/clients/server-component-client'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getCurrentSession(supabase)

  if (session) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <AuthCard>{children}</AuthCard>
    </div>
  )
}
