// src/features/home/components/DeckList.tsx
'use client'

import type { IDeck } from '@/types'
import type { LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, MouseEventHandler } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FlashCard } from '@/features/shared/components/FlashCard'
import { buttonTapScale, listItemVariants } from '@/types/animations'
import { AnimatePresence, domAnimation, LazyMotion, motion } from 'framer-motion'
import { Edit2Icon, EyeIcon, Settings2Icon } from 'lucide-react'
import { useState } from 'react'

interface DeckListProps {
  decks: IDeck[]
  onAddDeck?: () => void
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export function DeckList({ decks, onAddDeck }: DeckListProps) {
  const _onAddDeck = onAddDeck // TODO: remove this
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        className="space-y-3"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {decks.map((deck) => {
          const isExpanded = expandedId === deck.id
          return (
            <motion.div
              key={deck.id}
              variants={listItemVariants}
              layout
            >
              <FlashCard
                title={deck.title}
                lastReview={deck.lastReview}
                stats={{ new: deck.new, learning: deck.learning, reviewing: deck.reviewing }}
                expanded={isExpanded}
                onToggleExpand={() => toggleExpand(deck.id)}
                onOptionsClick={e => e.stopPropagation()}
              >
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="pt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <DeckStatItem label="Dû aujourd'hui" value={deck.duoToday?.toString() ?? '0'} />
                      <DeckStatItem label="Étudié aujourd'hui" value={deck.studiedToday?.toString() ?? '0'} />
                      <DeckStatItem label="Nouvelles cartes" value={deck.newCards?.toString() ?? '0'} />

                      <Separator className="my-2" />

                      <motion.div
                        className="flex justify-between items-center pt-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CardQuickAction
                          icon={EyeIcon}
                          label="Voir"
                          onClick={() => console.warn('Voulu voir le paquet')}
                        />
                        <CardQuickAction
                          icon={Edit2Icon}
                          label="Modifier"
                          onClick={() => console.warn('Voulu modifier le paquet')}
                        />
                        <CardQuickAction
                          icon={Settings2Icon}
                          label="Options"
                          onClick={() => console.warn('Voulu voir les options')}
                        />

                        <motion.div whileTap={buttonTapScale}>
                          <Button size="sm" className="h-7">Apprendre</Button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FlashCard>
            </motion.div>
          )
        })}
      </motion.div>
    </LazyMotion>
  )
}

function DeckStatItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <motion.div
      className="grid grid-cols-4 gap-1 font-semibold text-medium text-muted-foreground text-xs"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="col-span-2 truncate">
        {'• '}
        {label}
      </span>
      <span className="ml-8 col-span-1">
        {value}
      </span>
      <span className="col-span-1">
        cartes
      </span>
    </motion.div>
  )
}

function CardQuickAction({
  label,
  icon: Icon,
  onClick,
}: {
  label: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  onClick?: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <motion.button
      type="button"
      className="flex items-center gap-1 text-sm text-muted-foreground"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={buttonTapScale}
    >
      <Icon className="size-4" />
      {label}
    </motion.button>
  )
}
