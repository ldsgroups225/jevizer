// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper'
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

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  title: 'Jeviz',
  // description: 'Your smart learning partner for BEPC and BAC exams in Ivory Coast',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Jeviz',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={cn('antialiased font-sans', cairo.variable)}>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        <PWAInstallPrompt />
      </body>
    </html>
  )
}
