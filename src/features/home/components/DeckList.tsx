"use client"

import React, { useState } from 'react'
import { FlashCard } from '@/features/shared/components/FlashCard'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface Deck {
  id: string
  title: string
  subtitle?: string
  tags: string[]
  progress: number
}

interface DeckListProps {
  title: string
  decks: Deck[]
  onAddDeck?: () => void
}

export function DeckList({ title, decks, onAddDeck }: DeckListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  
  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }
  
  return (
    <div className="pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      
      <div>
        {decks.map(deck => (
          <FlashCard
            key={deck.id}
            title={deck.title}
            subtitle={deck.subtitle}
            tags={deck.tags}
            progress={deck.progress}
            expanded={expandedId === deck.id}
            onClick={() => toggleExpand(deck.id)}
          >
            <div className="py-2">
              <div className="flex gap-2 mb-2">
                <div className="flex flex-col items-center text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">248</span>
                  <span>New</span>
                </div>
                <div className="flex flex-col items-center text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">79</span>
                  <span>To Review</span>
                </div>
                <div className="flex flex-col items-center text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">10</span>
                  <span>Minutes</span>
                </div>
              </div>
              
              <Button className="w-full" size="sm">
                Start Learning
              </Button>
            </div>
          </FlashCard>
        ))}
        
        <Button 
          variant="outline" 
          className="w-full mt-2 border-dashed"
          onClick={onAddDeck}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Deck
        </Button>
      </div>
    </div>
  )
} 
