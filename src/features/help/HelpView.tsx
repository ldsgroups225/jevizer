'use client'; import MobileLayout from '@/components/layout/MobileLayout'; import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { ChevronLeft, ChevronRight, FileText, LifeBuoy, Mail, Search, Video } from 'lucide-react'; import { useRouter } from 'next/navigation'; import React, { useState } from 'react'

const FAQ_ITEMS = [{ id: '1', question: 'How do I create a new deck?', answer: 'To create a new deck, tap the + button on the home screen and select Add Deck. Then, give your deck a name and customize it with tags and a description.' }, { id: '2', question: 'How does spaced repetition work?', answer: 'Spaced repetition is a learning technique that spaces out review of material over time, showing you cards just before you might forget them.' }, { id: '3', question: 'Can I import decks from Anki?', answer: 'Yes! Go to the Search tab and select Import from Anki.' }]
export function HelpView() {
  const router = useRouter(); const [searchQuery, setSearchQuery] = useState(''); const handleBack = () => { router.back() }; return (
    <MobileLayout bodyClassName="bg-white">
      {' '}
      <div className="flex flex-col h-full">
        {' '}
        <header className="flex items-center px-2 py-3 border-b border-gray-100">
          {' '}
          <Button variant="ghost" size="icon" onClick={handleBack}>
            {' '}
            <ChevronLeft className="w-6 h-6" />
            {' '}
          </Button>
          {' '}
          <h1 className="flex-1 text-center text-base font-medium">Help Center</h1>
          {' '}
          <div className="w-10" />
          {' '}
        </header>
        <div className="p-4 space-y-6 overflow-y-auto flex-1">
          {' '}
          <div className="relative mb-6">
            {' '}
            <Input placeholder="Search for help..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
            {' '}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            {' '}
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {' '}
            <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-3">
              {' '}
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
                {' '}
                <Video className="h-5 w-5" />
                {' '}
              </div>
              {' '}
              <div>
                {' '}
                <h3 className="font-medium text-sm">Video Tutorials</h3>
                {' '}
                <p className="text-xs text-gray-500">Learn through our video guides</p>
                {' '}
              </div>
              {' '}
              <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
              {' '}
            </div>
            <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-3">
              {' '}
              <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full text-green-600">
                {' '}
                <FileText className="h-5 w-5" />
                {' '}
              </div>
              {' '}
              <div>
                {' '}
                <h3 className="font-medium text-sm">User Guide</h3>
                {' '}
                <p className="text-xs text-gray-500">Detailed documentation</p>
                {' '}
              </div>
              {' '}
              <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
              {' '}
            </div>
          </div>
          <h2 className="text-lg font-semibold mb-3">Frequently Asked Questions</h2>
          {' '}
          <Accordion type="single" collapsible className="w-full">
            {' '}
            {FAQ_ITEMS.map(item => (
              <AccordionItem key={item.id} value={item.id}>
                {' '}
                <AccordionTrigger className="text-sm font-medium hover:no-underline">{item.question}</AccordionTrigger>
                {' '}
                <AccordionContent className="text-sm text-gray-600">{item.answer}</AccordionContent>
                {' '}
              </AccordionItem>
            ))}
            {' '}
          </Accordion>
          <div className="mt-6 p-4 bg-primary-light-bg rounded-lg">
            {' '}
            <div className="flex items-center gap-3 mb-3">
              {' '}
              <LifeBuoy className="h-5 w-5 text-primary" />
              {' '}
              <h3 className="font-medium">Need more help?</h3>
              {' '}
            </div>
            {' '}
            <p className="text-sm text-gray-600 mb-4">Contact our support team for personalized assistance</p>
            {' '}
            <Button className="w-full" onClick={() => router.push('/support')}>
              {' '}
              <Mail className="mr-2 h-4 w-4" />
              {' '}
              Contact Support
              {' '}
            </Button>
            {' '}
          </div>
        </div>
      </div>
      {' '}

    </MobileLayout>
  )
}
