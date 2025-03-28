'use client'; import { Button } from '@/components/ui/button'; import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'; import { Award, Calendar, CheckCircle2 } from 'lucide-react'; import React from 'react'

interface AchievementModalProps { isOpen: boolean, onOpenChange: (open: boolean) => void, title?: string, description?: string, streakDays?: number }
export function AchievementModal({ isOpen, onOpenChange, title = 'Achievement Unlocked', description = 'You have reached a new milestone!', streakDays }: AchievementModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {' '}
      <DialogContent className="sm:max-w-md">
        {' '}
        <DialogHeader>
          {' '}
          <DialogTitle className="text-center">{title}</DialogTitle>
          {' '}
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-4">
          {' '}
          <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
            {' '}
            <Award className="h-10 w-10 text-yellow-500" />
            {' '}
          </div>
          {' '}
          {streakDays
            ? (
                <div className="flex items-center gap-2 text-lg font-bold text-primary mb-2">
                  {' '}
                  <Calendar className="h-5 w-5" />
                  {' '}
                  <span>
                    {streakDays}
                    {' '}
                    Day Streak!
                  </span>
                  {' '}
                </div>
              )
            : null}
          {' '}
          <p className="text-center text-gray-600">{description}</p>
          {' '}
        </div>
        <DialogFooter className="sm:justify-center">
          {' '}
          <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            {' '}
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {' '}
            Continue
            {' '}
          </Button>
          {' '}
        </DialogFooter>
      </DialogContent>
      {' '}

    </Dialog>
  )
}
