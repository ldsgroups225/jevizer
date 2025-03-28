// src/features/profile/MenuView.tsx
'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import React, { useState } from 'react'
import { SideMenu } from './components/SideMenu'

export function MenuView() {
  const [darkMode, setDarkMode] = useState(false)
  // Dans une vraie application, vous utiliseriez probablement next-themes ou similaire
  // et obtiendriez l'état du thème depuis le contexte.

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // Ajouter la logique pour changer réellement le thème (par exemple, en utilisant next-themes `setTheme`)
    // document.documentElement.classList.toggle('dark', !darkMode);
  }

  return (
    // Utiliser un fond blanc pour la zone de contenu du menu
    <MobileLayout activeTab="menu" bodyClassName="bg-white">
      {/* Le composant SideMenu lui-même remplira la hauteur */}
      <SideMenu
        username="Sarah Mohamed"
        email="Sarahmohamed23@Gamil.Com"
        avatarUrl="/avatar-placeholder.png"
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </MobileLayout>
  )
}

// Créer public/avatar-placeholder.png (par exemple, une icône d'utilisateur simple ou un cercle coloré)
