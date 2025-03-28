// src/features/profile/ProfileView.tsx
'use client'

import type { IInterest, ISavedDeck, IStudyGoal } from '@/types'

import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { UserProfile } from './components/UserProfile'

// Données simulées - à remplacer par une vraie récupération de données
const MOCK_INTERESTS: IInterest[] = [
  { id: '1', name: 'Japonais', icon: '🇯🇵' },
  { id: '2', name: 'Anglais', icon: '🇺🇸' },
  { id: '3', name: 'Allemand', icon: '🇩🇪' },
  // Add more if needed based on design, or handle dynamically
]

const MOCK_SAVED_DECKS: ISavedDeck[] = [
  { id: 's1', title: 'N3 Mots - Japonais', downloads: 2639, rating: 342, cards: 2106, time: 1200 },
  { id: 's2', title: 'Mots les Plus Connus', downloads: 2639, rating: 342, cards: 2106, time: 1200 },
  { id: 's3', title: 'Hiragana et Katakana', downloads: 2639, rating: 342, cards: 2106, time: 1200 },
  { id: 's4', title: 'Hiragana et Katakana', downloads: 2639, rating: 342, cards: 2106, time: 1200 }, // Duplicate example
]

const MOCK_STUDY_GOAL: IStudyGoal = { current: 643, total: 1000, percentage: 64 }

export function ProfileView() {
  const router = useRouter()
  const goBack = () => router.replace('/menu')

  return (
    // Use white background for profile content
    <MobileLayout activeTab="menu" bodyClassName="bg-white">
      <div className="p-4">
        {/* Header */}
        <header className="flex items-center mb-4 -ml-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Mon Profil</h1>
        </header>

        <UserProfile
          name="Sarah"
          email="Sarahmohamed23@Gamil.Com"
          avatarUrl="/avatar-placeholder.png"
          studyGoal={MOCK_STUDY_GOAL}
          interests={MOCK_INTERESTS}
          savedDecks={MOCK_SAVED_DECKS}
        />
      </div>
    </MobileLayout>
  )
}
