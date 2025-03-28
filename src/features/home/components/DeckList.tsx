// src/features/home/components/DeckList.tsx
'use client'

import type { Deck } from '@/types'
import type { LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, MouseEventHandler } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FlashCard } from '@/features/shared/components/FlashCard'
import { Edit2Icon, EyeIcon, Settings2Icon } from 'lucide-react'
import { useState } from 'react'

interface DeckListProps {
  decks: Deck[]
  onAddDeck?: () => void
}

export function DeckList({ decks, onAddDeck }: DeckListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  return (
    <div className="space-y-3">
      {decks.map((deck) => {
        const isExpanded = expandedId === deck.id
        return (
          <FlashCard
            key={deck.id}
            title={deck.title}
            lastReview={deck.lastReview}
            stats={{ new: deck.new, learning: deck.learning, reviewing: deck.reviewing }}
            expanded={isExpanded}
            onToggleExpand={() => toggleExpand(deck.id)}
            onOptionsClick={e => e.stopPropagation()}
          >
            {/* Content shown when expanded */}
            <div className="bg-gray-50 inset-0">
              <div className="pt-2">
                <DeckStatItem label="Duo Today" value={deck.duoToday?.toString() ?? '0'} />
                <DeckStatItem label="Studied Today" value={deck.studiedToday?.toString() ?? '0'} />
                <DeckStatItem label="New cards" value={deck.newCards?.toString() ?? '0'} />
              </div>

              <Separator />

              <div className="flex justify-between items-center pt-2">
                <CardQuickAction
                  icon={EyeIcon}
                  label="View"
                  onClick={() => console.warn('Wanted to view deck')}
                />
                <CardQuickAction
                  icon={Edit2Icon}
                  label="Edit"
                  onClick={() => console.warn('Wanted to edit deck')}
                />
                <CardQuickAction
                  icon={Settings2Icon}
                  label="Options"
                  onClick={() => console.warn('Wanted to view options')}
                />

                <Button size="sm" className="h-7 px-10">Learn</Button>
              </div>
            </div>
          </FlashCard>
        )
      })}
    </div>
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
    <div className="grid grid-cols-3 gap-1 text-foreground font-medium ">
      <span>
        <span className="mr-2">•</span>
        {' '}
        {label}
      </span>
      <span className="ml-8">
        {value}
      </span>
      <span>
        cards
      </span>
    </div>
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
    <button
      className="flex items-center gap-1 text-sm text-muted-foreground"
      onClick={onClick}
    >
      <Icon className="size-4 mr-1" />
      {label}
    </button>
  )
}
