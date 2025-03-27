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
import { ChevronDown, ChevronUp, Clock, MoreVertical } from 'lucide-react'
import Image from 'next/image' // If you need icons/images
import React from 'react'

interface FlashCardProps {
  title: string
  lastReview: string
  stats: { new: number, learning: number, reviewing: number }
  iconUrl?: string // Optional icon/image URL
  expanded?: boolean
  onToggleExpand?: () => void
  onOptionsClick?: (event: React.MouseEvent) => void
  children?: React.ReactNode // For expanded content
}

export function FlashCard({
  title,
  lastReview,
  stats,
  iconUrl = '/placeholder-deck.png', // Default placeholder
  expanded = false,
  onToggleExpand,
  onOptionsClick,
  children,
}: FlashCardProps) {
  return (
    <Card className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
      <CardContent className="p-0">
        {/* Top part - always visible */}
        <div
          className="flex items-center p-3 cursor-pointer"
          onClick={onToggleExpand}
        >
          {/* Icon */}
          <div className="flex-shrink-0 mr-3">
            <Image
              src={iconUrl}
              alt={title}
              width={40}
              height={40}
              className="rounded bg-gray-100 object-cover" // Basic styling
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base truncate">{title}</h3>
            <div className="flex items-center text-xs text-gray-500 mt-0.5">
              <Clock className="w-3 h-3 mr-1" />
              <span>
                Last Review
                {lastReview}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1.5">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0">
                {stats.new}
                {' '}
                New
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-[10px] px-1.5 py-0">
                {stats.learning}
                {' '}
                Learning
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0">
                {stats.reviewing}
                {' '}
                Reviewing
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 text-gray-500"
                  onClick={onOptionsClick} // Use the passed handler
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Options</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="w-7 h-7 text-gray-500" onClick={onToggleExpand}>
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Expanded content */}
        {expanded && children && (
          <div className="px-3 pb-3 border-t border-gray-100">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Create a placeholder image: public/placeholder-deck.png (e.g., a simple gray square)
