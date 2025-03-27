"use client"

import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import MobileLayout from '@/components/layout/MobileLayout'
import { SearchResults } from './components/SearchResults'

const MOCK_CATEGORIES = [
  { id: '1', name: 'Language' },
  { id: '2', name: 'Math' },
  { id: '3', name: 'Chemistry' },
  { id: '4', name: 'Physics' },
  { id: '5', name: 'History' },
  { id: '6', name: 'Geography' },
  { id: '7', name: 'Biology' },
  { id: '8', name: 'Arts' },
]

const MOCK_POPULAR_DECKS = [
  {
    id: '1',
    title: 'Japanese Kanji N5',
    tags: ['Japanese', 'Beginner'],
    cards: 240,
    level: 'Beginner',
  },
  {
    id: '2',
    title: 'Learn Japanese From Anime',
    tags: ['Japanese', 'Intermediate'],
    cards: 150,
    level: 'Intermediate',
  },
  {
    id: '3',
    title: '1000 English Words',
    tags: ['English', 'Vocabulary'],
    cards: 1000,
    level: 'All Levels',
  },
]

export function SearchView() {
  return (
    <MobileLayout activeTab="search">
      <div className="p-4">
        <div className="relative mb-4">
          <Input 
            placeholder="Search..." 
            className="pl-10 pr-3 py-2 bg-white border-gray-200"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        <SearchResults 
          searchTerm=""
          categories={MOCK_CATEGORIES}
          popularDecks={MOCK_POPULAR_DECKS}
        />
      </div>
    </MobileLayout>
  )
} 
