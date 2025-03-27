// src/components/layout/MobileLayout.tsx
'use client'

import { cn } from '@/lib/utils'
import { BarChart3, BookOpen, Home, Menu, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface MobileLayoutProps {
  children: React.ReactNode
  activeTab?: 'home' | 'learning' | 'search' | 'statistics' | 'menu'
  // Add a prop to control the background color if needed, default to light blue
  bodyClassName?: string
}

const navItems = [
  { href: '/', label: 'Home', icon: Home, key: 'home' },
  { href: '/learning', label: 'Learning', icon: BookOpen, key: 'learning' },
  { href: '/search', label: 'Search', icon: Search, key: 'search' },
  {
    href: '/statistics',
    label: 'Statistics',
    icon: BarChart3,
    key: 'statistics',
  },
  { href: '/menu', label: 'Menu', icon: Menu, key: 'menu' },
] as const // Use 'as const' for stricter typing

export default function MobileLayout({
  children,
  activeTab = 'home',
  bodyClassName = 'bg-sky-50', // Lighter blue like the design
}: MobileLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className={cn('flex-1 pb-16', bodyClassName)}>{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-gray-200 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
        <div className="grid h-full grid-cols-5">
          {navItems.map((item) => {
            const isActive = activeTab === item.key
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center transition-colors duration-150 ease-in-out',
                  isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700',
                )}
              >
                <item.icon
                  size={24}
                  strokeWidth={isActive ? 2.5 : 2} // Slightly bolder when active
                />
                <span className="mt-1 text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
