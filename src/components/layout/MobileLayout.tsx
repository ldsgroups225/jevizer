"use client"

import React from 'react'
import Link from 'next/link'
import { Home, BookOpen, Search, BarChart3, Menu } from 'lucide-react'

interface MobileLayoutProps {
  children: React.ReactNode
  activeTab?: 'home' | 'learning' | 'search' | 'statistics' | 'menu'
}

export default function MobileLayout({ children, activeTab = 'home' }: MobileLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-sky-100">
      <main className="flex-1 pb-16">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16">
        <div className="grid grid-cols-5 h-full">
          <Link 
            href="/"
            className={`flex flex-col items-center justify-center ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-600'}`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link 
            href="/learning"
            className={`flex flex-col items-center justify-center ${activeTab === 'learning' ? 'text-blue-500' : 'text-gray-600'}`}
          >
            <BookOpen size={24} />
            <span className="text-xs mt-1">Learning</span>
          </Link>
          
          <Link 
            href="/search"
            className={`flex flex-col items-center justify-center ${activeTab === 'search' ? 'text-blue-500' : 'text-gray-600'}`}
          >
            <Search size={24} />
            <span className="text-xs mt-1">Search</span>
          </Link>
          
          <Link 
            href="/statistics"
            className={`flex flex-col items-center justify-center ${activeTab === 'statistics' ? 'text-blue-500' : 'text-gray-600'}`}
          >
            <BarChart3 size={24} />
            <span className="text-xs mt-1">Statistics</span>
          </Link>
          
          <Link 
            href="/menu"
            className={`flex flex-col items-center justify-center ${activeTab === 'menu' ? 'text-blue-500' : 'text-gray-600'}`}
          >
            <Menu size={24} />
            <span className="text-xs mt-1">Menu</span>
          </Link>
        </div>
      </nav>
    </div>
  )
} 
