import { account } from '@/lib/appwrite'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    // Check if user is already logged in
    const user = await account.get()

    // If user is authenticated, redirect to dashboard
    if (user) {
      redirect('/')
    }
  }
  catch {
    // User is not authenticated, allow access to auth pages
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
