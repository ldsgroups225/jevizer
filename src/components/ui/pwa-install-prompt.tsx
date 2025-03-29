'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const checkStandalone = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches
      if (standalone !== isStandalone) {
        setIsStandalone(standalone)
      }
    }

    const checkIOS = () => {
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
      if (iOS !== isIOS) {
        setIsIOS(iOS)
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    // Initial checks
    checkStandalone()
    checkIOS()

    // Check if user has already dismissed or installed
    const hasInteracted = localStorage.getItem('pwa-prompt-interaction')
    if (hasInteracted) {
      setShowPrompt(false)
    }

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [isIOS, isStandalone])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    
    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        localStorage.setItem('pwa-prompt-interaction', 'installed')
        setShowPrompt(false)
        setDeferredPrompt(null)
      }
    } catch (error) {
      console.error('Error installing PWA:', error)
    }
  }

  const handleDismiss = () => {
    localStorage.setItem('pwa-prompt-interaction', 'dismissed')
    setShowPrompt(false)
  }

  if (!showPrompt || isStandalone) return null

  return (
    <div className={cn(
      "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[400px] bg-white dark:bg-gray-800",
      "rounded-lg shadow-lg p-4 z-50 border border-border",
      "animate-in fade-in slide-in-from-bottom-4 duration-300"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Installer Jeviz</h3>
          {isIOS ? (
            <p className="text-sm text-muted-foreground mt-1">
              Pour installer Jeviz, appuyez sur le bouton partager 
              <span role="img" aria-label="share" className="mx-1">⎋</span> 
              puis "Ajouter à l'écran d'accueil"
              <span role="img" aria-label="plus" className="ml-1">➕</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground mt-1">
              Installez Jeviz pour un meilleur accès hors ligne et des notifications
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {!isIOS && (
            <Button onClick={handleInstall} variant="default" size="sm">
              Installer
            </Button>
          )}
          <Button 
            onClick={handleDismiss}
            variant="ghost" 
            size="icon"
            className="text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 
