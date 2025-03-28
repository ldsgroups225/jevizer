'use client'
import type { ILanguage } from '@/types'
import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LANGUAGES: ILanguage[] = [
  { id: 'en', name: 'Anglais', flag: '🇺🇸' },
  { id: 'fr', name: 'Français', flag: '🇫🇷' },
  { id: 'es', name: 'Espagnol', flag: '🇪🇸' },
  { id: 'de', name: 'Allemand', flag: '🇩🇪' },
  { id: 'it', name: 'Italien', flag: '🇮🇹' },
  { id: 'pt', name: 'Portugais', flag: '🇵🇹' },
  { id: 'ru', name: 'Russe', flag: '🇷🇺' },
  { id: 'ja', name: 'Japonais', flag: '🇯🇵' },
  { id: 'zh', name: 'Chinois', flag: '🇨🇳' },
  { id: 'ko', name: 'Coréen', flag: '🇰🇷' },
  { id: 'ar', name: 'Arabe', flag: '🇸🇦' },
]

type Language = typeof LANGUAGES[number]['id']

export function LanguageSelectionView() {
  const router = useRouter()
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const toggleLanguage = (langId: Language) => {
    setSelectedLanguages(
      prev => prev.includes(langId)
        ? prev.filter(id => id !== langId)
        : [...prev, langId],
    )
  }
  const handleBack = () => {
    router.back()
  }

  const handleContinue = () => {
    router.push('/')
  }

  return (
    <MobileLayout bodyClassName="bg-white">
      {' '}
      <div className="flex flex-col h-full p-6">
        {' '}
        <div className="flex items-center mb-6">
          {' '}
          <Button variant="ghost" size="icon" className="mr-2" onClick={handleBack}>
            {' '}
            <ChevronLeft className="w-5 h-5" />
            {' '}
          </Button>
          {' '}
          <h1 className="text-xl font-bold">Quelles langues souhaitez-vous apprendre ?</h1>
          {' '}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {' '}
          {LANGUAGES.map((language) => {
            const isSelected = selectedLanguages.includes(language.id)
            return (
              <Card key={language.id} className={`p-4 cursor-pointer transition-colors ${isSelected ? 'bg-primary-light-bg border-primary' : 'hover:bg-gray-50'}`} onClick={() => toggleLanguage(language.id)}>
                {' '}
                <div className="flex items-center gap-3">
                  {' '}
                  <div className="text-2xl">{language.flag}</div>
                  {' '}
                  <div className="flex-1">{language.name}</div>
                  {' '}
                  {isSelected && (<Check className="text-primary w-5 h-5" />)}
                  {' '}
                </div>
                {' '}
              </Card>
            )
          })}
          {' '}
        </div>
        <div className="mt-auto">
          {' '}
          <Button className="w-full" disabled={selectedLanguages.length === 0} onClick={handleContinue}> Continuer </Button>
          {' '}
          <Button variant="ghost" className="w-full mt-2" onClick={handleContinue}> Passer pour l'instant </Button>
          {' '}
        </div>
      </div>
      {' '}

    </MobileLayout>
  )
}
