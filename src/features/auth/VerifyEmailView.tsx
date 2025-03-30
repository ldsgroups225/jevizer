'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useMounted } from '@/hooks/useMounted'
import { CustomAppwriteException } from '@/lib/exceptions'
import { CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AppwriteAuthService } from './services/appwrite.service'

export function VerifyEmailView() {
  const searchParams = useSearchParams()
  const { safeSetState } = useMounted()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const userId = searchParams.get('userId')
    const secret = searchParams.get('secret')

    const handleError = (message: string) => {
      safeSetState(setStatus, 'error')
      safeSetState(setError, message)
    }

    if (!userId || !secret) {
      handleError('Lien de vérification invalide')
      return
    }

    const verifyEmail = async () => {
      try {
        const authService = AppwriteAuthService.getInstance()
        await authService.completeEmailVerification(userId, secret)
        safeSetState(setStatus, 'success')
      }
      catch (error) {
        if (error instanceof CustomAppwriteException) {
          handleError('Le lien de vérification est invalide ou a expiré')
        }
        else {
          handleError('Une erreur est survenue lors de la vérification de l\'email')
        }
        console.error(error)
      }
    }

    void verifyEmail()
  }, [searchParams, safeSetState])

  return (
    <MobileLayout bodyClassName="bg-white">
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="text-center space-y-4">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto" />
              <h1 className="text-2xl font-bold">Vérification en cours...</h1>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <h1 className="text-2xl font-bold">Email vérifié</h1>
              <Alert>
                <AlertDescription>
                  Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant vous connecter à votre compte.
                </AlertDescription>
              </Alert>
              <Link
                href="/login"
                className="text-primary hover:underline block mt-4"
              >
                Se connecter
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
              <h1 className="text-2xl font-bold">Erreur de vérification</h1>
              <Alert>
                <AlertDescription>
                  {error || 'Une erreur est survenue lors de la vérification de votre email'}
                </AlertDescription>
              </Alert>
              <Link
                href="/login"
                className="text-primary hover:underline block mt-4"
              >
                Retour à la connexion
              </Link>
            </>
          )}
        </div>
      </div>
    </MobileLayout>
  )
}
