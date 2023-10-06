import type { Metadata } from 'next'
import React from 'react'
import { DashboardSidebar } from '@/components/fragments/sidebar/dashboard'
import { Navbar } from '@/components/templates/navbar'

export const metadata: Metadata = {
  title: 'Dashboard - Dalkom Kissa',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Navbar
      sidebar={DashboardSidebar}
      className="pt-0 md:pt-10"
    >
      <div className="flex flex-col space-y-4">{children}</div>
    </Navbar>
  )
}
