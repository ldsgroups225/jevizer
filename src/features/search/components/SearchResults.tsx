// src/features/search/components/SearchResults.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Clock, Download, Settings2, Star } from 'lucide-react' // Added icons
import Image from 'next/image'
import React from 'react'

interface DeckResult {
  id: string
  title: string
  downloads: number
  rating: number // Assuming rating is a number like stars count or similar
  cards: number
  time: number // Assuming time is in some unit like minutes or seconds
  iconUrl?: string
}

interface SearchResultsProps {
  searchTerm: string
  results: DeckResult[]
}

export function SearchResults({ searchTerm, results }: SearchResultsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold">
          {results.length}
          {' '}
          Results for "
          {searchTerm}
          "
        </h2>
        <Button variant="ghost" size="sm" className="text-gray-600">
          <Settings2 className="w-4 h-4 mr-1" />
          {' '}
          Modified
        </Button>
      </div>

      {results.map(deck => (
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
                    {' '}
                    {deck.downloads}
                  </span>
                  <span className="flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    {' '}
                    {deck.rating}
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {' '}
                    {deck.cards}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {' '}
                    {deck.time}
                  </span>
                  {' '}
                  {/* Adjust unit display */}
                </div>
              </div>
              <Button size="sm" className="ml-auto mt-1 h-8 px-3">See More</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
