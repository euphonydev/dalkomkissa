import type { Metadata } from 'next'
import React from 'react'
import { SettingSidebar } from '@/components/fragments/sidebar/setting'
import { Navbar } from '@/components/templates/navbar'

export const metadata: Metadata = {
  title: 'Settings - Dalkom Kissa',
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Navbar
      sidebar={SettingSidebar}
      className="pt-0 md:pt-10"
    >
      <div className="flex flex-col space-y-4">{children}</div>
    </Navbar>
  )
}
