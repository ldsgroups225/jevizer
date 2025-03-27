// src/features/home/components/DeckList.tsx
'use client'

import { Button } from '@/components/ui/button'

import { FlashCard } from '@/features/shared/components/FlashCard'
// Added icons
import React, { useState } from 'react'

interface Deck {
  id: string
  title: string
  lastReview: string
  new: number
  learning: number
  reviewing: number
  progress: number // Keep progress even if not shown initially
}

interface DeckListProps {
  decks: Deck[]
  onAddDeck?: () => void
}

export function DeckList({ decks, onAddDeck }: DeckListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  return (
    <div className="space-y-3">
      {decks.map((deck) => {
        const isExpanded = expandedId === deck.id
        return (
          <FlashCard
            key={deck.id}
            title={deck.title}
            lastReview={deck.lastReview} // Pass last review time
            stats={{ new: deck.new, learning: deck.learning, reviewing: deck.reviewing }} // Pass stats
            expanded={isExpanded}
            onToggleExpand={() => toggleExpand(deck.id)} // Pass toggle function
            onOptionsClick={e => e.stopPropagation()} // Prevent card toggle when clicking options
          >
            {/* Content shown when expanded */}
            <div className="flex justify-between items-center pt-2">
              <Button size="sm" className="flex-1">Learn</Button>
              {/* Add Edit and Options buttons if needed based on design */}
              {/* <Button variant="outline" size="sm">Edit</Button> */}
              {/* <Button variant="outline" size="sm">Options</Button> */}
            </div>
          </FlashCard>
        )
      })}

      {/* Add Deck Button - Removed as it's part of the FAB flow now */}
      {/*
      <Button
        variant="outline"
        className="w-full mt-2 border-dashed border-gray-400 text-gray-600 hover:bg-gray-50"
        onClick={onAddDeck}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Deck
      </Button>
      */}
    </div>
  )
}
