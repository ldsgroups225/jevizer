'use client'

import MobileLayout from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { Award, Bell, ChevronLeft, Download, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'achievement', title: 'Achievement Unlocked', message: 'You have completed a 7-day streak!', time: 'Today', icon: <Award className="h-5 w-5 text-yellow-500" /> },
  { id: '2', type: 'reminder', title: 'Daily Reminder', message: 'Time to practice your Japanese cards', time: 'Yesterday', icon: <Bell className="h-5 w-5 text-blue-500" /> },
  { id: '3', type: 'info', title: 'New Feature', message: 'We have added audio recording to cards!', time: '3 days ago', icon: <Info className="h-5 w-5 text-green-500" /> },
  { id: '4', type: 'download', title: 'Download Complete', message: 'Japanese N5 Kanji deck is ready to use', time: '1 week ago', icon: <Download className="h-5 w-5 text-purple-500" /> },
]

export function NotificationView() {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  return (
    <MobileLayout bodyClassName="bg-gray-50">
      {' '}
      <div className="flex flex-col h-full">
        {' '}
        <header className="flex items-center px-2 py-3 bg-white border-b border-gray-100">
          {' '}
          <Button variant="ghost" size="icon" onClick={handleBack}>
            {' '}
            <ChevronLeft className="w-6 h-6" />
            {' '}
          </Button>
          {' '}
          <h1 className="flex-1 text-center text-base font-medium"> Notifications </h1>
          {' '}
          <div className="w-10" />
          {' '}
        </header>
        <div className="flex-1 overflow-y-auto">
          {' '}
          {MOCK_NOTIFICATIONS.length > 0
            ? (
                <div className="p-4 space-y-3">
                  {' '}
                  {MOCK_NOTIFICATIONS.map(notification => (
                    <div key={notification.id} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                      {' '}
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                        {' '}
                        {notification.icon}
                        {' '}
                      </div>
                      {' '}
                      <div className="flex-1 min-w-0">
                        {' '}
                        <h3 className="font-medium text-sm">{notification.title}</h3>
                        {' '}
                        <p className="text-gray-600 text-sm line-clamp-2">{notification.message}</p>
                        {' '}
                        <span className="text-gray-400 text-xs">{notification.time}</span>
                        {' '}
                      </div>
                      {' '}
                    </div>
                  ))}
                </div>
              )
            : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  {' '}
                  <Bell className="h-12 w-12 text-gray-300 mb-4" />
                  {' '}
                  <h2 className="text-xl font-semibold mb-2">No Notifications</h2>
                  {' '}
                  <p className="text-gray-500">You have no notifications at this time.</p>
                  {' '}
                </div>
              )}
          {' '}

        </div>
      </div>
      {' '}

    </MobileLayout>
  )
}
