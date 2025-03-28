// src/features/edit/EditCardView.tsx
'use client'

import type { ICardData } from '@/types'

import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Bold, ChevronLeft, Edit3, Eye, Image as ImageIcon, Italic, Mic, Trash2, Underline } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface EditCardParams {
  cardId?: string
}

export function EditCardView({ params }: { params: EditCardParams }) {
  const router = useRouter()
  const { cardId } = params || { cardId: 'sample-card-id' }
  const [isFront, setIsFront] = useState(true)
  const [cardData, setCardData] = useState<ICardData>({ front: '家族', back: 'Famille' })

  useEffect(() => {
    // Dans une vraie application, récupérer les données de la carte par cardId
    // Pour l'instant, utilisation de données simulées
  }, [cardId])

  const handleInputChange = (side: 'front' | 'back', value: string) => {
    setCardData(prev => ({ ...prev, [side]: value }))
  }

  const handleBack = () => {
    router.back()
  }

  const handlePreview = () => {
    // Fonctionnalité d'aperçu
    console.warn('Aperçu de la carte:', cardData)
  }

  const handleDelete = () => {
    // Une confirmation de suppression serait affichée ici
    // Pour l'instant, retourner simplement à l'accueil
    router.push('/')
  }

  const handleSave = () => {
    // Dans une vraie application, sauvegarder les données de la carte
    // Pour l'instant, retourner simplement en arrière
    router.push('/')
  }

  return (
    <MobileLayout bodyClassName="bg-white">
      <div className="flex flex-col h-full">
        <header className="flex items-center px-2 py-3 border-b border-gray-100">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="flex-1 text-center text-base font-medium">
            Modifier la Carte
          </h1>
          <Button variant="ghost" size="icon" onClick={handlePreview}>
            <Eye className="w-5 h-5" />
          </Button>
        </header>

        <div className="p-4 space-y-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between p-2 border rounded-lg">
            <Label className="text-sm text-muted-foreground">Japonais - Kanji - N5 - N4 - Hiragana</Label>
            <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground">
              <Edit3 className="w-4 h-4" />
            </Button>
          </div>

          <Card className="flex-1 flex flex-col p-4 border-gray-200">
            <CardContent className="flex-1 p-0">
              <Textarea
                value={isFront ? cardData.front : cardData.back}
                onChange={e => handleInputChange(isFront ? 'front' : 'back', e.target.value)}
                placeholder={isFront ? 'Recto' : 'Verso'}
                className="w-full h-full resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg p-0"
              />
            </CardContent>
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm" onClick={() => setIsFront(!isFront)}>
                {isFront ? 'Verso' : 'Recto'}
              </Button>
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <Button variant="ghost" size="icon"><Bold className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><Italic className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><Underline className="w-5 h-5" /></Button>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon"><Mic className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><ImageIcon className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={handleDelete}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="mt-auto grid grid-cols-1 gap-3 !mt-auto pt-4">
            <Button onClick={handleSave}>Enregistrer les modifications</Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
