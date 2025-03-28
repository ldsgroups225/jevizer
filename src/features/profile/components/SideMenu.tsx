// src/features/profile/components/SideMenu.tsx
'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch' // Use Switch component
import {
  Bell,
  ChevronRight,
  HelpCircle,
  LogOut,
  Moon,
  Settings, // Added for Support Ankidroid
  User,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface SideMenuProps {
  username: string
  email: string
  avatarUrl?: string
  darkMode?: boolean
  onToggleDarkMode?: () => void
}

export function SideMenu({
  username,
  email,
  avatarUrl,
  darkMode = false,
  onToggleDarkMode,
}: SideMenuProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    // Removed fixed height, let it fill the container from MobileLayout
    <div className="flex flex-col h-full p-4 bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{getInitials(username)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-lg">{username}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
        <Link href="/profile" className="ml-auto">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <Link href="/profile" className="flex items-center gap-4 p-3 h-12 hover:bg-gray-100 rounded-lg text-base text-gray-700 font-medium">
          <User className="h-5 w-5 text-gray-500" />
          <span>Profil</span>
        </Link>
        <Link href="/notifications" className="flex items-center gap-4 p-3 h-12 hover:bg-gray-100 rounded-lg text-base text-gray-700 font-medium">
          <Bell className="h-5 w-5 text-gray-500" />
          <span>Notifications</span>
        </Link>

        {/* Dark Mode Toggle */}
        <div
          className="flex items-center justify-between gap-4 p-3 h-12 hover:bg-gray-100 rounded-lg text-base text-gray-700 font-medium cursor-pointer"
          onClick={onToggleDarkMode} // Make the whole row clickable
        >
          <div className="flex items-center gap-4">
            <Moon className="h-5 w-5 text-gray-500" />
            <span>Mode Sombre</span>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={onToggleDarkMode}
            aria-label="Activer le mode sombre"
            onClick={e => e.stopPropagation()} // Prevent row click handler
          />
        </div>

        <Link href="/help" className="flex items-center gap-4 p-3 h-12 hover:bg-gray-100 rounded-lg text-base text-gray-700 font-medium">
          <HelpCircle className="h-5 w-5 text-gray-500" />
          <span>Centre d'Aide</span>
        </Link>
        <Link href="/support" className="flex items-center gap-4 p-3 h-12 hover:bg-gray-100 rounded-lg text-base text-gray-700 font-medium">
          <Settings className="h-5 w-5 text-gray-500" />
          <span>Support Jeviz</span>
        </Link>
      </nav>

      {/* Logout */}
      <Button
        variant="ghost"
        className="justify-start gap-4 p-3 h-12 text-red-500 hover:bg-red-50 hover:text-red-600 mt-6 text-base font-medium"
      >
        <LogOut className="h-5 w-5" />
        Se déconnecter
      </Button>
    </div>
  )
}
