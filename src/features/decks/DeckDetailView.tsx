'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bookmark, ChevronLeft, Download, Edit3, Play, Share2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

// Données simulées pour démonstration
const MOCK_DECK = {
  id: 'dk1',
  name: 'Exemple (De 2164 Notes)',
  author: 'Darius Kassi',
  authorAvatar: '/avatar-placeholder.png',
  cardCount: 2000,
  language: 'Anglais',
  description: 'Ceci est un paquet qui comprend tous les 2200 Kanji du livre \'Remembering The Kanji 1, 6ème édition\', par James W. Heisig. Je voulais étudier ce livre et j\'ai pensé qu\'utiliser Jeviz serait parfait. En cherchant des paquets partagés, j\'ai rapidement constaté que beaucoup de paquets n\'étaient pas complets, ne correspondaient pas à mes goûts, ou étaient d\'une ancienne édition. J\'ai donc décidé de créer ce paquet. Le paquet ne contient pas les éléments primitifs qui ne sont pas eux-mêmes des Kanji.',
  reviews: [],
  frontExample: 'Family',
  backExample: 'Famille',
  audioUrl: '/audio-placeholder.mp3',
}

export function DeckDetailView({ deckId }: { deckId: string }) {
  // Dans une vraie application, récupérer les données du paquet basées sur deckId
  const deck = MOCK_DECK
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleBookmark = () => {
    // La fonctionnalité de favoris serait implémentée ici
    console.warn('Ajout/Retrait des favoris pour le paquet:', deckId)
  }

  const handleSave = () => {
    // La fonctionnalité de sauvegarde serait implémentée ici
    console.warn('Sauvegarde du paquet dans la collection:', deckId)
  }

  const handleDownload = () => {
    // La fonctionnalité de téléchargement serait implémentée ici
    // Puis navigation vers l'accueil
    router.push('/')
  }

  return (
    <MobileLayout bodyClassName="bg-primary-light-bg">
      <div className="flex flex-col h-full">
        <header className="flex items-center px-2 py-3 text-white bg-primary">
          <Button variant="ghost" size="icon" className="text-white hover:bg-primary-darker" onClick={handleBack}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="flex-1 text-center text-base font-medium">
            Le Nom du Paquet
          </h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-primary-darker" onClick={handleBookmark}>
            <Bookmark className="w-5 h-5" />
          </Button>
        </header>

        <div className="p-4 space-y-4 overflow-y-auto pb-20">
          <Card className="rounded-xl overflow-hidden">
            <CardContent className="p-4 flex items-center justify-between bg-white">
              <div className="text-center flex-1">
                <div className="text-3xl font-medium mb-2">{deck.frontExample}</div>
                <hr className="border-gray-200 my-2" />
                <div className="text-xl text-muted-foreground">{deck.backExample}</div>
              </div>
              <Button variant="ghost" size="icon" className="ml-4 rounded-full bg-gray-100 text-primary">
                <Play className="w-5 h-5 fill-primary" />
              </Button>
            </CardContent>
          </Card>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-10 bg-primary-light-bg rounded-lg p-1">
              <TabsTrigger value="description" className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Description</TabsTrigger>
              <TabsTrigger value="reviews" className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Avis</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <Card className="rounded-xl bg-white p-0">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={deck.authorAvatar} alt={deck.author} />
                      <AvatarFallback>{deck.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {deck.author}
                        {' '}
                        (L'Auteur)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-b border-gray-100 py-2">
                    <span className="flex items-center gap-1">
                      <Edit3 className="w-4 h-4" />
                      {' '}
                      {deck.cardCount}
                      {' '}
                      cartes
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-4 h-4" />
                      {' '}
                      {deck.language}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {deck.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <Card className="rounded-xl bg-white p-4">
                <CardContent className="p-0">
                  <p className="text-center text-muted-foreground">Pas encore d'avis, ou espace réservé pour la liste des avis.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={handleSave}>Sauvegarder</Button>
          <Button onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </div>
    </MobileLayout>
  )
}
