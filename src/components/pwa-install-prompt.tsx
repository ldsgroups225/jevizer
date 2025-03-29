'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useCallback, useEffect, useReducer } from 'react'

interface State {
  showPrompt: boolean
  deferredPrompt: any
  isIOS: boolean
  isStandalone: boolean
}

type Action =
  | { type: 'SET_STANDALONE', payload: boolean }
  | { type: 'SET_IOS', payload: boolean }
  | { type: 'SET_DEFERRED_PROMPT', payload: any }
  | { type: 'SET_SHOW_PROMPT', payload: boolean }
  | { type: 'RESET_PROMPT' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STANDALONE':
      return { ...state, isStandalone: action.payload }
    case 'SET_IOS':
      return { ...state, isIOS: action.payload }
    case 'SET_DEFERRED_PROMPT':
      return { ...state, deferredPrompt: action.payload }
    case 'SET_SHOW_PROMPT':
      return { ...state, showPrompt: action.payload }
    case 'RESET_PROMPT':
      return { ...state, showPrompt: false, deferredPrompt: null }
    default:
      return state
  }
}

export function PWAInstallPrompt() {
  const [state, dispatch] = useReducer(reducer, {
    showPrompt: false,
    deferredPrompt: null,
    isIOS: false,
    isStandalone: false,
  })

  const updateStandalone = useCallback(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches
    dispatch({ type: 'SET_STANDALONE', payload: standalone })
  }, [])

  const updateIOS = useCallback(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    dispatch({ type: 'SET_IOS', payload: iOS })
  }, [])

  const handleBeforeInstallPrompt = useCallback((e: Event) => {
    e.preventDefault()
    dispatch({ type: 'SET_DEFERRED_PROMPT', payload: e })

    const hasInteracted = localStorage.getItem('pwa-prompt-interaction')
    if (!hasInteracted) {
      dispatch({ type: 'SET_SHOW_PROMPT', payload: true })
    }
  }, [])

  useEffect(() => {
    updateStandalone()
    updateIOS()

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [updateStandalone, updateIOS, handleBeforeInstallPrompt])

  const handleInstall = async () => {
    if (!state.deferredPrompt)
      return

    try {
      await state.deferredPrompt.prompt()
      const { outcome } = await state.deferredPrompt.userChoice
      if (outcome === 'accepted') {
        localStorage.setItem('pwa-prompt-interaction', 'installed')
        dispatch({ type: 'RESET_PROMPT' })
      }
    }
    catch (error) {
      console.error('Error installing PWA:', error)
    }
  }

  const handleDismiss = () => {
    localStorage.setItem('pwa-prompt-interaction', 'dismissed')
    dispatch({ type: 'SET_SHOW_PROMPT', payload: false })
  }

  if (!state.showPrompt || state.isStandalone)
    return null

  return (
    <div className={cn(
      'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[400px] bg-white dark:bg-gray-800',
      'rounded-lg shadow-lg p-4 z-50 border border-border',
      'animate-in fade-in slide-in-from-bottom-4 duration-300',
    )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Installer Jeviz</h3>
          {state.isIOS
            ? (
                <p className="text-sm text-muted-foreground mt-1">
                  Pour installer Jeviz, appuyez sur le bouton partager
                  <span role="img" aria-label="share" className="mx-1">⎋</span>
                  puis "Ajouter à l'écran d'accueil"
                  <span role="img" aria-label="plus" className="ml-1">➕</span>
                </p>
              )
            : (
                <p className="text-sm text-muted-foreground mt-1">
                  Installez Jeviz pour un meilleur accès hors ligne et des notifications
                </p>
              )}
        </div>

        <div className="flex items-center gap-2">
          {!state.isIOS && (
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
