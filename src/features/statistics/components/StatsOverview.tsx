"use client"

import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface StatsProps {
  learned: number
  toReview: number
}

export function StatsOverview({ learned, toReview }: StatsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-blue-500">{learned}</span>
            <span className="text-sm text-gray-500">Learned</span>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-orange-500">{toReview}</span>
            <span className="text-sm text-gray-500">To Review</span>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">June 2023</CardTitle>
            <div className="flex space-x-1">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <Calendar 
            mode="single" 
            className="rounded-md border-0"
            selected={new Date()}
            disabled={{
              before: new Date(2023, 0, 1),
              after: new Date()
            }}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-medium">Learning Statistics</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <Tabs defaultValue="today">
            <TabsList className="grid grid-cols-4 h-8">
              <TabsTrigger value="today" className="text-xs">Today</TabsTrigger>
              <TabsTrigger value="week" className="text-xs">7d</TabsTrigger>
              <TabsTrigger value="month" className="text-xs">30d</TabsTrigger>
              <TabsTrigger value="year" className="text-xs">1y</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="mt-2">
              <div className="bg-gray-100 rounded-md p-3">
                <div className="h-40 flex flex-col items-center justify-center">
                  <div className="w-full h-full flex items-end justify-between px-4">
                    {[30, 50, 20, 70, 85, 45, 10].map((height, i) => (
                      <div key={i} className="w-4 bg-blue-500 rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-7 text-center text-xs text-gray-500 mt-1">
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                  <div>S</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 
