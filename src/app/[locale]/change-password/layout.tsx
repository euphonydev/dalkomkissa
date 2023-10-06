import type { Metadata } from 'next'
import React from 'react'
import AuthCard from '@/components/fragments/auth-card'

export const metadata: Metadata = {
  title: 'Change Password - Dalkom Kissa',
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <AuthCard>{children}</AuthCard>
    </div>
  )
}
