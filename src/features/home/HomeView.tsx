// src/features/home/HomeView.tsx
'use client'

import type { IDeck } from '@/types'
import MobileLayout from '@/components/layout/MobileLayout'
import { AchievementModal } from '@/components/modals/AchievementModal'
import { ProgressCircle } from '@/components/progress-circle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Menu as MenuIcon, MoreVertical, Plus, RefreshCw, Search } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { DeckList } from './components/DeckList'

// Mock data - replace with actual data fetching
const MOCK_DECKS: IDeck[] = [
  { id: '1', title: 'Anglais - Verbes Irréguliers', lastReview: 'Il y a 5 jours', new: 25, learning: 15, reviewing: 60, progress: 75 },
  { id: '2', title: 'SVT - La Cellule Animale et Végétale', lastReview: 'Il y a 2 semaines', new: 40, learning: 10, reviewing: 30, progress: 40 },
  { id: '3', title: 'Histoire - Indépendance de la Côte d\'Ivoire', lastReview: 'Hier', new: 15, learning: 5, reviewing: 20, progress: 85 },
  { id: '4', title: 'Mathématiques - Théorème de Pythagore', lastReview: 'Il y a 3 jours', new: 10, learning: 8, reviewing: 15, progress: 50 },
  { id: '8', title: 'Français - Conjugaison Présent Indicatif', lastReview: 'Il y a 10 jours', new: 50, learning: 20, reviewing: 80, progress: 60 },
  { id: '9', title: 'Géographie - Relief de la Côte d\'Ivoire', lastReview: 'Il y a 1 semaine', new: 30, learning: 5, reviewing: 25, progress: 30 },
  { id: '10', title: 'Physique-Chimie - Les Atomes', lastReview: 'Aujourd\'hui', new: 12, learning: 3, reviewing: 5, progress: 90 },
  { id: '11', title: 'Anglais - Vocabulaire Quotidien', lastReview: 'Il y a 2 jours', new: 60, learning: 25, reviewing: 40, progress: 55 },
  { id: '12', title: 'Mathématiques - Equations du 1er degré', lastReview: 'Il y a 4 jours', new: 22, learning: 18, reviewing: 35, progress: 70 },
]

const IMPORTED_DECKS: IDeck[] = [
  // Ces paquets pourraient être des paquets partagés ou importés sur des sujets plus larges
  { id: '5', title: 'Géographie - Capitales Africaines', lastReview: 'Il y a 1 mois', new: 54, learning: 0, reviewing: 0, progress: 0 },
  { id: '6', title: 'Vocabulaire Anglais pour le Voyage', lastReview: 'Il y a 3 semaines', new: 150, learning: 20, reviewing: 80, progress: 15 },
  { id: '7', title: 'Dates Clés - Histoire Mondiale', lastReview: 'Il y a 2 mois', new: 200, learning: 50, reviewing: 100, progress: 5 },
  { id: '13', title: 'Cuisine Ivoirienne - Recettes de Base', lastReview: 'Il y a 1 mois', new: 20, learning: 5, reviewing: 10, progress: 25 },
  { id: '14', title: 'Expressions Courantes en Espagnol', lastReview: 'Il y a 6 semaines', new: 80, learning: 15, reviewing: 45, progress: 10 },
  { id: '15', title: 'Personnages Historiques Importants', lastReview: 'Il y a 3 mois', new: 100, learning: 30, reviewing: 60, progress: 8 },
  { id: '16', title: 'Apprendre le Nouchi (Expressions)', lastReview: 'Il y a 2 semaines', new: 35, learning: 10, reviewing: 15, progress: 35 },
]

export function HomeView() {
  const [openSheet, setOpenSheet] = useState(false)
  const router = useRouter()
  const [showAchievement, setShowAchievement] = useState(false)

  // Show achievement modal on first render
  useEffect(() => {
    // In a real app, this would be conditional based on user activity
    // For example, we would only show this if the user has completed a streak
    const hasAchievement = Math.random() > 0.5 // Simulate a 50% chance of having an achievement

    if (hasAchievement) {
      // Add a small delay so the modal appears after the page loads
      const timer = setTimeout(() => {
        setShowAchievement(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

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
          <div className="flex items-center gap-1">
            <Image src="/logo.svg" alt="Logo Jeviz" width={24} height={24} />
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
            placeholder="Rechercher"
            className="pl-10 pr-4 py-2 h-10 bg-gray-100 border-gray-200 rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>

        {/* My Latest Review Card */}
        <Card className="p-0 overflow-hidden rounded-xl">
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base font-medium">Ma Dernière Révision</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-6 h-6 -mt-1 -mr-1 text-gray-500">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Modifier</DropdownMenuItem>
                  <DropdownMenuItem>Options</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{MOCK_DECKS[0].title}</h3>
                <p className="text-xs text-gray-500 mb-2">Vous avez appris 170 cartes</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                    {MOCK_DECKS[0].new}
                    {' '}
                    appris
                  </Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5">
                    {MOCK_DECKS[0].learning}
                    {' '}
                    restant
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
                    {MOCK_DECKS[0].reviewing}
                    {' '}
                    à revoir
                  </Badge>
                </div>
                <Button size="sm" className="h-8 px-3" onClick={handleContinueLearning}>Continuer l'apprentissage</Button>
              </div>
              <ProgressCircle value={MOCK_DECKS[0].progress} size={70} strokeWidth={6} />
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Decks */}
        <Tabs defaultValue="my-decks" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-10 bg-gray-100 rounded-lg p-1">
            <TabsTrigger value="my-decks" className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Mes Paquets</TabsTrigger>
            {' '}
            {/* "My Decks" */}
            <TabsTrigger value="imported-decks" className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Paquets Importés</TabsTrigger>
            {' '}
            {/* "Imported Decks" */}
          </TabsList>
          <TabsContent value="my-decks" className="mt-4">
            <DeckList decks={MOCK_DECKS} />
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
            <SheetTitle>Ajouter</SheetTitle>
            {' '}
            {/* "Add" */}
          </SheetHeader>
          <div className="p-4 pt-0 space-y-2">
            <Button variant="ghost" className="w-full justify-start h-12 text-base" onClick={navigateToAddCard}>
              <Plus className="mr-3 w-5 h-5" />
              {' '}
              Ajouter des Cartes
              {' '}
              {/* "Add Cards" */}
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 text-base" onClick={navigateToAddDeck}>
              <Plus className="mr-3 w-5 h-5" />
              {' '}
              Ajouter un Paquet
              {' '}
              {/* "Add Deck" */}
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 text-base" onClick={navigateToSharedDecks}>
              <Plus className="mr-3 w-5 h-5" />
              {' '}
              Obtenir des Paquets Partagés
              {' '}
              {/* "Get Shared Decks" */}
            </Button>
          </div>
          <SheetFooter className="p-4">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">Annuler</Button>
              {' '}
              {/* "Cancel" */}
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Achievement Modal */}
      <AchievementModal
        isOpen={showAchievement}
        onOpenChange={setShowAchievement}
        title="Série de 7 Jours !" // "7 Day Streak!"
        description="Vous avez été constant dans votre apprentissage pendant toute une semaine. Continuez comme ça !" // "You've been consistent with your learning for a whole week. Keep it up!"
        streakDays={7}
      />
    </MobileLayout>
  )
}
