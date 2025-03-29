// src/app/cards/[cardId]/edit/page.tsx

import { EditCardView } from '@/features/edit/EditCardView'

interface PageProps {
  params: Promise<{
    cardId: string
  }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EditCardPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  return <EditCardView params={resolvedParams} searchParams={resolvedSearchParams} />
}
