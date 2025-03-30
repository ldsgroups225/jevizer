// src/features/shared/components/FlashCard.tsx
'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { buttonTapScale, expandedContentVariants } from '@/types/animations'
import { AnimatePresence, domAnimation, LazyMotion, motion } from 'framer-motion'
import { ChevronDown, Clock, MoreVertical } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface FlashCardProps {
  title: string
  lastReview: string
  stats: { new: number, learning: number, reviewing: number }
  iconUrl?: string
  expanded?: boolean
  hasOptions?: boolean
  onToggleExpand?: () => void
  onOptionsClick?: (event: React.MouseEvent) => void
  children?: React.ReactNode
}

const MotionCard = motion.create(Card)

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

export function FlashCard({
  title,
  lastReview,
  stats,
  iconUrl = '/placeholder-deck.png',
  expanded = false,
  hasOptions = false,
  onToggleExpand,
  onOptionsClick,
  children,
}: FlashCardProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionCard
        className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white"
        layout
        transition={{ duration: 0.2 }}
      >
        <CardContent className="p-0">
          {/* Top part - always visible */}
          <motion.div
            className="flex items-center p-3 cursor-pointer"
            onClick={onToggleExpand}
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.01)' }}
          >
            {/* Icon */}
            <motion.div
              className="flex-shrink-0 mr-3"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={iconUrl}
                alt={title}
                width={48}
                height={48}
                className="rounded-lg bg-muted object-cover"
              />
            </motion.div>

            {/* Info */}
            <motion.div
              className="flex-1 min-w-0 space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold text-medium truncate">{title}</h3>
              <div className="flex items-center text-xs text-gray-500 mt-0.5">
                <Clock className="w-3 h-3 mr-1" />
                <span>
                  révisé:
                  {' '}
                  {lastReview}
                </span>
              </div>
              <motion.div
                className="flex flex-wrap gap-1 mt-1.5"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div variants={badgeVariants}>
                  <Badge variant="new" className="bg-blue-100 text-blue-700 text-[10px] px-1.5 -py-1">
                    {stats.new}
                    {' '}
                    appris
                  </Badge>
                </motion.div>
                <motion.div variants={badgeVariants}>
                  <Badge variant="learning" className="bg-orange-100 text-orange-700 text-[10px] px-1.5 -py-1">
                    {stats.learning}
                    {' '}
                    restant
                  </Badge>
                </motion.div>
                <motion.div variants={badgeVariants}>
                  <Badge variant="reviewing" className="bg-green-100 text-green-700 text-[10px] px-1.5 -py-1">
                    {stats.reviewing}
                    {' '}
                    à revoir
                  </Badge>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="flex items-center ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {hasOptions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileTap={buttonTapScale}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 text-muted-foreground"
                        onClick={onOptionsClick}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Options</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <motion.div whileTap={buttonTapScale}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 text-muted-foreground"
                  onClick={onToggleExpand}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Expanded content */}
          <AnimatePresence>
            {expanded && children && (
              <motion.div
                className="border-t border-border"
                variants={expandedContentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div
                  className="px-3 pb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {children}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </MotionCard>
    </LazyMotion>
  )
}
