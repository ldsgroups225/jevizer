// src/features/learning/components/LearningCard.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { buttonTapScale } from '@/types/animations'

import { AnimatePresence, domAnimation, LazyMotion, motion } from 'framer-motion'
import { Bookmark, Edit, Pause, Play, Volume2 } from 'lucide-react'
import React, { useState } from 'react'

interface LearningCardProps {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  state: 'front' | 'back'
  onShowAnswer: () => void
  onRate: (rating: 'again' | 'good' | 'easy') => void
  audioUrl?: string
}

const MotionCard = motion(Card)

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const audioPlayerVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
}

const iconVariants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.5, opacity: 0 },
}

export function LearningCard({
  frontContent,
  backContent,
  state,
  onShowAnswer,
  onRate,
  audioUrl,
}: LearningCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const renderContent = (content: React.ReactNode) => {
    if (typeof content === 'string' && content.length < 5) {
      return <div className="text-6xl font-medium text-center">{content}</div>
    }
    return <div className="text-2xl text-center">{content}</div>
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // Add your audio play/pause logic here
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col flex-1 justify-between">
        <MotionCard
          className="flex-grow flex flex-col justify-center items-center p-6 border-gray-200 shadow-sm min-h-[50vh]"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: state === 'back' ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          style={{ perspective: 2000 }}
        >
          <CardContent className="w-full p-0">
            <AnimatePresence mode="wait">
              {state === 'front'
                ? (
                    <motion.div
                      key="front"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={variants}
                      transition={{ duration: 0.2 }}
                    >
                      {renderContent(frontContent)}
                    </motion.div>
                  )
                : (
                    <motion.div
                      key="back"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={variants}
                      transition={{ duration: 0.2 }}
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      {renderContent(frontContent)}
                      <hr className="my-4 border-gray-200" />
                      {renderContent(backContent)}
                    </motion.div>
                  )}
            </AnimatePresence>
          </CardContent>
        </MotionCard>

        {/* Actions */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {state === 'front'
            ? (
                <motion.div whileTap={buttonTapScale}>
                  <Button
                    className="w-full h-12 text-base"
                    onClick={onShowAnswer}
                  >
                    Afficher la réponse
                  </Button>
                </motion.div>
              )
            : (
                <>
                  {/* Audio Player (Conditional) */}
                  <AnimatePresence>
                    {audioUrl && (
                      <motion.div
                        className="flex items-center gap-3 mb-4 px-2"
                        variants={audioPlayerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <motion.div whileTap={buttonTapScale}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-gray-100"
                            onClick={handlePlayPause}
                          >
                            <AnimatePresence mode="wait">
                              {isPlaying
                                ? (
                                    <motion.div
                                      key="pause"
                                      variants={iconVariants}
                                      initial="initial"
                                      animate="animate"
                                      exit="exit"
                                      transition={{ duration: 0.15 }}
                                    >
                                      <Pause className="w-5 h-5" />
                                    </motion.div>
                                  )
                                : (
                                    <motion.div
                                      key="play"
                                      variants={iconVariants}
                                      initial="initial"
                                      animate="animate"
                                      exit="exit"
                                      transition={{ duration: 0.15 }}
                                    >
                                      <Play className="w-5 h-5" />
                                    </motion.div>
                                  )}
                            </AnimatePresence>
                          </Button>
                        </motion.div>
                        <Slider defaultValue={[33]} max={100} step={1} className="flex-1" />
                        <span className="text-xs text-gray-500">00:02.30</span>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={buttonTapScale}
                        >
                          <Button variant="ghost" size="icon" className="text-gray-500">
                            <Volume2 className="w-5 h-5" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Rating Buttons */}
                  <motion.div
                    className="grid grid-cols-3 gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div whileTap={buttonTapScale}>
                      <Button
                        variant="outline"
                        className="h-14 flex flex-col border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => onRate('again')}
                      >
                        Encore
                        <span className="text-xs font-normal">1 Min</span>
                      </Button>
                    </motion.div>
                    <motion.div whileTap={buttonTapScale}>
                      <Button
                        variant="outline"
                        className="h-14 flex flex-col border-blue-300 text-blue-600 hover:bg-blue-50"
                        onClick={() => onRate('good')}
                      >
                        Bon
                        <span className="text-xs font-normal">10 Min</span>
                      </Button>
                    </motion.div>
                    <motion.div whileTap={buttonTapScale}>
                      <Button
                        variant="outline"
                        className="h-14 flex flex-col border-green-300 text-green-600 hover:bg-green-50"
                        onClick={() => onRate('easy')}
                      >
                        Facile
                        <span className="text-xs font-normal">4 Jours</span>
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Bottom Icons */}
                  <motion.div
                    className="flex justify-center gap-8 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div whileTap={buttonTapScale}>
                      <Button variant="ghost" size="icon" className="text-gray-500">
                        <Bookmark className="w-5 h-5" />
                      </Button>
                    </motion.div>
                    <motion.div whileTap={buttonTapScale}>
                      <Button variant="ghost" size="icon" className="text-gray-500">
                        <Edit className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </>
              )}
        </motion.div>
      </div>
    </LazyMotion>
  )
}
