import type { Metadata } from 'next'
import React from 'react'
import { DashboardSidebar } from '@/components/fragments/sidebar/dashboard'
import MobileDashboardSidebar from '@/components/fragments/sidebar/mobile/dashboard'
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
      mobileSidebar={MobileDashboardSidebar}
    >
      <div className="flex flex-col space-y-4">{children}</div>
    </Navbar>
  )
}
