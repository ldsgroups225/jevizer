'use client'
import type { FormEvent } from 'react'
import MobileLayout from '@/components/layout/MobileLayout'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function ForgotPasswordView() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim())
      return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }
  return (
    <MobileLayout bodyClassName="bg-white">
      {' '}
      <div className="flex flex-col items-center justify-center h-full p-6">
        {' '}
        <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
        {' '}
        <p className="text-gray-600 text-center mb-6"> Enter your email and we will send you instructions to reset your password </p>
        {isSubmitted
          ? (
              <div className="w-full space-y-6">
                {' '}
                <Alert className="bg-green-50 border-green-100">
                  {' '}
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  {' '}
                  <AlertDescription className="text-green-700"> If an account exists with this email, you will receive password reset instructions. </AlertDescription>
                  {' '}
                </Alert>
                {' '}
                <Button className="w-full" onClick={() => router.push('/login')}> Back to Login </Button>
                {' '}
              </div>
            )
          : (
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                {' '}
                <div className="space-y-2">
                  {' '}
                  <Label htmlFor="email">Email</Label>
                  {' '}
                  <Input id="email" type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} required />
                  {' '}
                </div>
                {' '}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {' '}
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                  {' '}
                </Button>
                <div className="text-center mt-4">
                  {' '}
                  <Link href="/login" className="text-sm text-primary hover:underline"> Back to Login </Link>
                  {' '}
                </div>
              </form>
            )}
      </div>
      {' '}

    </MobileLayout>
  )
}
