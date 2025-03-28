'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { BookOpen, Clock, Download } from 'lucide-react'
import React from 'react'

interface DeckDownloadedModalProps { isOpen: boolean, onOpenChange: (open: boolean) => void, deckName?: string, cardCount?: number, onStartLearning?: () => void }
export function DeckDownloadedModal({ isOpen, onOpenChange, deckName = 'Japanese N5 Kanji', cardCount = 500, onStartLearning }: DeckDownloadedModalProps) {
  const handleStartLearning = () => {
    onOpenChange(false)
    if (onStartLearning)
      onStartLearning()
  }
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {' '}
      <DialogContent className="sm:max-w-md">
        {' '}
        <DialogHeader>
          {' '}
          <DialogTitle className="text-center">Download Complete</DialogTitle>
          {' '}
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-4">
          {' '}
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            {' '}
            <Download className="h-10 w-10 text-blue-500" />
            {' '}
          </div>
          {' '}
          <p className="text-center font-medium mb-2">{deckName}</p>
          {' '}
          <div className="flex items-center gap-6 text-gray-600 text-sm mb-4">
            {' '}
            <div className="flex items-center gap-1">
              {' '}
              <BookOpen className="h-4 w-4" />
              {' '}
              <span>
                {cardCount}
                {' '}
                Cards
              </span>
              {' '}
            </div>
            {' '}
            <div className="flex items-center gap-1">
              {' '}
              <Clock className="h-4 w-4" />
              {' '}
              <span>~15 min/day</span>
              {' '}
            </div>
            {' '}
          </div>
          {' '}
          <p className="text-center text-gray-600">Your deck is ready. Start learning right away!</p>
          {' '}
        </div>
        <DialogFooter className="sm:flex-row sm:justify-center sm:space-x-2">
          {' '}
          <Button variant="outline" onClick={() => onOpenChange(false)} className="sm:w-auto"> Maybe Later </Button>
          {' '}
          <Button onClick={handleStartLearning} className="sm:w-auto"> Start Learning </Button>
          {' '}
        </DialogFooter>
      </DialogContent>
      {' '}

    </Dialog>
  )
}
