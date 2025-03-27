"use client"

import React from 'react'
import MobileLayout from '@/components/layout/MobileLayout'
import { UserProfile } from './components/UserProfile'

const MOCK_INTERESTS = [
  { id: '1', name: 'Japanese' },
  { id: '2', name: 'English' },
  { id: '3', name: 'Spanish' },
  { id: '4', name: 'Korean' },
]

const MOCK_SAVED_DECKS = [
  {
    id: '1', 
    title: 'N5 Words', 
    tags: ['Japanese'], 
    cards: 500,
  },
  {
    id: '2', 
    title: 'Most Learned Words', 
    tags: ['English'], 
    cards: 200,
  },
  {
    id: '3', 
    title: 'Hiragana N3 Katakana', 
    tags: ['Japanese'], 
    cards: 100,
  },
]

export function ProfileView() {
  return (
    <MobileLayout activeTab="menu">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">My Profile</h1>
        
        <UserProfile 
          name="Sarah"
          username="sarah_mohammad"
          stats={{ studyDays: 69, cards: 1024 }}
          interests={MOCK_INTERESTS}
          savedDecks={MOCK_SAVED_DECKS}
        />
      </div>
    </MobileLayout>
  )
} 
