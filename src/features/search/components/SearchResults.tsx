"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { FlashCard } from '@/features/shared/components/FlashCard'

interface SearchCategory {
  id: string
  name: string
  icon?: React.ReactNode
}

interface SearchResultProps {
  searchTerm: string
  categories: SearchCategory[]
  popularDecks: {
    id: string
    title: string
    tags: string[]
    cards: number
    level: string
  }[]
}

export function SearchResults({ searchTerm, categories, popularDecks }: SearchResultProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-md font-medium mb-3">Popular Categories</h2>
        <div className="grid grid-cols-4 gap-2">
          {categories.map(category => (
            <Card key={category.id} className="flex flex-col items-center p-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                {category.icon || <span className="text-xl">🎯</span>}
              </div>
              <span className="text-xs text-center">{category.name}</span>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-md font-medium mb-3">Popular Decks</h2>
        {popularDecks.map(deck => (
          <Card key={deck.id} className="mb-3">
            <CardContent className="p-3">
              <h3 className="font-medium">{deck.title}</h3>
              <div className="flex justify-between items-center mt-1">
                <div className="flex flex-wrap gap-1">
                  {deck.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-xs text-gray-500 gap-3">
                  <span>{deck.cards} Cards</span>
                  <span>{deck.level}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 
