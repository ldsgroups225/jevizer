// src/features/learning/components/LearningCard.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { buttonTapScale } from '@/types/animations'

import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  motion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Bookmark, Edit, Pause, Play, Volume2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface LearningCardProps {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  state: 'front' | 'back'
  onShowAnswer: () => void
  onRate: (rating: 'again' | 'good' | 'easy') => void
  audioUrl?: string
  cardId?: string | number
}

// --- UPDATED contentFadeVariants ---
const contentFadeVariants = {
  hidden: { opacity: 0, transition: { duration: 0.1 } },
  // REMOVED delay: 0.25
  visible: { opacity: 1, transition: { duration: 0.2 /* removed delay */ } },
}
// --- END UPDATED contentFadeVariants ---

const audioPlayerVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: {
      height: { duration: 0.3, ease: 'easeInOut' },
      opacity: { duration: 0.2, ease: 'easeOut' },
      marginBottom: { duration: 0.3, ease: 'easeInOut' },
    },
  },
  visible: {
    opacity: 1,
    height: 'auto',
    marginBottom: '1rem',
    transition: {
      height: { duration: 0.3, ease: 'easeInOut' },
      opacity: { duration: 0.2, ease: 'easeIn', delay: 0.1 },
      marginBottom: { duration: 0.3, ease: 'easeInOut' },
    },
  },
}

const iconVariants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.5, opacity: 0 },
  transition: { duration: 0.15 },
}

const actionsVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.1 } },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
}

