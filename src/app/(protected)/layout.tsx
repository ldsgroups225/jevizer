import { account } from '@/lib/appwrite'
import { redirect } from 'next/navigation'

async function checkAuth() {
  try {
    const session = await account.get()

    if (!session || !session.$id) {
      redirect('/login')
    }
  }
  catch {
    redirect('/login')
  }
}
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await checkAuth()

  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
