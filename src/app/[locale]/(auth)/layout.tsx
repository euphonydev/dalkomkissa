import { getCurrentSession } from '@/services/auth'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import AuthCard from '@/components/fragments/auth-card'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({
    cookies,
  })
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
