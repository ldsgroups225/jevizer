'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import React from 'react'

export function LoginView() {
  const router = useRouter()

  const handleLogin = () => {
    // In a real app, we would handle authentication here
    // For now, just navigate to the home page
    router.push('/')
  }

  return (
    <MobileLayout bodyClassName="bg-white">
      <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold mb-6">Login to Jeviz</h1>

        <div className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email address" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password" />
          </div>

          <Button className="w-full mt-4" onClick={handleLogin}>Sign In</Button>

          <div className="text-center mt-4">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="text-center mt-2">
            <span className="text-sm text-gray-600">
              Don't have an account?
              {' '}
              <a href="#" className="text-primary hover:underline">
                Sign up
              </a>
            </span>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
