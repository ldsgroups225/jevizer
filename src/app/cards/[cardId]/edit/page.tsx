import { EditCardView } from '@/features/edit/EditCardView'

export default function EditCardPage({ params }: { params: { cardId: string } }) {
  return <EditCardView params={params} />
}
