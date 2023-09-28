import type { Metadata } from 'next'
import { ResetPasswordForm } from '@/components/fragments/form/reset-password'

export const metadata: Metadata = {
  title: 'Forgot Password - Dalkom Kissa',
}

export default function Page() {
  return <ResetPasswordForm />
}
