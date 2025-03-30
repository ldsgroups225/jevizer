// src/app/decks/[deckId]/page.tsx

import { DeckDetailView } from '@/features/decks/DeckDetailView'

interface PageProps {
  params: Promise<{
    deckId: string
  }>
}

export default async function DeckPage({ params }: PageProps) {
  const resolvedParams = await params
  return <DeckDetailView deckId={resolvedParams.deckId} />
}
