import { ResetPasswordView } from '@/features/auth/ResetPasswordView'
import { Suspense } from 'react'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={(
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )}
    >
      <ResetPasswordView />
    </Suspense>
  )
}
