// src/features/statistics/components/StatsOverview.tsx
'use client'

import type {
  ChartConfig,
} from '@/components/ui/chart'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart' // Assuming chart components are set up
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

interface ChartDataPoint {
  day: number
  learned: number
}

interface SummaryStats {
  total: number
  today: number
  dailyAverage: number
  dailyStreak: number
  timeSpent: string
  cardsLearned: number
}

interface StatsOverviewProps {
  dueCards: number
  studiedCards: number
  studiedTime: string
  currentDate: Date
  chartData: ChartDataPoint[]
  summaryStats: SummaryStats
}

const chartConfig = {
  learned: {
    label: 'Learned',
    color: 'hsl(var(--chart-1))', // Use CSS variables from globals.css
  },
} satisfies ChartConfig

export function StatsOverview({
  dueCards,
  studiedCards,
  studiedTime,
  currentDate,
  chartData,
  summaryStats,
}: StatsOverviewProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    currentDate,
  )
  const [displayMonth, setDisplayMonth] = React.useState<Date>(currentDate)

  // Find today's data point for the chart tooltip default
  const todayData = chartData.find(d => d.day === currentDate.getDate())

  return (
    <div className="space-y-4">
      {/* Overview Cards */}
      <Card className="bg-white rounded-xl p-0">
        <CardHeader className="px-4 pt-4 pb-2">
          <CardTitle className="text-base font-semibold">Overview</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Due Cards</p>
            <p className="text-2xl font-bold text-gray-800">{dueCards}</p>
            <p className="text-xs text-gray-500 mt-1">Cards Today</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Studied Cards</p>
            <p className="text-2xl font-bold text-gray-800">{studiedCards}</p>
            <p className="text-xs text-gray-500 mt-1">
              {studiedTime}
              {' '}
              Today
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card className="bg-white rounded-xl p-0 overflow-hidden">
        <CardHeader className="px-4 pt-3 pb-1 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {format(displayMonth, 'MMMM yyyy')}
          </CardTitle>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setDisplayMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setDisplayMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={displayMonth}
            onMonthChange={setDisplayMonth}
            className="p-2"
            classNames={{
              day: 'h-8 w-8 text-xs',
              head_cell: 'text-muted-foreground rounded-md w-8 font-normal text-[0.7rem]',
              nav_button: 'h-6 w-6',
              caption_label: 'text-sm font-medium',
            }}
            modifiers={{
              // Example: Highlight days with data (needs logic)
              // learned: chartData.map(d => new Date(displayMonth.getFullYear(), displayMonth.getMonth(), d.day))
            }}
            modifiersClassNames={{
              // learned: 'bg-blue-100 rounded-full'
            }}
          />
        </CardContent>
      </Card>

      {/* Statistics Chart */}
      <Card className="bg-white rounded-xl p-0">
        <CardContent className="p-4">
          <Tabs defaultValue="learned" className="w-full">
            <div className="flex justify-between items-center mb-2">
              <TabsList className="bg-gray-100 h-8 p-0.5">
                <TabsTrigger value="all" className="text-xs px-2 h-7 data-[state=active]:bg-white">All</TabsTrigger>
                <TabsTrigger value="learned" className="text-xs px-2 h-7 data-[state=active]:bg-white">Learned</TabsTrigger>
                <TabsTrigger value="review" className="text-xs px-2 h-7 data-[state=active]:bg-white">Review Count</TabsTrigger>
                <TabsTrigger value="intervals" className="text-xs px-2 h-7 data-[state=active]:bg-white">Intervals</TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <TabsContent value="learned" className="mt-4">
              <ChartContainer config={chartConfig} className="h-[150px] w-full">
                <BarChart accessibilityLayer data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: -10 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    tickFormatter={value => value % 5 === 0 ? value : ''} // Show every 5th label
                    fontSize={10}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    fontSize={10}
                    tickCount={4} // Adjust number of Y-axis ticks
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel hideIndicator />}
                    defaultIndex={currentDate.getDate() - 1} // Default to today
                  />
                  <Bar dataKey="learned" fill="var(--color-chart-1)" radius={2} barSize={6} />
                </BarChart>
              </ChartContainer>

              {/* Summary Stats */}
              <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-2 text-center text-xs">
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-semibold text-gray-800">{summaryStats.total}</p>
                </div>
                <div>
                  <p className="text-gray-500">Today</p>
                  <p className="font-semibold text-gray-800">{summaryStats.today}</p>
                </div>
                <div>
                  <p className="text-gray-500">Daily Average</p>
                  <p className="font-semibold text-gray-800">{summaryStats.dailyAverage}</p>
                </div>
                <div>
                  <p className="text-gray-500">Daily Streak</p>
                  <p className="font-semibold text-gray-800">{summaryStats.dailyStreak}</p>
                </div>
                <div>
                  <p className="text-gray-500">Time Spent</p>
                  <p className="font-semibold text-gray-800">{summaryStats.timeSpent}</p>
                </div>
                <div>
                  <p className="text-gray-500">Cards Learned</p>
                  <p className="font-semibold text-gray-800">{summaryStats.cardsLearned}</p>
                </div>
              </div>
            </TabsContent>
            {/* Add TabsContent for other tabs (all, review, intervals) */}
            <TabsContent value="all"><p className="text-center text-gray-500 py-8">All Stats View</p></TabsContent>
            <TabsContent value="review"><p className="text-center text-gray-500 py-8">Review Count View</p></TabsContent>
            <TabsContent value="intervals"><p className="text-center text-gray-500 py-8">Intervals View</p></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
