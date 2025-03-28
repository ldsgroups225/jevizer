// src/components/layout/MobileLayout.tsx
'use client'

import { cn } from '@/lib/utils'
import { BarChart3, BookOpen, Home, Menu, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type ActiveTab = 'home' | 'statistics' | 'search' | 'menu' | null

interface MobileLayoutProps {
  children: React.ReactNode
  activeTab?: ActiveTab
  bodyClassName?: string
}

const navItems = [
  { href: '/', label: 'Accueil', icon: Home, key: 'home' },
  { href: '/learning', label: 'Révisions', icon: BookOpen, key: 'learning' },
  { href: '/search', label: 'Rechercher', icon: Search, key: 'search' },
  {
    href: '/statistics',
    label: 'Stats',
    icon: BarChart3,
    key: 'statistics',
  },
  { href: '/menu', label: 'Menu', icon: Menu, key: 'menu' },
] as const

export default function MobileLayout({
  children,
  activeTab = 'home',
  bodyClassName = 'bg-primary-light-bg',
}: MobileLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className={cn('flex-1 pb-16', bodyClassName)}>{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-gray-200 shadow-[0_-1px_4px_rgba(0,0,0,0.06)]">
        <div className="grid h-full grid-cols-5">
          {navItems.map((item) => {
            const isActive = activeTab === item.key
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center transition-colors duration-150 ease-in-out group',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <item.icon
                  size={24}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')}
                />
                <span className={cn(
                  'mt-1 text-[10px] font-medium',
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
                )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
