import type { Metadata } from 'next'
import { LoginForm } from '@/components/fragments/login-form'

export const metadata: Metadata = {
    title: 'Login - Dalkom Kissa',
}

export default function Page() {
    return (
        <LoginForm />
    )
}