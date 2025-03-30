// src/features/learning/LearningView.tsx
'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'

import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { ChevronLeft, MoreVertical } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { LearningCard } from './components/LearningCard'

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node)
      return

    const controls = animate(Number.parseInt(node.textContent || '0', 10) || 0, value, {
      duration: 0.5,
      onUpdate: (latest: number) => {
        if (node) {
          node.textContent = Math.round(latest).toString()
        }
      },
    })

    return () => controls.stop()
  }, [value])

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = value.toString()
    }
  }, [value])

  return <span ref={ref}>{value}</span>
}

export function LearningView() {
  const [cardState, setCardState] = useState<'front' | 'back'>('front')
  const [progress, setProgress] = useState({ new: 37, learning: 50, reviewing: 12 })
  const totalCards = progress.new + progress.learning + progress.reviewing

  const x = useMotionValue(0)
  const cardRotate = useTransform(x, [-200, 200], [-30, 30])
  const cardOpacity = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [0.5, 1, 1, 1, 0.5],
  )

  const handleShowAnswer = () => setCardState('back')

  const handleRate = (rating: 'again' | 'good' | 'easy') => {
    console.warn('Rated:', rating)
    setCardState('front')
    setProgress(prev => ({ ...prev, learning: prev.learning - 1, reviewing: prev.reviewing + 1 }))
  }

  const handleDragEnd = (
    _: any,
    { offset: { x: offsetX }, velocity: { x: velocityX } }: { offset: { x: number }, velocity: { x: number } },
  ) => {
    const swipe = Math.abs(offsetX * velocityX)
    const threshold = 50000 // Adjust this value to make swipes easier/harder

    if (swipe > threshold) {
      if (offsetX > 0) {
        handleRate('easy')
      }
      else {
        handleRate('again')
      }
    }
  }

  return (
    <MobileLayout activeTab="learning" bodyClassName="bg-white">
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center px-2 py-3 border-b border-gray-100">
          <motion.div
            whileTap={{ scale: 0.9, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </motion.div>

          <motion.h1
            className="flex-1 text-center text-base font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Anglais - Verbes Irréguliers
          </motion.h1>

          <motion.div
            whileTap={{ scale: 0.9, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </motion.div>
        </header>

        {/* Progress Info */}
        <motion.div
          className="px-4 py-3 space-y-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between text-xs font-medium text-gray-600">
            <span className="text-blue-600">
              appris:
              {' '}
              <AnimatedCounter value={progress.new} />
            </span>
            <span className="text-orange-600">
              restant:
              {' '}
              <AnimatedCounter value={progress.learning} />
            </span>
            <span className="text-green-600">
              à revoir:
              {' '}
              <AnimatedCounter value={progress.reviewing} />
            </span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="flex w-full h-2 rounded-full overflow-hidden bg-gray-200">
            <motion.div
              className="bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${(progress.new / totalCards) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="bg-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${(progress.learning / totalCards) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
            <motion.div
              className="bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${(progress.reviewing / totalCards) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
        </motion.div>

        {/* Learning Card Area */}
        <motion.div
          className="flex-1 px-4 pb-4 flex flex-col cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={handleDragEnd}
          style={{
            x,
            rotate: cardRotate,
            opacity: cardOpacity,
          }}
        >
          <LearningCard
            frontContent="to be"
            backContent="être"
            state={cardState}
            onShowAnswer={handleShowAnswer}
            onRate={handleRate}
          />
        </motion.div>
      </div>
    </MobileLayout>
  )
}
