"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Mic, RefreshCw } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface LearningCardProps {
  deckName: string
  front: string
  back: string
  onNext?: () => void
  onPrev?: () => void
  showAnswer?: boolean
  onShowAnswer?: () => void
}

export function LearningCard({
  deckName,
  front,
  back,
  onNext,
  onPrev,
  showAnswer = false,
  onShowAnswer
}: LearningCardProps) {
  const [activeTab, setActiveTab] = useState<'front' | 'back'>(showAnswer ? 'back' : 'front')
  
  const handleShowAnswer = () => {
    setActiveTab('back')
    onShowAnswer?.()
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center py-4">
        <Button variant="ghost" size="icon" onClick={onPrev}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-sm text-center flex-1">
          The Name Of The Deck
        </h2>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={(v) => setActiveTab(v as 'front' | 'back')}
        className="flex-1 flex flex-col"
      >
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <TabsContent value="front" className="flex-1 w-full flex flex-col items-center justify-center">
            <Card className="w-full aspect-square flex items-center justify-center bg-gray-50 border-2 mb-4">
              <CardContent className="flex items-center justify-center p-4 text-center">
                <div className="text-4xl font-bold">{front}</div>
              </CardContent>
            </Card>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleShowAnswer}
            >
              Show Answer
            </Button>
          </TabsContent>
          
          <TabsContent value="back" className="flex-1 w-full flex flex-col items-center justify-center">
            <Card className="w-full aspect-square flex items-center justify-center bg-gray-50 border-2 mb-4">
              <CardContent className="flex items-center justify-center p-4 text-center">
                <div className="text-4xl font-bold">{back}</div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-2 w-full mt-4">
              <Button variant="outline" onClick={() => setActiveTab('front')}>Review</Button>
              <Button onClick={onNext}>Got it</Button>
            </div>
          </TabsContent>
        </div>
        
        <TabsList className="grid grid-cols-2 mt-4">
          <TabsTrigger value="front">Front</TabsTrigger>
          <TabsTrigger value="back">Back</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="py-4 flex justify-center">
        <Button variant="ghost" size="icon" className="rounded-full bg-gray-200">
          <Mic className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
} 
