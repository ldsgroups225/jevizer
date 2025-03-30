import type { Models } from 'appwrite'
import { account, AppwriteException } from '@/lib/appwrite'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
  const [loading, setLoading] = useState(true)

  const checkUser = useCallback(async () => {
    try {
      const currentUser = await account.get()
      setUser(currentUser)
    }
    catch {
      setUser(null)
    }
    finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkUser()
  }, [checkUser])

  const login = async (email: string, password: string) => {
    try {
      await account.createSession(email, password)
      await checkUser()
      router.push('/decks')
    }
    catch (error) {
      if (error instanceof AppwriteException) {
        throw error
      }
      throw new Error('Failed to login')
    }
  }

  const logout = async () => {
    try {
      await account.deleteSession('current')
      setUser(null)
      router.push('/login')
    }
    catch (error) {
      console.error('Failed to logout:', error)
    }
  }

  return {
    user,
    loading,
    login,
    logout,
    checkUser,
  }
}
