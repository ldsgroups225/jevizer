// src/features/profile/MenuView.tsx
'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import React, { useState } from 'react'
import { SideMenu } from './components/SideMenu'

export function MenuView() {
  const [darkMode, setDarkMode] = useState(false)
  // In a real app, you'd likely use next-themes or similar
  // and get the theme state from context.

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // Add logic to actually change the theme (e.g., using next-themes `setTheme`)
    // document.documentElement.classList.toggle('dark', !darkMode);
  }

  return (
    // Use white background for the menu content area
    <MobileLayout activeTab="menu" bodyClassName="bg-white">
      {/* The SideMenu component itself will fill the height */}
      <SideMenu
        username="Sarah Mohamed"
        email="Sarahmohamed23@Gamil.Com" // Add email
        avatarUrl="/avatar-placeholder.png" // Add placeholder
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    </MobileLayout>
  )
}

// Create public/avatar-placeholder.png (e.g., a simple user icon or colored circle)
