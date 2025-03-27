"use client"

import React from 'react'
import { Search, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DeckList } from './components/DeckList'
import MobileLayout from '@/components/layout/MobileLayout'

const MOCK_DECKS = [
  {
    id: '1',
    title: 'Japanese Kanji N5',
    tags: ['Beginner', 'Japanese', 'Hiragana'],
    progress: 70,
  },
  {
    id: '2',
    title: '1000 English Words',
    tags: ['English', 'Vocabulary'],
    progress: 48,
  },
  {
    id: '3',
    title: 'Daily English Words',
    tags: ['English', 'Beginner'],
    progress: 35,
  }
]

const IMPORTED_DECKS = [
  {
    id: '4',
    title: 'Learn German From Movie',
    tags: ['German', 'Intermediate'],
    progress: 20,
  }
]

export function HomeView() {
  return (
    <MobileLayout activeTab="home">
      <div className="p-4">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Anki</h1>
          <div className="relative w-full max-w-xs ml-4">
            <Input 
              placeholder="Search..." 
              className="pl-8 pr-3 py-1 h-9 bg-gray-100 border-gray-200"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </header>
        
        <div className="mb-4">
          <h2 className="text-md font-medium mb-2">My Latest Review</h2>
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="font-medium">Japanese Kanji N5</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                  Beginner
                </span>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                  Japanese
                </span>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                  Hiragana
                </span>
              </div>
            </div>
            
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center relative">
              <svg className="w-12 h-12 absolute">
                <circle
                  className="text-gray-200"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="20"
                  cx="24"
                  cy="24"
                />
                <circle
                  className="text-blue-500"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="20"
                  cx="24"
                  cy="24"
                  strokeDasharray="88 126"
                  strokeDashoffset="0"
                  transform="rotate(-90 24 24)"
                />
              </svg>
              <span className="text-sm font-semibold">70%</span>
            </div>
          </div>
        </div>
        
        <DeckList 
          title="My Decks"
          decks={MOCK_DECKS}
        />
        
        <DeckList 
          title="Imported Decks"
          decks={IMPORTED_DECKS}
        />
      </div>
      
      <Button 
        size="icon" 
        className="w-12 h-12 rounded-full fixed bottom-20 right-4 shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </MobileLayout>
  )
} 
