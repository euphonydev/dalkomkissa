import type { Metadata } from 'next'
import { Navbar } from "@/components/templates/navbar"
import { SettingSidebar } from "@/components/fragments/sidebar/setting"

export const metadata: Metadata = {
    title: 'Settings - Dalkom Kissa',
}

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Navbar sidebar={SettingSidebar} className='pt-0 md:pt-10'>
            {children}
        </Navbar>
    )
}
