'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Camera, ChevronLeft, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export function EditProfileView() {
  const router = useRouter()
  const goBack = () => router.replace('/profile')

  const [formData, setFormData] = useState({
    name: 'Sarah Mohamed',
    email: 'sarah.mohamed@exemple.com',
    bio: 'J\'apprends le japonais et l\'espagnol',
    avatarUrl: '/avatar-placeholder.png',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Dans une vraie application, sauvegarder les données vers le backend
    // Pour l'instant, retourner simplement au profil
    goBack()
  }

  return (
    <MobileLayout bodyClassName="bg-white">
      <div className="flex flex-col h-full">
        <header className="flex items-center px-2 py-3 border-b border-gray-100">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="flex-1 text-center text-base font-medium">Modifier le Profil</h1>
          <div className="w-10" />
        </header>
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="flex flex-col items-center">
            <div className="relative group mb-4">
              <Avatar className="h-24 w-24 border-2 border-white shadow">
                <AvatarImage src={formData.avatarUrl} alt={formData.name} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-white rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-6 w-full mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Votre nom" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Votre email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Parlez-nous de vous"
                  className="resize-none h-24"
                />
              </div>
            </div>
          </div>
          <div className="py-4 px-6 border-t">
            <Button className="w-full" onClick={handleSave}>Enregistrer les modifications</Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
