"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { 
  User, 
  Bell, 
  HelpCircle, 
  Moon,
  LogOut 
} from 'lucide-react'

interface SideMenuProps {
  username: string
  avatarUrl?: string
  darkMode?: boolean
  onToggleDarkMode?: () => void
}

export function SideMenu({ username, avatarUrl, darkMode = false, onToggleDarkMode }: SideMenuProps) {
  return (
    <div className="flex flex-col h-full p-4 bg-white">
      <div className="flex items-center gap-3 mb-6">
        <Avatar>
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium">{username}</h2>
        </div>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link href="/profile" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
              <User className="h-5 w-5 text-gray-600" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link href="/notifications" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
              <Bell className="h-5 w-5 text-gray-600" />
              <span>Notification</span>
            </Link>
          </li>
          <li>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 p-2 h-auto font-normal hover:bg-gray-100"
              onClick={onToggleDarkMode}
            >
              <Moon className="h-5 w-5 text-gray-600" />
              <span>Dark Mode</span>
              <div className={`ml-auto w-8 h-4 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-gray-300'}`}>
                <div 
                  className={`w-3 h-3 rounded-full bg-white transform transition-transform ${
                    darkMode ? 'translate-x-4' : 'translate-x-1'
                  } translate-y-0.5`} 
                />
              </div>
            </Button>
          </li>
          <li>
            <Link href="/help" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
              <HelpCircle className="h-5 w-5 text-gray-600" />
              <span>Help Center</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <Button variant="ghost" className="justify-start text-red-500 mt-6 px-2">
        <LogOut className="h-5 w-5 mr-3" />
        Log Out
      </Button>
    </div>
  )
} 
