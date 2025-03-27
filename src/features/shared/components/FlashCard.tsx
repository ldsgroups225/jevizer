"use client"

import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, MoreVertical } from 'lucide-react'

interface FlashCardProps {
  title: string
  subtitle?: string
  tags?: string[]
  progress?: number
  icon?: React.ReactNode
  onClick?: () => void
  expanded?: boolean
  children?: React.ReactNode
}

export function FlashCard({
  title,
  subtitle,
  tags = [],
  progress,
  icon,
  onClick,
  expanded = false,
  children,
}: FlashCardProps) {
  return (
    <Card className="mb-4 rounded-xl overflow-hidden">
      <CardContent className="p-0">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={onClick}
        >
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex-shrink-0">
                {icon}
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-medium">{title}</h3>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {progress !== undefined && (
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center relative">
                <svg className="w-12 h-12 absolute">
                  <circle
                    className="text-gray-200"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="20"
                    cx="24"
                    cy="24"
                  />
                  <circle
                    className="text-blue-500"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="20"
                    cx="24"
                    cy="24"
                    strokeDasharray={`${progress * 1.256} 126`}
                    strokeDashoffset="0"
                    transform="rotate(-90 24 24)"
                  />
                </svg>
                <span className="text-sm font-semibold">{progress}%</span>
              </div>
            )}
            
            <div className="flex items-center">
              <MoreVertical className="text-gray-400" size={20} />
              <ChevronRight 
                className={`text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} 
                size={20} 
              />
            </div>
          </div>
        </div>
        
        {expanded && children && (
          <div className="px-4 py-2 border-t border-gray-100">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 
