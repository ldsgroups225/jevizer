// src/features/learning/LearningView.tsx
'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
// Use Progress for segmented bar
import { ChevronLeft, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { LearningCard } from './components/LearningCard'

export function LearningView() {
  const [cardState, setCardState] = useState<'front' | 'back'>('front')
  const [progress, setProgress] = useState({ new: 37, learning: 50, reviewing: 12 })
  const totalCards = progress.new + progress.learning + progress.reviewing

  const handleShowAnswer = () => setCardState('back')
  const handleRate = (rating: 'again' | 'good' | 'easy') => {
    console.warn('Rated:', rating)
    // TODO: Add logic to update card state and progress
    setCardState('front') // Move to next card (or show front of next)
    // Example progress update
    setProgress(prev => ({ ...prev, learning: prev.learning - 1, reviewing: prev.reviewing + 1 }))
  }

  return (
    // Use a white background for the learning screen content area
    <MobileLayout activeTab="learning" bodyClassName="bg-white">
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center px-2 py-3 border-b border-gray-100">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="flex-1 text-center text-base font-medium">
            Anglais - Verbes Irréguliers
          </h1>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </header>

        {/* Progress Info */}
        <div className="px-4 py-3 space-y-2">
          <div className="flex justify-between text-xs font-medium text-gray-600">
            <span className="text-blue-600">
              appris:
              {progress.new}
            </span>
            <span className="text-orange-600">
              restant:
              {progress.learning}
            </span>
            <span className="text-green-600">
              à revoir:
              {progress.reviewing}
            </span>
          </div>
          {/* Segmented Progress Bar */}
          <div className="flex w-full h-2 rounded-full overflow-hidden bg-gray-200">
            <div className="bg-blue-500" style={{ width: `${(progress.new / totalCards) * 100}%` }}></div>
            <div className="bg-orange-500" style={{ width: `${(progress.learning / totalCards) * 100}%` }}></div>
            <div className="bg-green-500" style={{ width: `${(progress.reviewing / totalCards) * 100}%` }}></div>
          </div>
        </div>

        {/* Learning Card Area */}
        <div className="flex-1 px-4 pb-4 flex flex-col">
          <LearningCard
            frontContent="to be"
            backContent="être"
            state={cardState}
            onShowAnswer={handleShowAnswer}
            onRate={handleRate}
            // Add audio related props if needed
          />
        </div>
      </div>
    </MobileLayout>
  )
}
