// src/features/search/SearchView.tsx
'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// If needed for filtering results
import { Menu as MenuIcon, RefreshCw, Search } from 'lucide-react' // Added icons
import Image from 'next/image'
import React from 'react'
import { SearchResults } from './components/SearchResults'

// Mock data - replace with actual data fetching
const MOCK_CATEGORIES = [
  { id: '1', name: 'Japanese', icon: '🇯🇵' },
  { id: '2', name: 'English', icon: '🇺🇸' },
  { id: '3', name: 'German', icon: '🇩🇪' },
  { id: '4', name: 'Spanish', icon: '🇪🇸' },
]
const MOCK_LANGUAGES = [
  { id: '5', name: 'Music', icon: '🎵' },
  { id: '6', name: 'Chemistry', icon: '🧪' },
  { id: '7', name: 'Geography', icon: '🌍' },
  { id: '8', name: 'Physics', icon: '⚛️' },
]

const MOCK_DECKS = [
  { id: 'd1', title: 'Learn Japanese From Anime', downloads: 2639, rating: 342, cards: 2106, time: 1200 },
  { id: 'd2', title: 'Most Learned Words', downloads: 2639, rating: 342, cards: 2106, time: 1200 },
  { id: 'd3', title: 'The Basic Japanese Grammar Rules', downloads: 2639, rating: 342, cards: 2106, time: 1200 },
  { id: 'd4', title: 'Common 1000 Japanese Words', downloads: 2639, rating: 342, cards: 2106, time: 1200 },
  { id: 'd5', title: 'Japanese Culter', downloads: 2639, rating: 342, cards: 2106, time: 1200 },
  { id: 'd6', title: 'Learn Japanese From Anime', downloads: 2639, rating: 342, cards: 2106, time: 1200 }, // Duplicate for example
]

export function SearchView() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const hasResults = searchTerm.length > 0 // Simulate having results

  return (
    <MobileLayout activeTab="search">
      <div className="p-4 space-y-4">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Image src="/logo.svg" alt="Jeviz Logo" width={24} height={24} />
            <span className="text-xl font-bold">jeviz</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <RefreshCw className="w-5 h-5" />
            </Button>
            {/* TODO: Integrate Side Menu Trigger */}
            <Button variant="ghost" size="icon" className="text-gray-600">
              <MenuIcon className="w-6 h-6" />
            </Button>
          </div>
        </header>

        {/* Search Bar */}
        <div className="relative">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 h-10 bg-white border-gray-200 rounded-lg shadow-sm" // White background
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>

        {/* Conditional Rendering: Categories or Results */}
        {hasResults ? (
          <SearchResults
            searchTerm={searchTerm}
            results={MOCK_DECKS} // Pass search results
          />
        ) : (
          <div className="space-y-6">
            {/* Popular Categories */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-base font-semibold">Popular Categories</h2>
                <Button variant="link" className="text-sm h-auto p-0 text-blue-600">See More</Button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {MOCK_CATEGORIES.map(category => (
                  <Button key={category.id} variant="outline" className="flex flex-col items-center justify-center h-20 bg-white border-gray-200 shadow-sm p-2">
                    <span className="text-2xl mb-1">{category.icon}</span>
                    <span className="text-xs text-center text-gray-700">{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Language Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-base font-semibold">Language</h2>
                <Button variant="link" className="text-sm h-auto p-0 text-blue-600">See More</Button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {MOCK_LANGUAGES.map(category => (
                  <Button key={category.id} variant="outline" className="flex flex-col items-center justify-center h-20 bg-white border-gray-200 shadow-sm p-2">
                    <span className="text-2xl mb-1">{category.icon}</span>
                    <span className="text-xs text-center text-gray-700">{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 pt-4">
              You Can't Find What You're Looking For?
              {' '}
              <Button variant="link" className="p-0 h-auto text-blue-600">Try A Search</Button>
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  )
}
