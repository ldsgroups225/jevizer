'use client'

import type { LoginInput } from '@/lib/validations/auth'
import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CustomAppwriteException } from '@/lib/exceptions'
import { loginSchema } from '@/lib/validations/auth'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { z } from 'zod'
import { AppwriteAuthService } from './services/appwrite.service'

export function LoginView() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string
    password?: string
  }>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    try {
      loginSchema.parse(formData)
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

  const handleLogin = async () => {
    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      setError(null)
      setFieldErrors({})
      const authService = AppwriteAuthService.getInstance()
      await authService.login(formData.email, formData.password)
      router.push('/')
    }
    catch (error) {
      if (error instanceof CustomAppwriteException) {
        // Handle specific field errors
        if (error.type === 'validation_email_invalid') {
          setFieldErrors(prev => ({ ...prev, email: error.message }))
        }
        else if (error.type === 'user_invalid_credentials') {
          setError(error.message)
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    void handleLogin()
  }

  return (
    <MobileLayout bodyClassName="bg-white">
      <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold mb-6">Connexion à Jeviz</h1>

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
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>

          <div className="text-center mt-4">
            <a href="/forgot-password" className="text-sm text-primary hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          <div className="text-center mt-2">
            <span className="text-sm text-gray-600">
              Pas encore de compte ?
              {' '}
              <a
                href="/register"
                className="text-primary hover:underline"
              >
                S'inscrire
              </a>
            </span>
          </div>
        </form>
      </div>
    </MobileLayout>
  )
}
