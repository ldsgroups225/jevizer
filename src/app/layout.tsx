// src/app/layout.tsx
import type { Metadata } from 'next'

import { PWAInstallPrompt } from '@/components/pwa-install-prompt'
import { cn } from '@/lib/utils'
import { Cairo } from 'next/font/google'

import './globals.css'

const cairo = Cairo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cairo-sans',
  weight: ['400', '500', '700'],
})

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Jeviz',
  description: 'Your smart learning partner for BEPC and BAC exams in Ivory Coast',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Jeviz',
  },
  formatDetection: {
    telephone: false,
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={cn('antialiased font-sans', cairo.variable)}>
        {children}
        <PWAInstallPrompt />
      </body>
    </html>
  )
}
