// src/features/home/HomeView.tsx
'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import { ProgressCircle } from '@/components/progress-circle' // Use ProgressCircle
import { Badge } from '@/components/ui/badge' // Use Badge for tags
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // Use Card
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet' // For Add button action
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs' // Use Tabs
import { Menu as MenuIcon, MoreVertical, Plus, RefreshCw, Search } from 'lucide-react' // Added icons
import Image from 'next/image' // For Logo
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { DeckList } from './components/DeckList'

// Mock data - replace with actual data fetching
const MOCK_DECKS = [
  { id: '1', title: 'Japanese Kanji N5', lastReview: '1 Month Ago', new: 50, learning: 20, reviewing: 100, progress: 70 },
  { id: '2', title: 'Japanese Kanji N4', lastReview: '20 Days Ago', new: 50, learning: 20, reviewing: 10, progress: 0 }, // Progress not shown in design for list items initially
  { id: '3', title: '4000 English Words', lastReview: '4 Days Ago', new: 50, learning: 20, reviewing: 10, progress: 0 },
  { id: '4', title: 'Daily English Words', lastReview: '2 Days Ago', new: 50, learning: 20, reviewing: 10, progress: 0 },
]

const IMPORTED_DECKS = [
  { id: '5', title: 'Learn German From Movie', lastReview: '1 Month Ago', new: 50, learning: 20, reviewing: 10, progress: 0 },
  { id: '6', title: '3000 Common Greek Words', lastReview: '1 Month Ago', new: 50, learning: 20, reviewing: 10, progress: 0 },
  { id: '7', title: 'Learn Japanese With Photos', lastReview: '1 Month Ago', new: 50, learning: 20, reviewing: 10, progress: 0 },
]

// Define the Deck type to match the structure used
interface Deck {
  id: string
  title: string
  lastReview: string
  new: number
  learning: number
  reviewing: number
  progress: number
}

export function HomeView() {
  const [openSheet, setOpenSheet] = useState(false)
  const router = useRouter()

  const handleContinueLearning = () => {
    router.push('/learning')
  }

  const navigateToAddCard = () => {
    setOpenSheet(false)
    router.push('/add/card')
  }

  const navigateToAddDeck = () => {
    setOpenSheet(false)
    // Assuming there would be an add deck page
    // router.push('/add/deck')
    console.warn('Add Deck page not implemented yet')
  }

  const navigateToSharedDecks = () => {
    setOpenSheet(false)
    router.push('/search')
  }

  return (
    <MobileLayout activeTab="home">
      <div className="p-4 space-y-4">
        {/* Header */}
        <header className="flex items-center justify-between">
          {/* Replace with actual SVG/Image logo */}
          <div className="flex items-center gap-1">
            <Image src="/logo.svg" alt="Jeviz Logo" width={24} height={24} />
            <span className="text-xl font-bold">jeviz</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <RefreshCw className="w-5 h-5" />
            </Button>
            {/* TODO: Integrate Side Menu Trigger */}
            <Button variant="ghost" size="icon" className="text-gray-600">
              <MenuIcon className="w-6 h-6" />
            </Button>
          </div>
        </header>

        {/* Search Bar */}
        <div className="relative">
          <Input
            placeholder="Search"
            className="pl-10 pr-4 py-2 h-10 bg-gray-100 border-gray-200 rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>

        {/* My Latest Review Card */}
        <Card className="p-0 overflow-hidden rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base font-medium">My Latest Review</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-6 h-6 -mt-1 -mr-1 text-gray-500">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Options</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Japanese Kanji N5</h3>
                <p className="text-xs text-gray-500 mb-2">You Learned 170 Cards</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                    {MOCK_DECKS[0].new}
                    {' '}
                    New
                  </Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5">
                    {MOCK_DECKS[0].learning}
                    {' '}
                    Learning
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
                    {MOCK_DECKS[0].reviewing}
                    {' '}
                    Reviewing
                  </Badge>
                </div>
                <Button size="sm" className="h-8 px-3" onClick={handleContinueLearning}>Continue Learning</Button>
              </div>
              <ProgressCircle value={MOCK_DECKS[0].progress} size={70} strokeWidth={6} />
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Decks */}
        <Tabs defaultValue="my-decks" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-10 bg-gray-100 rounded-lg p-1">
            <TabsTrigger value="my-decks" className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">My Decks</TabsTrigger>
            <TabsTrigger value="imported-decks" className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Imported Decks</TabsTrigger>
          </TabsList>
          <TabsContent value="my-decks" className="mt-4">
            <DeckList decks={MOCK_DECKS as Deck[]} />
          </TabsContent>
          <TabsContent value="imported-decks" className="mt-4">
            <DeckList decks={IMPORTED_DECKS} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Button Sheet */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="fixed z-40 w-14 h-14 rounded-full bottom-20 right-4 shadow-lg"
          >
            <Plus className="w-7 h-7" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-xl h-auto p-0">
          <SheetHeader className="p-4 pb-2 text-left">
            <SheetTitle>Add</SheetTitle>
          </SheetHeader>
          <div className="p-4 pt-0 space-y-2">
            <Button variant="ghost" className="w-full justify-start h-12 text-base" onClick={navigateToAddCard}>
              <Plus className="mr-3 w-5 h-5" />
              {' '}
              Add Cards
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 text-base" onClick={navigateToAddDeck}>
              <Plus className="mr-3 w-5 h-5" />
              {' '}
              Add Deck
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 text-base" onClick={navigateToSharedDecks}>
              <Plus className="mr-3 w-5 h-5" />
              {' '}
              Get Shared Decks
            </Button>
          </div>
          <SheetFooter className="p-4">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </MobileLayout>
  )
}
