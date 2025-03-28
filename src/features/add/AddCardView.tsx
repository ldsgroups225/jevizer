// src/features/add/AddCardView.tsx
'use client'

import type { ICardData } from '@/types'
import type { ChangeEvent } from 'react'

import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Bold, ChevronLeft, Edit3, Eye, Image as ImageIcon, Italic, Mic, Underline } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function AddCardView() {
  const router = useRouter()

  const [isFront, setIsFront] = useState<boolean>(true)
  const [cardData, setCardData] = useState<ICardData>({ front: '', back: '' })
  const [selectedDeck, _setSelectedDeck] = useState<string>('Default Deck')
  const [cardType, _setCardType] = useState<string>('Basic')
  const [tags, _setTags] = useState<string>('Japanese, Kanji')

  const handleBack = () => {
    router.back()
  }

  const handlePreview = () => {
    // Preview functionality would be implemented here
    // For now, just log a message
    console.warn('Previewing card')
  }

  const handleInputChange = (side: keyof ICardData, value: string): void => {
    setCardData(prev => ({ ...prev, [side]: value }))
  }

  const handleSaveAsDraft = () => {
    console.warn('Saving draft:', { deck: selectedDeck, type: cardType, tags, ...cardData })
    // Save as draft functionality would be implemented here
    // For now, just navigate back to home
    router.push('/')
  }

  const handleAddCard = () => {
    // Basic validation
    if (!cardData.front.trim() || !cardData.back.trim()) {
      console.error('Veuillez remplir le recto et le verso de la carte.')
      return
    }
    console.warn('Adding card:', { deck: selectedDeck, type: cardType, tags, ...cardData })
    // Add API call to add card
    // Show feedback
    // Optionally clear form or navigate
    setCardData({ front: '', back: '' }) // Clear form after adding
    // router.push('/');
  }

  return (
    <MobileLayout bodyClassName="bg-white">
      <div className="flex flex-col h-full">
        <header className="flex items-center px-2 py-3 border-b border-gray-100">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="flex-1 text-center text-base font-medium">
            Create Card
          </h1>
          <Button variant="ghost" size="icon" onClick={handlePreview}>
            <Eye className="w-5 h-5" />
          </Button>
        </header>

        <div className="p-4 space-y-4 flex-1 flex flex-col">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 border rounded-lg">
              <Label className="text-sm text-muted-foreground">The Name Of The Deck</Label>
              <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground"><Edit3 className="w-4 h-4" /></Button>
            </div>
            <div className="flex items-center justify-between p-2 border rounded-lg">
              <Label className="text-sm text-muted-foreground">Method - Basic</Label>
              <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground"><Edit3 className="w-4 h-4" /></Button>
            </div>
            <div className="flex items-center justify-between p-2 border rounded-lg">
              <Label className="text-sm text-muted-foreground">Japanese - Kanji - N5 - N4 - Hiragana</Label>
              <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground"><Edit3 className="w-4 h-4" /></Button>
            </div>
          </div>

          <Card className="flex-1 flex flex-col p-4 border-gray-200">
            <CardContent className="flex-1 p-0">
              <Textarea
                value={isFront ? cardData.front : cardData.back}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(isFront ? 'front' : 'back', e.target.value)}
                placeholder={isFront ? 'Recto (Question)' : 'Verso (Réponse)'}
                className="w-full h-full resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg p-0 bg-transparent"
                aria-label={isFront ? 'Contenu Recto' : 'Contenu Verso'}
              />
            </CardContent>
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm" onClick={() => setIsFront(!isFront)}>
                {isFront ? 'Back' : 'Front'}
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
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 !mt-auto pt-4">
            <Button variant="outline" onClick={handleSaveAsDraft}>Draft</Button>
            <Button onClick={handleAddCard}>Add Card</Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
