import type { Metadata } from 'next'
import { RegisterForm } from '@/components/fragments/register-form'

export const metadata: Metadata = {
    title: 'Register - Dalkom Kissa',
}

export default function Page() {
    return (
        <RegisterForm />
    )
}