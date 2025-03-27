// src/features/profile/ProfileView.tsx
'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { UserProfile } from './components/UserProfile'

// Mock data - replace with actual data fetching
const MOCK_INTERESTS = [
  { id: '1', name: 'Japanese', icon: '🇯🇵' },
  { id: '2', name: 'English', icon: '🇺🇸' },
  { id: '3', name: 'German', icon: '🇩🇪' },
  // Add more if needed based on design, or handle dynamically
]

const MOCK_SAVED_DECKS = [
  { id: 's1', title: 'N3 Words - Japanese', downloads: 2639, rating: 342, cards: 2106, time: 1200 },
  { id: 's2', title: 'Most Known Words', downloads: 2639, rating: 342, cards: 2106, time: 1200 },
  { id: 's3', title: 'Hiragana And Katakana', downloads: 2639, rating: 342, cards: 2106, time: 1200 },
  { id: 's4', title: 'Hiragana And Katakana', downloads: 2639, rating: 342, cards: 2106, time: 1200 }, // Duplicate example
]

export function ProfileView() {
  return (
    // Use white background for profile content
    <MobileLayout activeTab="menu" bodyClassName="bg-white">
      <div className="p-4">
        {/* Header */}
        <header className="flex items-center mb-4 -ml-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">My Profile</h1>
        </header>

        <UserProfile
          name="Sarah"
          email="Sarahmohamed23@Gamil.Com"
          avatarUrl="/avatar-placeholder.png"
          studyGoal={{ current: 643, total: 1000, percentage: 64 }} // Example goal data
          interests={MOCK_INTERESTS}
          savedDecks={MOCK_SAVED_DECKS}
        />
      </div>
    </MobileLayout>
  )
}
