import { VerifyEmailView } from '@/features/auth/VerifyEmailView'
import { Suspense } from 'react'

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={(
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )}
    >
      <VerifyEmailView />
    </Suspense>
  )
}
