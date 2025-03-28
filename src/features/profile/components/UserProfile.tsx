// src/features/profile/components/UserProfile.tsx
'use client'

import type { Interest, SavedDeck, StudyGoal } from '@/types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress' // Use Progress
import { BookOpen, Clock, Download, Edit, Star } from 'lucide-react' // Added icons
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface UserProfileProps {
  name: string
  email: string
  avatarUrl?: string
  studyGoal: StudyGoal
  interests: Interest[]
  savedDecks: SavedDeck[]
}

export function UserProfile({
  name,
  email,
  avatarUrl,
  studyGoal,
  interests,
  savedDecks,
}: UserProfileProps) {
  const router = useRouter()
  const goToEditProfile = () => router.push('/profile/edit')
  const goToInterests = () => router.push('/interests/category')

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Informations Utilisateur */}
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="text-xl">{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">
            Bonjour,
            {' '}
            {name}
          </h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground"
          onClick={goToEditProfile}
        >
          <Edit className="h-5 w-5" />
        </Button>
      </div>

      {/* Progression d'Étude */}
      <Card className="bg-white rounded-xl p-0 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium">
              {studyGoal.total}
              {' '}
              cartes
            </p>
            <p className="text-xs text-gray-500">
              {studyGoal.percentage}
              % pour finir, continuez comme ça !
            </p>
          </div>
          <Progress value={studyGoal.percentage} className="h-2" />
          <p className="text-right text-xs text-gray-500 mt-1">
            {studyGoal.current}
            {' '}
            cartes
          </p>
        </CardContent>
      </Card>

      {/* Centres d'Intérêt */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-semibold">Vos Centres d'Intérêt</h3>
          <Button
            size="icon"
            variant="ghost"
            className="text-gray-500 w-7 h-7"
            onClick={goToInterests}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {' '}
          {/* Changed to 3 columns */}
          {interests.map(interest => (
            <Card key={interest.id} className="flex flex-col items-center p-3 bg-white border-gray-200 shadow-sm h-24 justify-center">
              {/* Icon Placeholder */}
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2 text-xl">
                {interest.icon || '🎯'}
              </div>
              <span className="text-xs text-center text-gray-700">{interest.name}</span>
            </Card>
          ))}
        </div>
      </div>

      {/* Paquets Sauvegardés */}
      <div>
        <h3 className="text-base font-semibold mb-3">Sauvegardés</h3>
        <div className="space-y-3">
          {savedDecks.map(deck => (
            <Card key={deck.id} className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <Image
                    src={deck.iconUrl || '/placeholder-deck.png'}
                    alt={deck.title}
                    width={48}
                    height={48}
                    className="rounded bg-gray-100 object-cover mt-1 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base mb-1">{deck.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Download className="w-3 h-3 mr-1" />
                        {deck.downloads}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        {deck.rating}
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {deck.cards}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {deck.time}
                      </span>
                      {' '}
                      {/* Adjust unit display */}
                    </div>
                  </div>
                  <Button size="sm" className="ml-auto mt-1 h-8 px-3">Voir Plus</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
