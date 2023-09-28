import React from 'react'
import MainSidebar from '@/components/fragments/sidebar/main'
import { Navbar } from '@/components/templates/navbar'

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Navbar sidebar={MainSidebar}>{children}</Navbar>
}
