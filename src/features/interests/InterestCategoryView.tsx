'use client'

import type { InterestCategory } from '@/types'

import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const INTEREST_CATEGORIES: InterestCategory[] = [
  { id: 'languages', name: 'Langues', icon: '🌎', description: 'Apprenez de nouvelles langues avec des cartes mémoire' },
  { id: 'academic', name: 'Académique', icon: '📚', description: 'Matériel d\'étude pour l\'école et l\'université' },
  { id: 'professional', name: 'Professionnel', icon: '💼', description: 'Connaissances et compétences professionnelles' },
  { id: 'hobbies', name: 'Loisirs', icon: '🎨', description: 'Explorez vos centres d\'intérêt et passions' },
  { id: 'other', name: 'Autre', icon: '✨', description: 'Tout ce que vous souhaitez apprendre' },
]
export function InterestCategoryView() {
  const router = useRouter()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(
      prev => prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId],
    )
  }
  const handleContinue = () => {
    if (selectedCategories.includes('languages')) {
      router.push('/interests/language')
    }
    else {
      router.push('/')
    }
  }
  return (
    <MobileLayout bodyClassName="bg-white">
      {' '}
      <div className="flex flex-col h-full p-6">
        <div className="text-center mb-8">
          {' '}
          <h1 className="text-2xl font-bold mb-2">Qu'est-ce qui vous intéresse ?</h1>
          {' '}
          <p className="text-gray-600">Sélectionnez tout ce qui s'applique</p>
          {' '}
        </div>
        {' '}
        <div className="space-y-4 mb-8">
          {' '}
          {INTEREST_CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category.id)
            return (
              <Card key={category.id} className={`p-4 cursor-pointer transition-colors ${isSelected ? 'bg-primary-light-bg border-primary' : 'hover:bg-gray-50'}`} onClick={() => toggleCategory(category.id)}>
                <div className="flex items-center gap-4">
                  {' '}
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-2xl">
                    {' '}
                    {category.icon}
                    {' '}
                  </div>
                  {' '}
                  <div className="flex-1">
                    {' '}
                    <h3 className="font-medium">{category.name}</h3>
                    {' '}
                    <p className="text-sm text-gray-500">{category.description}</p>
                    {' '}
                  </div>
                  {' '}
                  {isSelected && (<Check className="text-primary w-5 h-5 flex-shrink-0" />)}
                  {' '}
                </div>
              </Card>
            )
          })}
          {' '}

        </div>
        <div className="mt-auto">
          {' '}
          <Button className="w-full" disabled={selectedCategories.length === 0} onClick={handleContinue}> Continuer </Button>
          {' '}
        </div>
      </div>
      {' '}

    </MobileLayout>
  )
}
