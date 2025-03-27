"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChevronRight, Edit, Library } from 'lucide-react'

interface UserProfileProps {
  name: string
  username: string
  avatarUrl?: string
  stats: {
    studyDays: number
    cards: number
  }
  interests: {
    id: string
    name: string
    icon?: React.ReactNode
  }[]
  savedDecks: {
    id: string
    title: string
    tags: string[]
    cards: number
  }[]
}

export function UserProfile({
  name,
  username,
  avatarUrl,
  stats,
  interests,
  savedDecks
}: UserProfileProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-medium">Hi, {name}</h2>
            <Button size="icon" variant="ghost" className="h-6 w-6">
              <Edit className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-sm text-gray-500">@{username}</p>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <span className="font-bold">{stats.studyDays}</span>
              <span className="text-xs text-gray-500">Study Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">{stats.cards}</span>
              <span className="text-xs text-gray-500">Total Cards</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h3 className="font-medium mb-2">Your Interests</h3>
        <div className="grid grid-cols-4 gap-2">
          {interests.map(interest => (
            <Card key={interest.id} className="flex flex-col items-center p-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                {interest.icon || <span className="text-xl">🎯</span>}
              </div>
              <span className="text-xs text-center">{interest.name}</span>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Saved</h3>
        {savedDecks.map(deck => (
          <Card key={deck.id} className="mb-3">
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{deck.title}</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {deck.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Library className="h-4 w-4" />
                  <span>{deck.cards}</span>
                  <button className="p-1">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 
