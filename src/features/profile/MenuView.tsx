"use client"

import React, { useState } from 'react'
import MobileLayout from '@/components/layout/MobileLayout'
import { SideMenu } from './components/SideMenu'

export function MenuView() {
  const [darkMode, setDarkMode] = useState(false)
  
  return (
    <MobileLayout activeTab="menu">
      <div className="h-full">
        <SideMenu 
          username="Sarah"
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />
      </div>
    </MobileLayout>
  )
} 
