'use client'

import type { PasswordUpdateInput } from '@/lib/validations/auth'
import MobileLayout from '@/components/layout/MobileLayout'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMounted } from '@/hooks/useMounted'
import { CustomAppwriteException } from '@/lib/exceptions'
import { passwordUpdateSchema } from '@/lib/validations/auth'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { AppwriteAuthService } from './services/appwrite.service'

export function ResetPasswordView() {
  const searchParams = useSearchParams()
  const { safeSetState } = useMounted()
  const mountedRef = useRef(true)
  const [formData, setFormData] = useState<PasswordUpdateInput>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
  }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  // Verify the reset token on mount
  useEffect(() => {
    const userId = searchParams.get('userId')
    const secret = searchParams.get('secret')

    if (!userId || !secret) {
      safeSetState(setError, 'Lien de réinitialisation invalide')
      return
    }

    const verifyToken = async () => {
      try {
        const authService = AppwriteAuthService.getInstance()
        await authService.verifyPasswordReset(userId, secret)
      }
      catch (error) {
        if (error instanceof CustomAppwriteException) {
          safeSetState(setError, 'Le lien de réinitialisation est invalide ou a expiré')
        }
        else {
          safeSetState(setError, 'Une erreur est survenue lors de la vérification du lien')
        }
        console.error(error)
      }
    }

    void verifyToken()
  }, [searchParams, safeSetState])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    try {
      passwordUpdateSchema.parse(formData)
      setFieldErrors({})
      return true
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        const errors: typeof fieldErrors = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof typeof fieldErrors] = err.message
          }
        })
        setFieldErrors(errors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      setError(null)
      setFieldErrors({})

      const userId = searchParams.get('userId')
      const secret = searchParams.get('secret')

      if (!userId || !secret) {
        setError('Lien de réinitialisation invalide')
        return
      }

      const authService = AppwriteAuthService.getInstance()
      await authService.completePasswordReset(userId, secret, formData.newPassword)
      setIsSubmitted(true)
    }
    catch (error) {
      if (error instanceof CustomAppwriteException) {
        if (error.type === 'validation_password_weak') {
          setFieldErrors(prev => ({ ...prev, newPassword: error.message }))
        }
        else {
          setError(error.message)
        }
      }
      else {
        setError('Une erreur inattendue est survenue')
      }
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <MobileLayout bodyClassName="bg-white">
        <div className="flex flex-col items-center justify-center h-full p-6">
          <div className="text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-2xl font-bold">Mot de passe réinitialisé</h1>
            <Alert>
              <AlertDescription>
                Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
              </AlertDescription>
            </Alert>
            <Link
              href="/login"
              className="text-primary hover:underline block mt-4"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout bodyClassName="bg-white">
      <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold mb-6">Réinitialiser le mot de passe</h1>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Nouveau mot de passe"
              value={formData.newPassword}
              onChange={handleInputChange}
              className={fieldErrors.newPassword ? 'border-red-500' : ''}
              aria-invalid={!!fieldErrors.newPassword}
              aria-errormessage={fieldErrors.newPassword ? 'newPassword-error' : undefined}
            />
            {fieldErrors.newPassword && (
              <p id="newPassword-error" className="text-red-500 text-sm">{fieldErrors.newPassword}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={fieldErrors.confirmPassword ? 'border-red-500' : ''}
              aria-invalid={!!fieldErrors.confirmPassword}
              aria-errormessage={fieldErrors.confirmPassword ? 'confirmPassword-error' : undefined}
            />
            {fieldErrors.confirmPassword && (
              <p id="confirmPassword-error" className="text-red-500 text-sm">{fieldErrors.confirmPassword}</p>
            )}
          </div>

          {error && (
            <div role="alert" className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={loading}
          >
            {loading ? 'Réinitialisation en cours...' : 'Réinitialiser le mot de passe'}
          </Button>

          <div className="text-center mt-2">
            <Link
              href="/login"
              className="text-sm text-primary hover:underline"
            >
              Retour à la connexion
            </Link>
          </div>
        </form>
      </div>
    </MobileLayout>
  )
}
