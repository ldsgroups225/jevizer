// src/features/statistics/StatisticsView.tsx
'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { Menu as MenuIcon, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { StatsOverview } from './components/StatsOverview'

export function StatisticsView() {
  return (
    <MobileLayout activeTab="statistics">
      <div className="p-4 space-y-4">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Image src="/logo.svg" alt="Jeviz Logo" width={24} height={24} />
            <span className="text-xl font-bold">jeviz</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <RefreshCw className="w-5 h-5" />
            </Button>
            {/* TODO: Integrate Side Menu Trigger */}
            <Button variant="ghost" size="icon" className="text-gray-600">
              <MenuIcon className="w-6 h-6" />
            </Button>
          </div>
        </header>

        <h1 className="text-xl font-semibold">Statistics</h1>
        <StatsOverview
          dueCards={261}
          studiedCards={127}
          studiedTime="69 Minutes"
          currentDate={new Date(2023, 5, 20)} // June 20, 2023
          chartData={[ // Example data structure
            { day: 1, learned: 10 },
            { day: 2, learned: 15 },
            { day: 3, learned: 5 },
            { day: 4, learned: 20 },
            { day: 5, learned: 12 },
            { day: 6, learned: 8 },
            { day: 7, learned: 18 },
            { day: 8, learned: 25 },
            { day: 9, learned: 10 },
            { day: 10, learned: 14 },
            { day: 11, learned: 9 },
            { day: 12, learned: 22 },
            { day: 13, learned: 16 },
            { day: 14, learned: 7 },
            { day: 15, learned: 19 },
            { day: 16, learned: 28 },
            { day: 17, learned: 11 },
            { day: 18, learned: 13 },
            { day: 19, learned: 6 },
            { day: 20, learned: 21 },
            { day: 21, learned: 17 },
            { day: 22, learned: 9 },
            { day: 23, learned: 20 },
            { day: 24, learned: 15 },
            { day: 25, learned: 10 },
            { day: 26, learned: 12 },
            { day: 27, learned: 24 },
            { day: 28, learned: 19 },
            { day: 29, learned: 8 },
            { day: 30, learned: 23 },
          ]}
          summaryStats={{
            total: 340,
            today: 12,
            dailyAverage: 10,
            dailyStreak: 16,
            timeSpent: '1:54h',
            cardsLearned: 86,
          }}
        />
      </div>
    </MobileLayout>
  )
}
