'use client'; import MobileLayout from '@/components/layout/MobileLayout'; import { Button } from '@/components/ui/button'; import { Card } from '@/components/ui/card'; import { Check, ChevronLeft } from 'lucide-react'; import { useRouter } from 'next/navigation'; import React, { useState } from 'react'

const LANGUAGES = [{ id: 'en', name: 'English', flag: '🇺🇸' }, { id: 'fr', name: 'French', flag: '🇫🇷' }, { id: 'es', name: 'Spanish', flag: '🇪🇸' }, { id: 'de', name: 'German', flag: '🇩🇪' }, { id: 'it', name: 'Italian', flag: '🇮🇹' }, { id: 'pt', name: 'Portuguese', flag: '🇵🇹' }, { id: 'ru', name: 'Russian', flag: '🇷🇺' }, { id: 'ja', name: 'Japanese', flag: '🇯🇵' }, { id: 'zh', name: 'Chinese', flag: '🇨🇳' }, { id: 'ko', name: 'Korean', flag: '🇰🇷' }, { id: 'ar', name: 'Arabic', flag: '🇸🇦' }]
export function LanguageSelectionView() {
  const router = useRouter(); const [selectedLanguages, setSelectedLanguages] = useState([]); const toggleLanguage = (langId) => { setSelectedLanguages(prev => prev.includes(langId) ? prev.filter(id => id !== langId) : [...prev, langId]) }
  const handleBack = () => { router.back() }; const handleContinue = () => { router.push('/') }; return (
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
          <h1 className="text-xl font-bold">Which languages would you like to learn?</h1>
          {' '}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {' '}
          {LANGUAGES.map((language) => {
            const isSelected = selectedLanguages.includes(language.id); return (
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
          <Button className="w-full" disabled={selectedLanguages.length === 0} onClick={handleContinue}> Continue </Button>
          {' '}
          <Button variant="ghost" className="w-full mt-2" onClick={handleContinue}> Skip for now </Button>
          {' '}
        </div>
      </div>
      {' '}

    </MobileLayout>
  )
}
