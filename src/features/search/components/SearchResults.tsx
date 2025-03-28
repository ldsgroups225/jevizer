// src/features/search/components/SearchResults.tsx
'use client'

import type { DeckResult } from '@/types'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Clock, Download, Settings2, Star } from 'lucide-react' // Added icons
import Image from 'next/image'
import React from 'react'

interface SearchResultsProps {
  searchTerm: string
  results: DeckResult[]
  onDownloadDeck: (deck: DeckResult) => void
}

export function SearchResults({ searchTerm, results, onDownloadDeck }: SearchResultsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold">
          {results.length}
          {' '}
          Résultats pour "
          {searchTerm}
          "
        </h2>
        <Button variant="ghost" size="sm" className="text-gray-600">
          <Settings2 className="w-4 h-4 mr-1" />
          {' '}
          Modifié
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
                    {Math.floor(deck.time / 60)}
                    min
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-auto">
                <Button size="sm" className="h-8 px-3">Voir Plus</Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 flex items-center gap-1"
                  onClick={() => onDownloadDeck(deck)}
                >
                  <Download className="w-3 h-3" />
                  Télécharger
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
