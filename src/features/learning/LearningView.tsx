// src/features/learning/LearningView.tsx
'use client'

import type { ICardData } from '@/types'
import type { Variants } from 'framer-motion'

import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { buttonTapScale } from '@/types/animations'
import { animate, AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import { ChevronLeft, MoreVertical } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { LearningCard } from './components/LearningCard'
import { MOCK_CARDS } from './data/mockCards'

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node)
      return
    const controls = animate(Number.parseInt(node.textContent || '0', 10) || 0, value, {
      duration: 0.5,
      onUpdate: (latest: number) => {
        if (node)
          node.textContent = Math.round(latest).toString()
      },
    })
    return () => controls.stop()
  }, [value])

  useEffect(() => {
    if (ref.current)
      ref.current.textContent = value.toString()
  }, [value])

  return <span ref={ref}>{value}</span>
}

const cardWrapperVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.9,
    zIndex: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  }),
}

export function LearningView() {
  const [cardState, setCardState] = useState<'front' | 'back'>('front')
  const [[cardIndex, direction], setCardIndex] = useState([0, 0])
  const [currentCards, _setCurrentCards] = useState<ICardData[]>(MOCK_CARDS)
  const [progress, setProgress] = useState({ new: currentCards.length, learning: 0, reviewing: 0 })
  const totalCards = currentCards.length

  const currentCardArrayIndex = cardIndex % totalCards
  const currentCard = currentCards[currentCardArrayIndex]

  const x = useMotionValue(0)
  const cardRotate = useTransform(x, [-200, 200], [-20, 20])
  const dragOpacity = useTransform(x, [-150, 0, 150], [0.8, 1, 0.8])

  const handleShowAnswer = () => setCardState('back')

  const advanceCard = (newDirection: number) => {
    setCardIndex([cardIndex + 1, newDirection])
    setCardState('front')
  }

  const handleRate = (rating: 'again' | 'good' | 'easy') => {
    console.warn('Rated:', rating, 'Card ID:', currentCard.id)
    let animationDirection = 0
    let nudgeAmount = 0

    if (rating === 'easy') {
      animationDirection = 1
      nudgeAmount = 50
    }
    else if (rating === 'again') {
      animationDirection = -1
      nudgeAmount = -50
    }
    else if (rating === 'good') {
      animationDirection = 0
      // Optional: nudgeAmount = -50; // If 'good' should also exit left
    }

    if (nudgeAmount !== 0) {
      animate(x, nudgeAmount, { duration: 0.1 })
    }

    setTimeout(() => {
      advanceCard(animationDirection)
      // TODO: Implement real progress update logic based on rating
      if (rating === 'easy')
        setProgress(prev => ({ ...prev, reviewing: prev.reviewing + 1, new: prev.new - 1 }))
      else setProgress(prev => ({ ...prev, learning: prev.learning + 1, new: prev.new - 1 }))
    }, 50)
  }

  const handleDragEnd = (
    _: any,
    { offset: { x: offsetX }, velocity: { x: velocityX } }: { offset: { x: number }, velocity: { x: number } },
  ) => {
    const dragThreshold = 100
    const velocityThreshold = 300

    if (offsetX < -dragThreshold && velocityX < -velocityThreshold) {
      console.warn('Swipe Left -> Again')
      advanceCard(-1)
      // TODO: Implement real progress update logic
      setProgress(prev => ({ ...prev, learning: prev.learning + 1, new: prev.new - 1 }))
    }
    else if (offsetX > dragThreshold && velocityX > velocityThreshold) {
      console.warn('Swipe Right -> Easy')
      advanceCard(1)
      // TODO: Implement real progress update logic
      setProgress(prev => ({ ...prev, reviewing: prev.reviewing + 1, new: prev.new - 1 }))
    }
    else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 })
    }
  }

  if (!currentCard) {
    return null // Or a loading indicator
  }

  return (
    <MobileLayout activeTab="learning" bodyClassName="bg-white">
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center px-2 py-3 border-b border-gray-100">
          <motion.div {...buttonTapScale} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
            <Button variant="ghost" size="icon">
              {' '}
              <ChevronLeft className="w-6 h-6" />
              {' '}
            </Button>
          </motion.div>
          <motion.h1 className="flex-1 text-center text-base font-medium" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Anglais - Verbes Irréguliers
          </motion.h1>
          <motion.div {...buttonTapScale} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
            <Button variant="ghost" size="icon">
              {' '}
              <MoreVertical className="w-5 h-5" />
              {' '}
            </Button>
          </motion.div>
        </header>

        {/* Progress Info */}
        <motion.div className="px-4 py-3 space-y-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex justify-between text-xs font-medium text-gray-600">
            <span className="text-blue-600">
              {' '}
              appris:
              <AnimatedCounter value={progress.new} />
            </span>
            <span className="text-orange-600">
              {' '}
              restant:
              <AnimatedCounter value={progress.learning} />
            </span>
            <span className="text-green-600">
              {' '}
              à revoir:
              <AnimatedCounter value={progress.reviewing} />
            </span>
          </div>
          <div className="flex w-full h-2 rounded-full overflow-hidden bg-gray-200">
            <motion.div className="bg-blue-500" initial={{ width: '0%' }} animate={{ width: `${(progress.new / totalCards) * 100}%` }} transition={{ duration: 0.5 }} />
            <motion.div className="bg-orange-500" initial={{ width: '0%' }} animate={{ width: `${(progress.learning / totalCards) * 100}%` }} transition={{ duration: 0.5, delay: 0.1 }} />
            <motion.div className="bg-green-500" initial={{ width: '0%' }} animate={{ width: `${(progress.reviewing / totalCards) * 100}%` }} transition={{ duration: 0.5, delay: 0.2 }} />
          </div>
        </motion.div>

        {/* Learning Card Area */}
        <div className="flex-1 px-4 pb-4 flex flex-col overflow-hidden relative">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={cardIndex}
              className="flex-1 flex flex-col cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.5}
              onDragEnd={handleDragEnd}
              style={{ x, rotate: cardRotate, opacity: dragOpacity }}
              variants={cardWrapperVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <LearningCard
                cardId={currentCard.id}
                frontContent={currentCard.front}
                backContent={currentCard.back}
                audioUrl={currentCard.audioUrl}
                state={cardState}
                onShowAnswer={handleShowAnswer}
                onRate={handleRate}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MobileLayout>
  )
}
