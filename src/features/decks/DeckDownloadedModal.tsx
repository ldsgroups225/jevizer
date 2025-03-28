'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import React from 'react'

interface DeckDownloadedModalProps {
  isOpen: boolean
  onClose: () => void
  deckName: string
}

export function DeckDownloadedModal({
  isOpen,
  onClose,
  deckName,
}: DeckDownloadedModalProps) {
  const router = useRouter()

  const handleStartStudying = () => {
    // Dans une vraie application, naviguer vers la vue d'étude
    router.push('/study')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Paquet Téléchargé !</DialogTitle>
          <DialogDescription>
            Le paquet
            {' '}
            {deckName}
            {' '}
            a été téléchargé avec succès et ajouté à votre collection. Vous pouvez commencer à étudier maintenant ou y revenir plus tard depuis votre page d'accueil.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Plus Tard
          </Button>
          <Button onClick={handleStartStudying}>
            Commencer à Étudier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
