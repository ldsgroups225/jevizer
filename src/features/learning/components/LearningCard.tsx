// src/features/learning/components/LearningCard.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider' // For audio progress
import { Bookmark, Edit, Play, Volume2 } from 'lucide-react' // Added icons
import React from 'react'

interface LearningCardProps {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  state: 'front' | 'back'
  onShowAnswer: () => void
  onRate: (rating: 'again' | 'good' | 'easy') => void
  audioUrl?: string // Optional audio URL
}

export function LearningCard({
  frontContent,
  backContent,
  state,
  onShowAnswer,
  onRate,
  audioUrl,
}: LearningCardProps) {
  const renderContent = (content: React.ReactNode) => {
    if (typeof content === 'string' && content.length < 5) { // Assume large characters like Kanji
      return <div className="text-6xl font-medium text-center">{content}</div>
    }
    return <div className="text-2xl text-center">{content}</div>
  }

  return (
    <div className="flex flex-col flex-1 justify-between">
      {/* Card Display */}
      <Card className="flex-grow flex flex-col justify-center items-center p-6 border-gray-200 shadow-sm min-h-[50vh]">
        <CardContent className="w-full p-0">
          {renderContent(frontContent)}
          {state === 'back' && (
            <>
              <hr className="my-4 border-gray-200" />
              {renderContent(backContent)}
            </>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-4">
        {state === 'front' ? (
          <Button className="w-full h-12 text-base" onClick={onShowAnswer}>
            Show Answer
          </Button>
        ) : (
          <>
            {/* Audio Player (Conditional) */}
            {audioUrl && (
              <div className="flex items-center gap-3 mb-4 px-2">
                <Button variant="ghost" size="icon" className="rounded-full bg-gray-100">
                  <Play className="w-5 h-5" />
                </Button>
                <Slider defaultValue={[33]} max={100} step={1} className="flex-1" />
                <span className="text-xs text-gray-500">00:02.30</span>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Volume2 className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* Rating Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="h-14 flex flex-col border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => onRate('again')}
              >
                Again
                <span className="text-xs font-normal">1 Min</span>
              </Button>
              <Button
                variant="outline"
                className="h-14 flex flex-col border-blue-300 text-blue-600 hover:bg-blue-50"
                onClick={() => onRate('good')}
              >
                Good
                <span className="text-xs font-normal">10 Min</span>
              </Button>
              <Button
                variant="outline"
                className="h-14 flex flex-col border-green-300 text-green-600 hover:bg-green-50"
                onClick={() => onRate('easy')}
              >
                Easy
                <span className="text-xs font-normal">4 Days</span>
              </Button>
            </div>

            {/* Bottom Icons */}
            <div className="flex justify-center gap-8 mt-4">
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Bookmark className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Edit className="w-5 h-5" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
