'use client'

import type { PasswordResetInput } from '@/lib/validations/auth'
import MobileLayout from '@/components/layout/MobileLayout'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CustomAppwriteException } from '@/lib/exceptions'
import { passwordResetSchema } from '@/lib/validations/auth'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from 'zod'
import { AppwriteAuthService } from './services/appwrite.service'

export function ForgotPasswordView() {
  const [formData, setFormData] = useState<PasswordResetInput>({ email: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    try {
      passwordResetSchema.parse(formData)
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
      const authService = AppwriteAuthService.getInstance()
      await authService.requestPasswordRecovery(formData.email)
      setIsSubmitted(true)
    }
    catch (error) {
      if (error instanceof CustomAppwriteException) {
        if (error.type === 'validation_email_invalid') {
          setFieldErrors({ email: error.message })
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
            <h1 className="text-2xl font-bold">Email envoyé</h1>
            <Alert>
              <AlertDescription>
                Si un compte existe avec cette adresse email, vous recevrez un lien pour réinitialiser votre mot de passe.
              </AlertDescription>
            </Alert>
            <Link
              href="/login"
              className="text-primary hover:underline block mt-4"
            >
              Retour à la connexion
            </Link>
          </div>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout bodyClassName="bg-white">
      <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold mb-2">Mot de passe oublié</h1>
        <p className="text-gray-600 text-center mb-6">
          Entrez votre email et nous vous enverrons les instructions pour réinitialiser votre mot de passe
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Adresse email"
              value={formData.email}
              onChange={handleInputChange}
              className={fieldErrors.email ? 'border-red-500' : ''}
              aria-invalid={!!fieldErrors.email}
              aria-errormessage={fieldErrors.email ? 'email-error' : undefined}
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-red-500 text-sm">{fieldErrors.email}</p>
            )}
          </div>

          {error && (
            <div role="alert" className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
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