export function LearningCard({
  frontContent,
  backContent,
  state,
  onShowAnswer,
  onRate,
  audioUrl,
  cardId,
}: LearningCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const rotateYSpring = useSpring(state === 'back' ? 180 : 0, {
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  })

  useEffect(() => {
    rotateYSpring.set(state === 'back' ? 180 : 0)
  }, [state, rotateYSpring])

  const brightness = useTransform(rotateYSpring, [0, 90, 180], [1, 0.85, 1])
  const dynamicShadow = useTransform(rotateYSpring, [0, 90, 180], [
    'drop-shadow(0px 4px 8px rgba(0,0,0,0.08))',
    'drop-shadow(0px 10px 20px rgba(0,0,0,0.12))',
    'drop-shadow(0px 4px 8px rgba(0,0,0,0.08))',
  ])
  const scale = useTransform(rotateYSpring, [0, 90, 180], [1, 0.97, 1])
  const translateZ = useTransform(rotateYSpring, [0, 90, 180], [0, 30, 0])

  const renderContentStructure = (content: React.ReactNode) => {
    return (
      <>
        {typeof content === 'string' && content.length < 5
          ? <div className="text-6xl font-medium text-center">{content}</div>
          : <div className="text-2xl text-center">{content}</div>}
      </>
    )
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    console.warn(isPlaying ? 'Pausing audio...' : 'Playing audio...')
    // TODO: Implement actual audio play/pause logic here
  }

  const currentFrontKey = `front-${cardId || 'static'}`
  const currentBackKey = `back-${cardId || 'static'}`

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col flex-1 justify-between">
        {/* Card Flip Area */}
        <div className="flex-grow" style={{ perspective: 1200 }}>
          <motion.div
            className="relative w-full h-full min-h-[50vh]"
            style={{
              transformStyle: 'preserve-3d',
              rotateY: rotateYSpring,
              filter: dynamicShadow,
              scale,
              z: translateZ,
            }}
          >
            {/* Front Face */}
            <motion.div
              className="absolute w-full h-full"
              style={{ backfaceVisibility: 'hidden', filter: brightness }}
            >
              <Card className="w-full h-full flex flex-col justify-center items-center p-6 border-gray-200 shadow-sm">
                <CardContent className="w-full p-0 flex justify-center items-center">
                  <AnimatePresence initial={false}>
                    {state === 'front' && (
                      <motion.div
                        key={currentFrontKey}
                        variants={contentFadeVariants} // Uses updated variants
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="w-full"
                      >
                        {renderContentStructure(frontContent)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

            {/* Back Face */}
            <motion.div
              className="absolute w-full h-full"
              style={{
                backfaceVisibility: state === 'back' ? 'visible' : 'hidden',
                transform: 'rotateY(180deg)',
                filter: brightness,
              }}
            >
              <Card className="w-full h-full flex flex-col justify-center items-center p-6 border-gray-200 shadow-sm">
                <CardContent className="w-full p-0 flex flex-col justify-center items-center">
                  <AnimatePresence initial={false}>
                    {state === 'back' && (
                      <motion.div
                        key={currentBackKey}
                        variants={contentFadeVariants} // Uses updated variants
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="w-full"
                      >
                        {renderContentStructure(backContent)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Actions Section */}
        <div className="mt-4">
          <AnimatePresence initial={false} mode="wait">
            {state === 'front'
              ? (
                  <motion.div key="show-answer-btn" variants={actionsVariants} initial="initial" animate="animate" exit="exit">
                    <motion.div {...buttonTapScale}>
                      <Button className="w-full h-12 text-base" onClick={onShowAnswer}>
                        Afficher la réponse
                      </Button>
                    </motion.div>
                  </motion.div>
                )
              : (
                  <motion.div key="rating-section" variants={actionsVariants} initial="initial" animate="animate" exit="exit">
                    {/* Audio Player */}
                    <AnimatePresence>
                      {audioUrl && (
                        <motion.div className="flex items-center gap-3 px-2" variants={audioPlayerVariants} initial="hidden" animate="visible" exit="hidden">
                          <motion.div {...buttonTapScale}>
                            <Button variant="ghost" size="icon" className="rounded-full bg-gray-100" onClick={handlePlayPause}>
                              <AnimatePresence mode="wait">
                                {isPlaying
                                  ? <motion.div key="pause" {...iconVariants}><Pause className="w-5 h-5" /></motion.div>
                                  : <motion.div key="play" {...iconVariants}><Play className="w-5 h-5" /></motion.div>}
                              </AnimatePresence>
                            </Button>
                          </motion.div>
                          <Slider defaultValue={[33]} max={100} step={1} className="flex-1" />
                          <span className="text-xs text-gray-500">00:02.30</span>
                          <motion.div {...buttonTapScale}>
                            <Button variant="ghost" size="icon" className="text-gray-500">
                              {' '}
                              <Volume2 className="w-5 h-5" />
                              {' '}
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Rating Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                      <motion.div {...buttonTapScale}>
                        <Button variant="outline" className="h-14 w-full flex flex-col border-red-300 text-red-600 hover:bg-red-50" onClick={() => onRate('again')}>
                          Encore
                          {' '}
                          <span className="text-xs font-normal">1 Min</span>
                        </Button>
                      </motion.div>
                      <motion.div {...buttonTapScale}>
                        <Button variant="outline" className="h-14 w-full flex flex-col border-blue-300 text-blue-600 hover:bg-blue-50" onClick={() => onRate('good')}>
                          Bon
                          {' '}
                          <span className="text-xs font-normal">10 Min</span>
                        </Button>
                      </motion.div>
                      <motion.div {...buttonTapScale}>
                        <Button variant="outline" className="h-14 w-full flex flex-col border-green-300 text-green-600 hover:bg-green-50" onClick={() => onRate('easy')}>
                          Facile
                          {' '}
                          <span className="text-xs font-normal">4 Jours</span>
                        </Button>
                      </motion.div>
                    </div>

                    {/* Bottom Icons */}
                    <div className="flex justify-center gap-8 mt-4">
                      <motion.div {...buttonTapScale}>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                          {' '}
                          <Bookmark className="w-5 h-5" />
                          {' '}
                        </Button>
                      </motion.div>
                      <motion.div {...buttonTapScale}>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                          {' '}
                          <Edit className="w-5 h-5" />
                          {' '}
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
          </AnimatePresence>
        </div>
      </div>
    </LazyMotion>
  )
}
