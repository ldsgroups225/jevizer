// src/features/learning/LearningView.tsx
'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { AnimatePresence, domAnimation, LazyMotion, motion } from 'framer-motion'
import { ChevronLeft, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { LearningCard } from './components/LearningCard'

const buttonTapScale = { scale: 0.95 }

const progressBarVariants = {
  initial: (width: number) => ({
    width: `${width}%`,
    opacity: 0,
  }),
  animate: (width: number) => ({
    width: `${width}%`,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

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
    <LazyMotion features={domAnimation}>
      <MobileLayout activeTab="learning" bodyClassName="bg-white">
        <motion.div
          className="flex flex-col h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Header */}
          <motion.header
            className="flex items-center px-2 py-3 border-b border-gray-100"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div whileTap={buttonTapScale}>
              <Button variant="ghost" size="icon">
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </motion.div>
            <motion.h1
              className="flex-1 text-center text-base font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Anglais - Verbes Irréguliers
            </motion.h1>
            <motion.div whileTap={buttonTapScale}>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.header>

          {/* Progress Info */}
          <motion.div
            className="px-4 py-3 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex justify-between text-xs font-medium text-gray-600">
              <motion.span
                className="text-blue-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                appris:
                {' '}
                {progress.new}
              </motion.span>
              <motion.span
                className="text-orange-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                restant:
                {' '}
                {progress.learning}
              </motion.span>
              <motion.span
                className="text-green-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                à revoir:
                {' '}
                {progress.reviewing}
              </motion.span>
            </div>

            {/* Segmented Progress Bar */}
            <div className="flex w-full h-2 rounded-full overflow-hidden bg-gray-200">
              <motion.div
                className="bg-blue-500"
                custom={(progress.new / totalCards) * 100}
                variants={progressBarVariants}
                initial="initial"
                animate="animate"
              />
              <motion.div
                className="bg-orange-500"
                custom={(progress.learning / totalCards) * 100}
                variants={progressBarVariants}
                initial="initial"
                animate="animate"
              />
              <motion.div
                className="bg-green-500"
                custom={(progress.reviewing / totalCards) * 100}
                variants={progressBarVariants}
                initial="initial"
                animate="animate"
              />
            </div>
          </motion.div>

          {/* Learning Card Area */}
          <motion.div
            className="flex-1 px-4 pb-4 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={cardState} // Force re-render on state change
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <LearningCard
                  frontContent="to be"
                  backContent="être"
                  state={cardState}
                  onShowAnswer={handleShowAnswer}
                  onRate={handleRate}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </MobileLayout>
    </LazyMotion>
  )
}
