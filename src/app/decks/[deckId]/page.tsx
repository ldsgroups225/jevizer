import { DeckDetailView } from '@/features/decks/DeckDetailView'

export default function DeckDetailPage({ params }: { params: { deckId: string } }) {
  const { deckId } = params

  return <DeckDetailView deckId={deckId} />
}
