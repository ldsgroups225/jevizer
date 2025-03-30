import { AppwriteAuthService } from '@/features/auth/services/appwrite.service'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function useLogout() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const logout = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const authService = AppwriteAuthService.getInstance()
      await authService.logout()
      router.push('/login')
      router.refresh()
    }
    catch (error) {
      console.error('Logout error:', error)
      setError('Une erreur est survenue lors de la déconnexion')
    }
    finally {
      setIsLoading(false)
    }
  }

  return {
    logout,
    isLoading,
    error,
  }
}
