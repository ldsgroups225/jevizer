'use client'

import type { RegisterInput } from '@/lib/validations/auth'
import MobileLayout from '@/components/layout/MobileLayout'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CustomAppwriteException } from '@/lib/exceptions'
import { registerSchema } from '@/lib/validations/auth'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from 'zod'
import { AppwriteAuthService } from './services/appwrite.service'

export function RegisterView() {
  const [formData, setFormData] = useState<RegisterInput>({
    name: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    email?: string
    password?: string
  }>({})
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
      registerSchema.parse(formData)
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
      await authService.register(formData.email, formData.password, formData.name)
      await authService.sendVerificationEmail()
      setIsSubmitted(true)
    }
    catch (error) {
      if (error instanceof CustomAppwriteException) {
        if (error.type === 'validation_email_invalid') {
          setFieldErrors(prev => ({ ...prev, email: error.message }))
        }
        else if (error.type === 'user_already_exists') {
          setFieldErrors(prev => ({ ...prev, email: error.message }))
        }
        else if (error.type === 'validation_password_weak') {
          setFieldErrors(prev => ({ ...prev, password: error.message }))
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
            <h1 className="text-2xl font-bold">Compte créé avec succès</h1>
            <Alert>
              <AlertDescription>
                Un email de vérification a été envoyé à
                {' '}
                {formData.email}
                . Veuillez cliquer sur le lien dans l'email pour activer votre compte.
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
        <h1 className="text-2xl font-bold mb-6">Créer un compte</h1>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleInputChange}
              className={fieldErrors.name ? 'border-red-500' : ''}
              aria-invalid={!!fieldErrors.name}
              aria-errormessage={fieldErrors.name ? 'name-error' : undefined}
            />
            {fieldErrors.name && (
              <p id="name-error" className="text-red-500 text-sm">{fieldErrors.name}</p>
            )}
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleInputChange}
              className={fieldErrors.password ? 'border-red-500' : ''}
              aria-invalid={!!fieldErrors.password}
              aria-errormessage={fieldErrors.password ? 'password-error' : undefined}
            />
            {fieldErrors.password && (
              <p id="password-error" className="text-red-500 text-sm">{fieldErrors.password}</p>
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
            {loading ? 'Création en cours...' : 'Créer un compte'}
          </Button>

          <div className="text-center mt-2">
            <span className="text-sm text-gray-600">
              Déjà un compte ?
              {' '}
              <Link
                href="/login"
                className="text-primary hover:underline"
              >
                Se connecter
              </Link>
            </span>
          </div>
        </form>
      </div>
    </MobileLayout>
  )
}
