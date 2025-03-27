"use client"

import React from 'react'
import MobileLayout from '@/components/layout/MobileLayout'
import { StatsOverview } from './components/StatsOverview'

export function StatisticsView() {
  return (
    <MobileLayout activeTab="statistics">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Statistics</h1>
        <StatsOverview learned={127} toReview={35} />
      </div>
    </MobileLayout>
  )
} 
