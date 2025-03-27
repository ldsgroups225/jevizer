"use client"

import React from 'react'
import MobileLayout from '@/components/layout/MobileLayout'
import { LearningCard } from './components/LearningCard'

export function LearningView() {
  return (
    <MobileLayout activeTab="learning">
      <div className="h-full p-4 flex flex-col">
        <LearningCard
          deckName="Japanese Kanji N5"
          front="子供"
          back="Child"
          onNext={() => console.log('Next card')} 
          onPrev={() => console.log('Previous card')}
        />
      </div>
    </MobileLayout>
  )
} 
