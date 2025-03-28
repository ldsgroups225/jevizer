'use client'; import MobileLayout from '@/components/layout/MobileLayout'; import { Button } from '@/components/ui/button'; import { Card } from '@/components/ui/card'; import { Check } from 'lucide-react'; import { useRouter } from 'next/navigation'; import React, { useState } from 'react'

const INTEREST_CATEGORIES = [{ id: 'languages', name: 'Languages', icon: '🌎', description: 'Learn new languages through flashcards' }, { id: 'academic', name: 'Academic', icon: '📚', description: 'Study materials for school and university' }, { id: 'professional', name: 'Professional', icon: '💼', description: 'Career-related knowledge and skills' }, { id: 'hobbies', name: 'Hobbies', icon: '🎨', description: 'Explore your interests and passions' }, { id: 'other', name: 'Other', icon: '✨', description: 'Everything else you want to learn' }]
export function InterestCategoryView() {
  const router = useRouter(); const [selectedCategories, setSelectedCategories] = useState([]); const toggleCategory = (categoryId) => { setSelectedCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]) }
  const handleContinue = () => {
    if (selectedCategories.includes('languages')) { router.push('/interests/language') }
    else { router.push('/') }
  }; return (
    <MobileLayout bodyClassName="bg-white">
      {' '}
      <div className="flex flex-col h-full p-6">
        <div className="text-center mb-8">
          {' '}
          <h1 className="text-2xl font-bold mb-2">What are you interested in?</h1>
          {' '}
          <p className="text-gray-600">Select all that apply</p>
          {' '}
        </div>
        {' '}
        <div className="space-y-4 mb-8">
          {' '}
          {INTEREST_CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category.id); return (
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
          <Button className="w-full" disabled={selectedCategories.length === 0} onClick={handleContinue}> Continue </Button>
          {' '}
        </div>
      </div>
      {' '}

    </MobileLayout>
  )
}
